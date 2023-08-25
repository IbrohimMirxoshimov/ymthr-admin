import { addToCart, generateRoomsByFilter } from './room_calcul';

const __rooms = [
  {
    id: 1,
    rooms_to_sell: 5,
    rates: [
      {
        id: '1-1-1',
        room_id: 1,
        rate_id: 1,
        prices_per_guest: {
          1: 1000,
          2: 1800,
          5: 4000,
        } as Record<number, number>,
      },
    ],
  },
  {
    id: 2,
    rooms_to_sell: 10,
    rates: [
      {
        id: '1-1-1',
        room_id: 1,
        rate_id: 1,

        prices_per_guest: {
          1: 1000,
          2: 1800,
          3: 4000,
        } as Record<number, number>,
      },
    ],
  },
];

const cart = generateRoomsByFilter(__rooms, { adults: 4, room_count: 2 });

let res = addToCart(
  cart.records,
  {
    occupancy: 5,
    rate_id: 1,
    room_id: 1,
  },
  3,
  __rooms,
);

cart.records = res.records