type order_t = {
  id:         int,
  buy_sell:   bool,
  price:      tez,
  nft_asset:  nat,
  nft_issuer: address,
  expiration: timestamp
};

type storage = {
  owner:              address,
  orders:             map(int, order_t),
  whitlisted_issuers: set(address),
  total_orders:       int,
}

let%entry whitelist_issuer = (issuer: address, storage: storage) => {
  if (Current.source() != storage.owner) {
    Current.failwith("Forbidden");
  }
  
  let storage = storage.whitlisted_issuers = Set.add(issuer, storage.whitlisted_issuers);
  ([], storage)
};

let%entry ban_issuer = (issuer: address, storage: storage) => {
  if (Current.source() != storage.owner) {
    Current.failwith("Forbidden");
  }
  
  let storage = storage.whitlisted_issuers = Set.remove(issuer, storage.whitlisted_issuers);
  ([], storage)
};


let%entry place_order = ((buy: bool, expiration: timestamp, asset: nat, issuer: address), storage: storage) => {
  if (0tz == Current.amount()) {
    failwith("Order price should be greater than 0tz");
  }

  if (expiration < Current.time()) {
    failwith("Order expiration cannot be before today");
  }

  if (!Set.mem(issuer, storage.whitlisted_issuers)) {
    failwith(("Asset issuer is not permited", issuer));
  }


  let id = storage.total_orders + 1;
  let order = { id: id, buy_sell: buy, price: Current.amount(), nft_asset: asset, nft_issuer: issuer, expiration: expiration };

  let storage = storage.orders = Map.add(id, order, storage.orders);
  let storage = storage.total_orders = id;
  
  ([], storage);
};


let%entry update_order = (order: order_t, storage: storage) => {
  if (!Map.mem(order.id, storage.orders)) {
    failwith(("Order doesn't exist", order.id));
  }

  let storage = storage.orders = Map.add(order.id, order, storage.orders);
  
  ([], storage);
};

let%entry cancel_order = (id: int, storage: storage) => {
  if (!Map.mem(id, storage.orders)) {
    failwith(("Order doesn't exist", id));
  }

  let storage = storage.orders = Map.remove(id, storage.orders);
  let storage = storage.total_orders = storage.total_orders - 1;
  
  ([], storage);
};