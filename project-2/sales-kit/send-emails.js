const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'mwlwdghrby09@gmail.com', pass: 'xrtljtwwcrpexyqf' }
});

const gyms = [
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

function getSubject(g) {
  const s = [
    'Your class bookings are costing you members',
    'Quick question about ' + g,
    'Stop losing members to overbooking - ' + g,
    g + ': class booking made simple',
  ];
  return s[Math.floor(Math.random() * s.length)];
}

function getBody(g) {
  return 'Hi,\n\nI noticed ' + g + ' runs classes and I had a quick question - how are your members booking right now?\n\nMost small gyms I talk to say the same thing: members call or message on Facebook, the instructor writes it down, and half the time people forget they booked or show up to a full class.\n\nI built a system specifically for small gyms where members book classes from their phone, you see exactly who\'s coming to each session, and classes never get overbooked.\n\nIt takes 5 minutes to set up and members love the convenience.\n\nWant me to send you a live demo link? You can try it yourself right now.\n\nBest,\nYour Name\nGymFlow';
}

async function main() {
  await transporter.verify();
  console.log('Connected to Gmail\n');

  let sent = 0;
  for (const g of gyms) {
    try {
      await transporter.sendMail({
        from: 'GymFlow <mwlwdghrby09@gmail.com>',
        to: g.email,
        subject: getSubject(g.gym),
        text: getBody(g.gym),
      });
      console.log('Sent to ' + g.gym + ' (' + g.email + ')');
      sent++;
    } catch (e) {
      console.error('Failed ' + g.gym + ': ' + e.message);
    }
  }

  console.log('\nDone. ' + sent + '/' + gyms.length + ' sent.');
}

main();
