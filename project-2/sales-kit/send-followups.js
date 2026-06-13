const nodemailer = require('nodemailer');
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'sent-log.json');
const GMAIL_USER = process.env.GMAIL_USER || 'mwlwdghrby09@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || 'xrtljtwwcrpexyqf';

const GYMS = [
  { email: 'info@premierfit.co.uk', gym: 'Premier Fit Gym' },
  { email: 'hello@theironworks.co.uk', gym: 'The Iron Works' },
  { email: 'contact@fitzone.co.uk', gym: 'FitZone Gym' },
  { email: 'info@bodyshape.co.uk', gym: 'BodyShape Fitness' },
  { email: 'contact@peakperformance.co.uk', gym: 'Peak Performance' },
  { email: 'info@flexfitness.co.uk', gym: 'Flex Fitness' },
  { email: 'hello@powerhouse.co.uk', gym: 'PowerHouse Gym' },
  { email: 'contact@corefit.co.uk', gym: 'CoreFit Studio' },
  { email: 'info@strongholdgym.co.uk', gym: 'StrongHold Gym' },
  { email: 'hello@vitagym.co.uk', gym: 'Vita Gym' },
  { email: 'info@elevatefitness.co.uk', gym: 'Elevate Fitness' },
  { email: 'contact@revolvegym.co.uk', gym: 'Revolve Gym' },
  { email: 'info@pinnaclefit.co.uk', gym: 'Pinnacle Fitness' },
  { email: 'hello@groundworksgym.co.uk', gym: 'Groundworks Gym' },
  { email: 'info@forgefitness.co.uk', gym: 'Forge Fitness' },
];

function loadLog() { return fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) : {}; }
function saveLog(log) { fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2)); }
function daysSince(dateStr) { return (new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24); }

function checkReplies(sinceDate) {
  return new Promise((resolve, reject) => {
    const imap = new Imap({ user: GMAIL_USER, password: GMAIL_PASS, host: 'imap.gmail.com', port: 993, tls: true, tlsOptions: { rejectUnauthorized: false } });
    const replied = [];
    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err) => {
        if (err) { imap.end(); return reject(err); }
        const d = new Date(sinceDate).toISOString().split('T')[0];
        imap.search([['OR', ['FROM', GMAIL_USER], ['SINCE', d]]], (err, results) => {
          if (err) { imap.end(); return reject(err); }
          if (!results.length) { imap.end(); return resolve([]); }
          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) return;
                if (parsed.from && parsed.from.text) {
                  const from = parsed.from.text.toLowerCase();
                  for (const g of GYMS) { if (from.includes(g.email.toLowerCase())) replied.push(g.email); }
                }
              });
            });
          });
          f.once('end', () => { imap.end(); });
        });
      });
    });
    imap.once('end', () => resolve(replied));
    imap.once('error', (err) => reject(err));
    imap.connect();
  });
}

function getFollowUpBody(gym) {
  return `Hi,\n\nJust following up on my last email about managing class bookings digitally.\n\nI know you're busy, so here's the short version: your members book from their phone, you see who's coming to each class, and you never overbook.\n\nWould a 5-minute call this week work? I can show you exactly how it would work for ${gym}.\n\nBest,\nYour Name\nGymFlow`;
}

async function main() {
  console.log('=== GymFlow Follow-Up Sender ===\n');
  const log = loadLog();
  const eligible = GYMS.filter(g => log[g.email] && !log[g.email].followUpSent && daysSince(log[g.email].firstSent) >= 3);

  if (eligible.length === 0) { console.log('No companies eligible for follow-up yet.'); return; }

  console.log(`${eligible.length} gyms eligible:\n`);
  eligible.forEach(g => console.log(`  - ${g.gym} (${Math.floor(daysSince(log[g.email].firstSent))} days)`));

  console.log('\nChecking for replies...');
  let replied = [];
  try { replied = await checkReplies(new Date(Date.now() - 7 * 86400000).toISOString()); } catch (e) { console.log('Could not check replies:', e.message); }

  const toFollowUp = eligible.filter(g => !replied.includes(g.email));
  if (toFollowUp.length === 0) { console.log('All eligible have replied.'); return; }

  console.log(`\nSending follow-ups to ${toFollowUp.length} gyms...\n`);
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASS } });

  let sent = 0;
  for (const g of toFollowUp) {
    try {
      await transporter.sendMail({ from: 'GymFlow <' + GMAIL_USER + '>', to: g.email, subject: 'Re: Class bookings', text: getFollowUpBody(g.gym) });
      console.log('  Sent to ' + g.gym);
      log[g.email].followUpSent = new Date().toISOString();
      sent++;
    } catch (e) { console.error('  Failed ' + g.gym + ': ' + e.message); }
  }
  saveLog(log);
  console.log('\nDone. ' + sent + '/' + toFollowUp.length + ' follow-ups sent.');
}

main();
