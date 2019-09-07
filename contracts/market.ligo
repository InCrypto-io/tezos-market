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
end with ((nil: list(operation)) , s)


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
end with ((nil: list(operation)) , s)


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
end with ((nil: list(operation)) , s)


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
 | WhitelistIssuer (args) -> whitelistIssuer (args, s)
 | BlockIssuer (args)     -> blockIssuer (args, s)
 | PlaceOrder (args)      -> placeOrder (args, s)
 | CancelOrder (args)     -> cancelOrder (args, s)
 | FillOrder (args)       -> fillOrder (args, s)
end