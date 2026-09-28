import {useCallback, useMemo, useState} from 'react';

const TIME_SLOTS = Array.from({length: 11}, (_, i) => `${String(i + 12).padStart(2, '0')}:00`);

export default function useReservation(mockTables = [], mockReservations = []) {
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [table, setTable] = useState(null);
  const [phone, setPhone] = useState('');

  const isSlotUnavailable = useCallback((slot) => {
    if (!selectedDate) return false;
    const guests = Number(partySize);
    const bookedTableIds = mockReservations
      .filter(r => r.date === selectedDate && r.time === slot && r.status !== 'Cancelled')
      .map(r => r.tableId)
      .filter(Boolean);
    return !mockTables.some(t => t.seats >= guests && !bookedTableIds.includes(t.id));
  }, [selectedDate, partySize, mockReservations, mockTables]);

  const availableTables = useMemo(() => {
    const guests = Number(partySize);
    const booked = mockReservations
      .filter(r => r.date === selectedDate && r.time === time && r.status !== 'Cancelled')
      .map(r => r.tableId);
    return mockTables.filter(t => t.seats >= guests && !booked.includes(t.id));
  }, [selectedDate, time, partySize, mockReservations, mockTables]);

  const validate = useCallback(() => {
    const today = new Date();
    const date = new Date(`${selectedDate}T00:00:00`);
    const booking = new Date(`${selectedDate}T${time || '00:00'}:00`);
    if (!selectedDate || Number.isNaN(date.getTime())) return 'Please select a valid date.';
    if (date < new Date(today.toDateString())) return 'Date cannot be in the past.';
    if (!time) return 'Please select a time slot.';
    if (booking.getTime() - Date.now() < 60 * 60 * 1000) return 'Booking must be at least one hour ahead.';
    if (!Number.isInteger(Number(partySize)) || Number(partySize) < 1 || Number(partySize) > 12) return 'Party size must be between 1 and 12.';
    if (!/^03\d{2}-\d{7}$/.test(phone)) return 'Use Pakistani mobile format 03XX-XXXXXXX.';
    if (!availableTables.length) return 'No table with enough seats is available at this time.';
    return null;
  }, [selectedDate, time, partySize, phone, availableTables]);

  const createReservation = useCallback(() => {
    const error = validate();
    if (error) return {error};
    const chosenTable = table && availableTables.some(t => t.id === table) ? table : availableTables[0].id;
    return {
      reservation: {
        id: Date.now(),
        date: selectedDate,
        time,
        party: Number(partySize),
        partySize: Number(partySize),
        phone,
        tableId: chosenTable,
        status: 'Pending',
      },
    };
  }, [validate, table, availableTables, selectedDate, time, partySize, phone]);

  const cancelReservation = useCallback((reservations, id) =>
    reservations.map(r => r.id === id ? {...r, status: 'Cancelled'} : r), []);

  return {
    selectedDate, setSelectedDate,
    time, setTime,
    partySize, setPartySize,
    table, setTable,
    phone, setPhone,
    timeSlots: TIME_SLOTS,
    availableTables,
    isSlotUnavailable,
    createReservation,
    cancelReservation,
    validate,
  };
}
