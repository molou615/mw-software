const Imap = require('imap');
const { simpleParser } = require('mailparser');
const https = require('https');

const WATCHED = [
  'info@partytimeentertainment.co.uk', 'hello@funfactoryevents.co.uk', 'contact@magicmomentparties.co.uk',
  'info@superstarparties.co.uk', 'bookings@eventmakers.co.uk', 'info@celebrationkingdom.co.uk',
  'hello@partypalooza.co.uk', 'contact@entertainkids.co.uk', 'info@joyfulevents.co.uk',
  'bookings@spectacleentertainment.co.uk', 'info@kidszaparties.co.uk', 'hello@wonderevents.co.uk',
  'contact@eventplannermarrakech.com', 'info@saeval.com', 'contact@cesar-event.com',
  'commercial@marocanimation.com', 'contact@megaanimation-events.com', 'souad.lahcini@animatec-team.com',
  'info@maevmaroc.com', 'contact@casaevents.ma', 'sales@traveldesigndmc.com',
  'info@moroccoevents.com', 'hello@partymarocmarrakech.com', 'contact@mor-event.com',
];

const NTFY_TOPIC = 'halaflow-replies-789';
const GMAIL_USER = process.env.GMAIL_USER || 'mwlwdghrby09@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || 'xrtljtwwcrpexyqf';

function sendNotification(title, message) {
  return new Promise((resolve) => {
    const data = JSON.stringify({ topic: NTFY_TOPIC, title, message });
    const req = https.request(`https://ntfy.sh/${NTFY_TOPIC}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, () => resolve());
    req.on('error', () => resolve());
    req.write(data);
    req.end();
  });
}

function checkEmails() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({ user: GMAIL_USER, password: GMAIL_PASS, host: 'imap.gmail.com', port: 993, tls: true, tlsOptions: { rejectUnauthorized: false } });
    const found = [];
    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err) => {
        if (err) { imap.end(); return reject(err); }
        imap.search(['UNSEEN'], (err, results) => {
          if (err || !results.length) { imap.end(); return resolve([]); }
          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) return;
                if (parsed.from && parsed.from.text) {
                  const from = parsed.from.text.toLowerCase();
                  for (const email of WATCHED) {
                    if (from.includes(email.toLowerCase())) {
                      found.push({ from: parsed.from.text, subject: parsed.subject, date: parsed.date, text: parsed.text?.substring(0, 500) });
                    }
                  }
                }
              });
            });
          });
          f.once('end', () => imap.end());
        });
      });
    });
    imap.once('end', () => resolve(found));
    imap.once('error', reject);
    imap.connect();
  });
}

async function main() {
  console.log('Checking for replies...');
  try {
    const replies = await checkEmails();
    if (!replies.length) { console.log('No new replies.'); return; }
    console.log(`Found ${replies.length} replies:\n`);
    for (const r of replies) {
      console.log(`From: ${r.from}\nSubject: ${r.subject}\n---`);
      await sendNotification('Reply: ' + r.subject, `From: ${r.from}\n${r.text?.substring(0, 200)}`);
    }
  } catch (err) { console.error('Error:', err.message); }
}

main();
