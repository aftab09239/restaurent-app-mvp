# Progress

- Q1 SRS: completed and regenerated in `A1/SRS.pdf`.
- Q2 UML: five required PNG diagrams included in `A1/UML/`.
- Q3 Authentication: mock customer/manager credentials, validation, loading and role routing implemented.
- Q4 Menu: 15 local items, categories, specials, availability, simulated loading, retry and refresh implemented.
- Q5 Search: ref focus/clear, 400 ms debounce, recent searches, duplicate prevention, render counter and back-to-top implemented.
- Q6 Shared state/theme: Auth, Theme and Cart contexts are present; OrdersContext added for persisted order state.
- Q7 Cart: reducer actions, notes, quantity controls and promo codes implemented; reducer test-case table added.
- Q8 Order Summary/Performance: useMemo, useCallback, React.memo, favourites, sorting and a dedicated Order Summary implementation added.
- Q9 Reservations: `useReservation` now owns validation, time-slot availability, table capacity and reservation creation/cancellation logic.
- Q10 Integration: Dine-in/Takeaway flow, timed order tracking, manager dashboard, AsyncStorage persistence and customer/manager menu synchronization implemented.
- Evidence/docs: README, Q4 dependency-array note, Q8 performance note and existing screenshots retained.
- Verification: non-JSX source files passed `node --check`; SRS is a 5-page A4 PDF and all five UML PNG files are present.
