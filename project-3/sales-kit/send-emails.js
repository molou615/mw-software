const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'mwlwdghrby09@gmail.com', pass: 'xrtljtwwcrpexyqf' }
});

const targets = [
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

function getSubject(n) {
  const s = ['Your event bookings are costing you money', 'Quick question about ' + n, 'Stop losing bookings - ' + n, n + ': event management made simple'];
  return s[Math.floor(Math.random() * s.length)];
}

function getBody(n) {
  return 'Hi,\n\nI noticed ' + n + ' handles event entertainment and I had a quick question - how are you managing your bookings right now?\n\nMost entertainment teams I talk to say the same thing: clients call, someone writes it down, double-bookings happen, and managing performers is a nightmare.\n\nI built a system specifically for entertainment teams where clients book online, you see all your bookings on a calendar, assign performers, and never double-book again.\n\nIt takes 5 minutes to set up and costs less than a single lost booking.\n\nWant me to send you a live demo link? You can try it yourself right now.\n\nBest,\nYour Name\nHalaFlow';
}

async function main() {
  await transporter.verify();
  let sent = 0;
  for (const t of targets) {
    try {
      await transporter.sendMail({ from: 'HalaFlow <mwlwdghrby09@gmail.com>', to: t.email, subject: getSubject(t.name), text: getBody(t.name) });
      console.log('Sent to ' + t.name);
      sent++;
    } catch (e) { console.error('Failed ' + t.name + ': ' + e.message); }
  }
  console.log('\nDone. ' + sent + '/' + targets.length + ' sent.');
}

main();
