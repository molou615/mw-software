export const demoClassTypes = [
  { id: 1, name: 'Yoga', duration: 60, maxCapacity: 20, color: '#8B5CF6' },
  { id: 2, name: 'HIIT', duration: 45, maxCapacity: 15, color: '#EF4444' },
  { id: 3, name: 'Spin', duration: 50, maxCapacity: 25, color: '#F59E0B' },
  { id: 4, name: 'Pilates', duration: 60, maxCapacity: 18, color: '#10B981' },
  { id: 5, name: 'Boxing', duration: 60, maxCapacity: 12, color: '#6366F1' },
  { id: 6, name: 'CrossFit', duration: 60, maxCapacity: 20, color: '#EC4899' },
];

const today = new Date();
const getDate = (daysOffset) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const demoClasses = [
  { id: 1, classTypeId: 1, classType: demoClassTypes[0], instructorId: 1, instructor: { id: 1, name: 'Sarah Wilson' }, date: getDate(0), startTime: '07:00', endTime: '08:00', maxCapacity: 20, currentCapacity: 12, status: 'ACTIVE' },
  { id: 2, classTypeId: 2, classType: demoClassTypes[1], instructorId: 2, instructor: { id: 2, name: 'Mike Johnson' }, date: getDate(0), startTime: '08:30', endTime: '09:15', maxCapacity: 15, currentCapacity: 15, status: 'ACTIVE' },
  { id: 3, classTypeId: 3, classType: demoClassTypes[2], instructorId: 1, instructor: { id: 1, name: 'Sarah Wilson' }, date: getDate(0), startTime: '10:00', endTime: '10:50', maxCapacity: 25, currentCapacity: 8, status: 'ACTIVE' },
  { id: 4, classTypeId: 4, classType: demoClassTypes[3], instructorId: 3, instructor: { id: 3, name: 'Emma Davis' }, date: getDate(0), startTime: '12:00', endTime: '13:00', maxCapacity: 18, currentCapacity: 10, status: 'ACTIVE' },
  { id: 5, classTypeId: 5, classType: demoClassTypes[4], instructorId: 2, instructor: { id: 2, name: 'Mike Johnson' }, date: getDate(1), startTime: '07:00', endTime: '08:00', maxCapacity: 12, currentCapacity: 7, status: 'ACTIVE' },
  { id: 6, classTypeId: 6, classType: demoClassTypes[5], instructorId: 3, instructor: { id: 3, name: 'Emma Davis' }, date: getDate(1), startTime: '09:00', endTime: '10:00', maxCapacity: 20, currentCapacity: 14, status: 'ACTIVE' },
  { id: 7, classTypeId: 1, classType: demoClassTypes[0], instructorId: 1, instructor: { id: 1, name: 'Sarah Wilson' }, date: getDate(2), startTime: '07:00', endTime: '08:00', maxCapacity: 20, currentCapacity: 5, status: 'ACTIVE' },
  { id: 8, classTypeId: 2, classType: demoClassTypes[1], instructorId: 2, instructor: { id: 2, name: 'Mike Johnson' }, date: getDate(2), startTime: '18:00', endTime: '18:45', maxCapacity: 15, currentCapacity: 9, status: 'ACTIVE' },
];

export const demoMembers = [
  { id: 1, name: 'John Smith', email: 'john@email.com', phone: '07700 111111', createdAt: '2026-01-15', _count: { bookings: 24 } },
  { id: 2, name: 'Emma Brown', email: 'emma@email.com', phone: '07700 222222', createdAt: '2026-02-20', _count: { bookings: 18 } },
  { id: 3, name: 'James Wilson', email: 'james@email.com', phone: '07700 333333', createdAt: '2026-03-10', _count: { bookings: 31 } },
  { id: 4, name: 'Olivia Taylor', email: 'olivia@email.com', phone: '07700 444444', createdAt: '2026-04-05', _count: { bookings: 12 } },
  { id: 5, name: 'David Anderson', email: 'david@email.com', phone: '07700 555555', createdAt: '2026-05-01', _count: { bookings: 8 } },
  { id: 6, name: 'Sophie Thomas', email: 'sophie@email.com', phone: '07700 666666', createdAt: '2026-05-15', _count: { bookings: 15 } },
];

export const demoBookings = [
  { id: 1, memberId: 1, member: { id: 1, name: 'John Smith' }, classId: 1, class: { id: 1, classType: demoClassTypes[0], date: getDate(0), startTime: '07:00' }, status: 'CONFIRMED' },
  { id: 2, memberId: 2, member: { id: 2, name: 'Emma Brown' }, classId: 1, class: { id: 1, classType: demoClassTypes[0], date: getDate(0), startTime: '07:00' }, status: 'CONFIRMED' },
  { id: 3, memberId: 3, member: { id: 3, name: 'James Wilson' }, classId: 2, class: { id: 2, classType: demoClassTypes[1], date: getDate(0), startTime: '08:30' }, status: 'CONFIRMED' },
  { id: 4, memberId: 4, member: { id: 4, name: 'Olivia Taylor' }, classId: 3, class: { id: 3, classType: demoClassTypes[2], date: getDate(0), startTime: '10:00' }, status: 'CONFIRMED' },
  { id: 5, memberId: 5, member: { id: 5, name: 'David Anderson' }, classId: 2, class: { id: 2, classType: demoClassTypes[1], date: getDate(0), startTime: '08:30' }, status: 'CONFIRMED' },
];

export const demoStats = {
  totalMembers: 47,
  totalBookings: 312,
  totalClasses: 6,
  todayClasses: 4,
  todayBookings: 38,
  recentBookings: demoBookings,
};
