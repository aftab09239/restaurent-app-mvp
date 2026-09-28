# Cart Reducer Test Cases

| # | Action | Initial state | Expected state |
|---|---|---|---|
| 1 | ADD_ITEM | `items=[]` | item added with `quantity=1` |
| 2 | ADD_ITEM | same item qty 1 | quantity becomes 2 |
| 3 | INCREMENT | qty 2 | quantity becomes 3 |
| 4 | DECREMENT | qty 2 | quantity becomes 1 |
| 5 | DECREMENT | qty 1 | item removed |
| 6 | UPDATE_NOTE | note empty | note contains user instruction |
| 7 | APPLY_PROMO | no promo | WELCOME10 sets 10% discount |
| 8 | REMOVE_PROMO | WELCOME10 applied | promo cleared and discount becomes 0 |
| 9 | REMOVE_ITEM | item exists | item removed |
| 10 | CLEAR_CART | multiple items | empty cart and no promo |
