// Q9 UI is wired through useReservation in App.js.
export const reservationScreenRequirements = {
  hook: '../hooks/useReservation.js',
  slots: '12:00–22:00 hourly',
  validation: ['1–12 guests','03XX-XXXXXXX','one hour ahead','available table capacity'],
};
export default function ReservationScreen() { return null; }
