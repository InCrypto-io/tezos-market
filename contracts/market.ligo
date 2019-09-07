type nftId is nat;

type order is record [
  owner:      address;
  buy_sell:   bool;
  price:      tez;
  nft_asset:  nftId;
  nft_issuer: address;
];

type orders is map(nftId, order);
type issuers is set(address);

type storageType is record [
  owner: address;
  orders: orders;
  whitelist_issuer: issuers;
  total_orders: nat;
];


type placeOrderAction is record [
  asset: nftId;
  price: tez;
  issuer: address;  
];

type actionTransfer is record [
  nftToTransfer : nftId;
  destination : address;
]

// Mints a new NFT by creating a new entry in the contract.
// @param nftToMintId - ID of the NFT
// @param nftToMint - The NFT data structure
function placeOrder(const action : placeOrderAction; const s : storageType) : (list(operation) * storageType) is 
begin
  if action.price = 0mtz then 
    fail("Price should be greater than 0tz");
  else if not set_mem(action.issuer, s.whitelist_issuer) then
    fail("Issuer is not in whitelist")
  else
    skip;

    const order : order = record
    owner      = source;
    buy_sell   = True;
    price      = action.price;
    nft_asset  = action.asset;
    nft_issuer = action.issuer;
  end;
    
  const orders : orders = s.orders;
  orders[action.asset] := order;
  s.orders := orders;

  // Put token on hold (market contract plays role of custodian)  
  const transferParams: actionTransfer = record
    nftToTransfer = action.asset;
    destination = s.owner;
  end;
  const receiver : contract(actionTransfer) = get_contract(action.issuer);
  const payoutOperation : operation = transaction(transferParams, 0mtz, receiver);
  const operations : list(operation) = list payoutOperation end;
end with (operations, s)


type cancelOrderAction is record [
  asset: nftId;
];

function cancelOrder(const action : cancelOrderAction; const s : storageType) : (list(operation) * storageType) is 
begin
  const order : order = get_force(action.asset, s.orders);
  if source =/= order.owner then
    fail("You are not owner of the order")
  else
    skip;

  const orders : orders = s.orders;
  remove action.asset from map orders;
  s.orders := orders;

  // return from hold to token original owner
  const transferParams: actionTransfer = record
    nftToTransfer = action.asset;
    destination = order.owner;
  end;
  const receiver : contract(actionTransfer) = get_contract(order.nft_issuer);
  const payoutOperation : operation = transaction(transferParams, 0mtz, receiver);
  const operations : list(operation) = list payoutOperation end;
end with (operations, s)


type fillOrderAction is record[
  asset: nftId;
]

function orders_mem(const key: nftId; const orders : orders) : bool is
begin
  var result : bool := False;

  var optional : option(order) := orders[key];
  case optional of
    | None -> skip
    | Some(value) -> result:=True
  end;
end with result


function fillOrder(const action : fillOrderAction; const s : storageType) : (list(operation) * storageType) is 
begin
  if not orders_mem(action.asset, s.orders) then
    fail("Order ", action.asset, " not found");
  else
    skip;

  const order : order = get_force(action.asset, s.orders);
  if amount < order.price then
    fail("Bid[ ", amount, "] < Ask[ ", order.price, " ]" );
  else
    skip;

  const orders : orders = s.orders;
  remove action.asset from map orders;
  s.orders := orders;

  // sell asset to caller
  const transferParams: actionTransfer = record
    nftToTransfer = order.nft_asset;
    destination = source;
  end;
  const receiver : contract(actionTransfer) = get_contract(order.nft_issuer);
  const payoutOperation : operation = transaction(transferParams, order.price, receiver);
  const operations : list(operation) = list payoutOperation end;
end with (operations, s)


type whitelistIssuerAction is record[
  issuer: address;
]

function whitelistIssuer(const action : whitelistIssuerAction; const s : storageType) : (list(operation) * storageType) is 
begin
  if source =/= s.owner then fail("You do not have permission.")
  else skip;

  const issuers : issuers = s.whitelist_issuer;
  issuers := set_add( action.issuer, issuers);

  s.whitelist_issuer := issuers;
end with ((nil: list(operation)) , s)


type blockIssuerAction is record[
  issuer: address;
]

function blockIssuer(const action : blockIssuerAction; const s : storageType) : (list(operation) * storageType) is 
begin
  if source =/= s.owner then fail("You do not have permission.")
  else skip;

  const issuers : issuers = s.whitelist_issuer;
  issuers := set_remove( action.issuer, issuers);

  s.whitelist_issuer := issuers;
end with ((nil: list(operation)) , s)


type action is
| WhitelistIssuer of whitelistIssuerAction
| BlockIssuer of blockIssuerAction
| PlaceOrder of placeOrderAction
| CancelOrder of cancelOrderAction
| FillOrder of fillOrderAction

function main(const action : action; const s : storageType) : (list(operation) * storageType) is 
begin
  skip;
end with 
 case action of
 | WhitelistIssuer (params) -> whitelistIssuer (params, s)
 | BlockIssuer (params)     -> blockIssuer (params, s)
 | PlaceOrder (params)      -> placeOrder (params, s)
 | CancelOrder (params)     -> cancelOrder (params, s)
 | FillOrder (params)       -> fillOrder (params, s)
end