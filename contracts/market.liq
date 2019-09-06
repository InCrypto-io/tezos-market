type order_t = {
  id: int,
  buy_sell: bool,
  price: tez,
  asset: key_hash,
  expiration: timestamp
};

type storage = {
  orders: map(int, order_t),
  total_orders: int
}


let%entry place_order = ((buy: bool, expiration: timestamp, asset: key_hash), storage: storage) => {
  if (0tz == Current.amount()) {
    failwith("Order price should be greater than 0tz");
  };

  if (expiration < Current.time()) {
    failwith("Order expiration cannot be before today");
  };

  let id = storage.total_orders + 1;
  let order = { id: id, buy_sell: buy, price: Current.amount(), asset: asset, expiration: expiration };

  let storage = storage.orders = Map.add(id, order, storage.orders);
  let storage = storage.total_orders = id;
  
  ([], storage);
};


let%entry update_order = (order: order_t, storage: storage) => {
  if (!Map.mem(order.id, storage.orders)) {
    failwith(("Order doesn't exist", order.id));
  };

  let storage = storage.orders = Map.add(order.id, order, storage.orders);
  
  ([], storage);
};

let%entry cancel_order = (id: int, storage: storage) => {
  if (!Map.mem(id, storage.orders)) {
    failwith(("Order doesn't exist", id));
  };

  let storage = storage.orders = Map.remove(id, storage.orders);
  let storage = storage.total_orders = storage.total_orders - 1;
  
  ([], storage);
};