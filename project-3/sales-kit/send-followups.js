const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'sent-log.json');
const GMAIL_USER = process.env.GMAIL_USER || 'mwlwdghrby09@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || 'xrtljtwwcrpexyqf';

const TARGETS = [
  { email: 'info@partytimeentertainment.co.uk', name: 'Party Time Entertainment' },
  { email: 'hello@funfactoryevents.co.uk', name: 'Fun Factory Events' },
  { email: 'contact@magicmomentparties.co.uk', name: 'Magic Moment Parties' },
  { email: 'info@superstarparties.co.uk', name: 'Superstar Parties' },
  { email: 'bookings@eventmakers.co.uk', name: 'Event Makers' },
  { email: 'info@celebrationkingdom.co.uk', name: 'Celebration Kingdom' },
  { email: 'hello@partypalooza.co.uk', name: 'Party Palooza' },
  { email: 'contact@entertainkids.co.uk', name: 'Entertain Kids' },
  { email: 'info@joyfulevents.co.uk', name: 'Joyful Events' },
  { email: 'bookings@spectacleentertainment.co.uk', name: 'Spectacle Entertainment' },
  { email: 'info@kidszaparties.co.uk', name: 'Kids Zap Parties' },
  { email: 'hello@wonderevents.co.uk', name: 'Wonder Events' },
];

function loadLog() { return fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) : {}; }
function saveLog(log) { fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2)); }
function daysSince(d) { return (new Date() - new Date(d)) / 86400000; }

function getBody(name) {
  return `Hi,\n\nJust following up on my last email about managing event bookings digitally.\n\nI know you're busy, so here's the short version: clients book online, you see all bookings on a calendar, assign performers, and never double-book.\n\nWould a 5-minute call this week work? I can show you exactly how it would work for ${name}.\n\nBest,\nYour Name\nHalaFlow`;
}

async function main() {
  console.log('=== HalaFlow Follow-Up Sender ===\n');
  const log = loadLog();
  const eligible = TARGETS.filter(t => log[t.email] && !log[t.email].followUpSent && daysSince(log[t.email].firstSent) >= 3);
  if (!eligible.length) { console.log('No companies eligible yet.'); return; }

  console.log(`${eligible.length} eligible:`);
  eligible.forEach(t => console.log(`  - ${t.name}`));

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASS } });
  let sent = 0;
  for (const t of eligible) {
    try {
      await transporter.sendMail({ from: 'HalaFlow <' + GMAIL_USER + '>', to: t.email, subject: 'Re: Event bookings', text: getBody(t.name) });
      console.log('  Sent to ' + t.name);
      log[t.email].followUpSent = new Date().toISOString();
      sent++;
    } catch (e) { console.error('  Failed ' + t.name); }
  }
  saveLog(log);
  console.log('\nDone. ' + sent + '/' + eligible.length + ' sent.');
}

main();
