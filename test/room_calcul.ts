function combinationSum(arr: number[], sum: number, size: number) {
  let ans = new Array();
  let temp = new Array();

  // first do hashing since hashset does not always
  // sort
  //  removing the duplicates using HashSet and
  // Sorting the arrayList

  let set = new Set([...arr]);
  arr = [...set];
  arr.sort();

  findNumbers(ans, arr, sum, 0, temp);
  return ans.filter((r) => r.length === size);
}

function findNumbers(ans: any, arr: any, sum: any, index: any, temp: any) {
  if (sum == 0) {
    // pushing deep copy of list to ans

    ans.push([...temp]);
    return;
  }

  for (let i = index; i < arr.length; i++) {
    // checking that sum does not become negative

    if (sum - arr[i] >= 0) {
      // pushing element which can contribute to
      // sum

      temp.push(arr[i]);

      findNumbers(ans, arr, sum - arr[i], i, temp);

      // removing element from list (backtracking)
      temp.splice(temp.indexOf(arr[i]), 1);
    }
  }
}

export function roomPlacementCombination(
  adults: number,
  rooms_count: number,
): number[][] {
  return combinationSum(
    Array(adults)
      .fill(1)
      .map((_, i) => i + 1),
    adults,
    rooms_count,
  )
    .slice(-5)
    .reverse();
}

type OrderRecord = {
  room_id: number;
  rate_id: number;
  occupancy: number;
  guest_count?: number;
};

export function generateRoomsByFilter(
  rooms: any,
  filter: { adults: number; room_count: number },
) {
  if (filter.adults < filter.room_count) {
    throw new Error('Adults less then room count!');
  }

  const combinations = roomPlacementCombination(
    filter.adults,
    filter.room_count,
  );

  let records: any[];

  for (const combination of combinations) {
    records = find(rooms, [...combination].sort());
    if (records.length) {
      rooms.forEach((room: any) => {
        room;
        const r = records.filter((r) => r.room_id === room.id).length;
        room.used_rooms = r;
      });
      return { records, rooms };
    }
  }

  return {
    records: [],
    rooms,
  };
}

export function addToCart(
  records: OrderRecord[],
  new_record: OrderRecord,
  count: number,
  rooms: any[],
) {
  const my_rooms = rooms.map((r) => ({ ...r }));
  const filtred = records.filter((r) => {
    return !(
      r.rate_id === new_record.rate_id &&
      r.room_id === new_record.room_id &&
      r.occupancy === new_record.occupancy
    );
  });

  const removed_rooms = records.length - filtred.length;

  const room = my_rooms.find((room) => room.id === new_record.room_id);
  if (!room) {
    throw new Error('No Room');
  }

  if (room.rooms_to_sell - count - filtred.length < 0) {
    throw new Error('No aviable rooms to sell!');
  }

  if (removed_rooms > 0 && room.used_rooms) {
    room.used_rooms = room.used_rooms - removed_rooms;
  }

  room.used_rooms = room.used_rooms + count;
  const price = room.rates.find((r: any) => r.rate_id === new_record.rate_id)!
    .prices_per_guest[new_record.occupancy];

  if (!price) {
    throw new Error('No occupancy!');
  }

  const new_records = Array(count)
    .fill(1)
    .map(() => {
      return { ...new_record, guest_count: new_record.occupancy, price };
    });

  return {
    records: [...filtred, ...new_records],
    rooms: my_rooms,
  };
}

function find(rooms: any, combination: number[]) {
  const records: any[] = [];
  let l_c = combination.length;
  for (const room of rooms) {
    let rooms_to_sell = room.rooms_to_sell;
    for (const rate of room.rates) {
      for (let i = 0; i < combination.length; i++) {
        const guest_count = combination[i];
        const price = rate.prices_per_guest[guest_count];

        if (guest_count && price && rooms_to_sell) {
          delete combination[i];
          l_c--;
          rooms_to_sell--;

          records.push({
            room_id: room.id,
            rate_id: rate.rate_id,
            occupancy: guest_count,
            guest_count: guest_count,
            price,
          });

          if (l_c === 0) {
            return records;
          }
        }
      }
    }
  }

  return [];
}
