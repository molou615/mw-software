export const demoPackages = [
  { id: 1, name: 'Basic Party', description: '1 performer, 2 hours, basic entertainment', price: 150, duration: 120, features: '1 Performer,2 Hours,Basic Sound System,Party Games' },
  { id: 2, name: 'Premium Party', description: '2 performers, 3 hours, full entertainment', price: 300, duration: 180, features: '2 Performers,3 Hours,Full Sound & Lighting,Party Games,Face Painting,Balloon Art' },
  { id: 3, name: 'VIP Party', description: '3+ performers, 4 hours, complete experience', price: 500, duration: 240, features: '3+ Performers,4 Hours,Full Sound & Lighting,DJ,MC,Face Painting,Balloon Art,Magic Show,Photos & Videos' },
];

export const demoPerformers = [
  { id: 1, user: { name: 'Ahmed the Clown', email: 'ahmed@halaflow.com' }, skills: 'Clown,Face Painting,Balloon Art', bio: 'Professional clown with 10 years experience', active: true },
  { id: 2, user: { name: 'Sara the Magician', email: 'sara@halaflow.com' }, skills: 'Magic Shows,Mentalism,Close-up Magic', bio: 'Award-winning magician', active: true },
  { id: 3, user: { name: 'Omar the DJ', email: 'omar@halaflow.com' }, skills: 'DJ,MC,Lighting,Sound System', bio: 'Party DJ for all occasions', active: true },
  { id: 4, user: { name: 'Lina the Face Painter', email: 'lina@halaflow.com' }, skills: 'Face Painting,Body Art,Glitter Tattoos', bio: 'Creative face painter', active: true },
];

const today = new Date();
const getDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split('T')[0]; };

export const demoBookings = [
  { id: 1, client: { name: 'Fatima Al-Hassan', email: 'fatima@email.com', phone: '07700 111111' }, package: demoPackages[2], eventDate: getDate(3), eventTime: '14:00', duration: 240, venue: 'Grand Hall', guestCount: 80, status: 'CONFIRMED', depositPaid: 150, performances: [{ performer: { user: { name: 'Ahmed the Clown' } } }, { performer: { user: { name: 'Sara the Magician' } } }, { performer: { user: { name: 'Omar the DJ' } } }] },
  { id: 2, client: { name: 'Omar Khalil', email: 'omar@email.com', phone: '07700 222222' }, package: demoPackages[1], eventDate: getDate(5), eventTime: '16:00', duration: 180, venue: 'Community Center', guestCount: 40, status: 'PENDING', depositPaid: 90, performances: [{ performer: { user: { name: 'Lina the Face Painter' } } }, { performer: { user: { name: 'Omar the DJ' } } }] },
  { id: 3, client: { name: 'Sami Ahmed', email: 'sami@email.com', phone: '07700 333333' }, package: demoPackages[0], eventDate: getDate(-2), eventTime: '10:00', duration: 120, venue: 'Private Home', guestCount: 20, status: 'COMPLETED', depositPaid: 45, totalPaid: 150, performances: [{ performer: { user: { name: 'Ahmed the Clown' } } }] },
  { id: 4, client: { name: 'Nora Saleh', email: 'nora@email.com', phone: '07700 444444' }, package: demoPackages[2], eventDate: getDate(7), eventTime: '18:00', duration: 240, venue: 'Hotel Ballroom', guestCount: 120, status: 'CONFIRMED', depositPaid: 150, performances: [{ performer: { user: { name: 'Ahmed the Clown' } } }, { performer: { user: { name: 'Sara the Magician' } } }, { performer: { user: { name: 'Omar the DJ' } } }, { performer: { user: { name: 'Lina the Face Painter' } } }] },
  { id: 5, client: { name: 'Yusuf Ali', email: 'yusuf@email.com', phone: '07700 555555' }, package: demoPackages[1], eventDate: getDate(10), eventTime: '15:00', duration: 180, venue: 'Park Pavilion', guestCount: 50, status: 'PENDING', depositPaid: 0, performances: [] },
];

export const demoChecklist = [
  { id: 1, bookingId: 1, title: 'Confirm venue address', category: 'pre-event', completed: true },
  { id: 2, bookingId: 1, title: 'Confirm event time with client', category: 'pre-event', completed: true },
  { id: 3, bookingId: 1, title: 'Pack equipment and supplies', category: 'pre-event', completed: false },
  { id: 4, bookingId: 1, title: 'Confirm performer assignments', category: 'pre-event', completed: true },
  { id: 5, bookingId: 1, title: 'Set up at venue', category: 'during-event', completed: false },
  { id: 6, bookingId: 1, title: 'Run event activities', category: 'during-event', completed: false },
  { id: 7, bookingId: 1, title: 'Pack up after event', category: 'during-event', completed: false },
  { id: 8, bookingId: 1, title: 'Send photos to client', category: 'post-event', completed: false },
  { id: 9, bookingId: 1, title: 'Request review from client', category: 'post-event', completed: false },
];

export const demoStats = { totalBookings: 23, pendingBookings: 5, confirmedBookings: 12, completedBookings: 6, totalPerformers: 4, totalRevenue: 4850, upcomingEvents: demoBookings.filter(b => b.status !== 'COMPLETED').slice(0, 3) };
