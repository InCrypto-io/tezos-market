type order_t = {
  id: int,
  buy_sell: bool,
  price: tez,
  asset: key_hash,
  expiration: timestamp
};

type storage = map(int, order_t)

let%entry place_order = ((buy: bool, expiration: timestamp, asset: key_hash), storage: storage) => {
  let order = { id: 1, buy_sell: buy, price: Current.amount(), asset: asset, expiration: expiration };

  let storage = Map.add(1, order, storage);
  
  ([], storage);
};

let%entry update_order = (order: order_t), storage: storage) => {
  let storage = Map.update order.id order storage;
  
  ([], storage);
};

let%entry cancel_order = (id: int, storage: storage) => {
  let storage = Map.remove(id, storage);
  
  ([], storage);
};