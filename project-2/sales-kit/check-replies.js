const Imap = require('imap');
const { simpleParser } = require('mailparser');
const https = require('https');

const WATCHED_EMAILS = [
  'info@premierfit.co.uk',
  'hello@theironworks.co.uk',
  'contact@fitzone.co.uk',
  'info@bodyshape.co.uk',
  'contact@peakperformance.co.uk',
  'info@flexfitness.co.uk',
  'hello@powerhouse.co.uk',
  'contact@corefit.co.uk',
  'info@strongholdgym.co.uk',
  'hello@vitagym.co.uk',
  'info@elevatefitness.co.uk',
  'contact@revolvegym.co.uk',
  'info@pinnaclefit.co.uk',
  'hello@groundworksgym.co.uk',
  'info@forgefitness.co.uk',
];

const NTFY_TOPIC = 'gymflow-replies-456';
const NTFY_URL = `https://ntfy.sh/${NTFY_TOPIC}`;

const GMAIL_USER = process.env.GMAIL_USER || 'mwlwdghrby09@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || 'xrtljtwwcrpexyqf';

function sendNotification(title, message) {
  return new Promise((resolve) => {
    const data = JSON.stringify({ topic: NTFY_TOPIC, title, message });
    const req = https.request(NTFY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, () => resolve());
    req.on('error', () => resolve());
    req.write(data);
    req.end();
  });
}

function checkEmails() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: GMAIL_USER,
      password: GMAIL_PASS,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });

    let foundReplies = [];

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err) => {
        if (err) { imap.end(); return reject(err); }

        imap.search(['UNSEEN'], (err, results) => {
          if (err) { imap.end(); return reject(err); }
          if (!results.length) { imap.end(); return resolve([]); }

          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) return;
                if (parsed.from && parsed.from.text) {
                  const from = parsed.from.text.toLowerCase();
                  for (const email of WATCHED_EMAILS) {
                    if (from.includes(email.toLowerCase())) {
                      foundReplies.push({
                        from: parsed.from.text,
                        subject: parsed.subject,
                        date: parsed.date,
                        text: parsed.text?.substring(0, 500)
                      });
                    }
                  }
                }
              });
            });
          });
          f.once('end', () => { imap.end(); });
        });
      });
    });

    imap.once('end', () => resolve(foundReplies));
    imap.once('error', (err) => reject(err));
    imap.connect();
  });
}

async function main() {
  console.log('Checking for replies...');

  try {
    const replies = await checkEmails();

    if (replies.length === 0) {
      console.log('No new replies found.');
      return;
    }

    console.log(`Found ${replies.length} new replies:\n`);

    for (const reply of replies) {
      console.log(`From: ${reply.from}`);
      console.log(`Subject: ${reply.subject}`);
      console.log(`Date: ${reply.date}`);
      console.log(`Preview: ${reply.text?.substring(0, 200)}`);
      console.log('---');

      await sendNotification(
        'New Reply: ' + reply.subject,
        `From: ${reply.from}\n${reply.text?.substring(0, 200)}`
      );
      console.log('Notification sent.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
