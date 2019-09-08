type nftId is nat;

// @remarks Meta data will be added to this record.
type nft is record [
    owner : address;
]

type nfts is map(nftId, nft);

type storageType is record [
  nfts : nfts;
  contractOwner : address;
];

type actionMint is record [
  nftToMintId : nftId;
  nftToMint : nft;
]

type actionTransfer is record [
  nftToTransfer : nftId;
  destination : address;
]

type actionBurn is record [
    nftToBurnId : nftId;
]

type action is
| Mint of actionMint
| Transfer of actionTransfer
| Burn of actionBurn
| Dummy of int

// Mints a new NFT by creating a new entry in the contract.
// @param nftToMintId - ID of the NFT
// @param nftToMint - The NFT data structure
function mint(const action : actionMint ; const s : storageType) : (list(operation) * storageType) is
  block { 
    //check whether contract owner is issuing command
    if source =/= s.contractOwner then fail("You do not have permission to mint assets");
    else skip;
     
    // check whether nft already exists
    // const nft : nft = get_force(action.nftToMintId, s.nfts);
    // if nft =/= nil then
    const nfts : nfts = s.nfts;
    nfts[action.nftToMintId] := action.nftToMint;
    s.nfts := nfts;
   } with ((nil: list(operation)) , s)

// Transfers the ownership of an NFT by replacing the owner address.
// @param nftToTransfer - ID of the NFT
// @param destination - Address of the recipient
function transfer(const action : actionTransfer ; const s : storageType) : (list(operation) * storageType) is
  block { 
    const nft : nft = get_force(action.nftToTransfer, s.nfts);
    const owner: address = nft.owner;
    // TODO implement method to place order
    // if source =/= owner then fail("You do not have permission to transfer this asset.")
    // else skip;
    const nfts : nfts = s.nfts;
    nft.owner := action.destination; 
    nfts[action.nftToTransfer] := nft;
    s.nfts := nfts;
   } with ((nil: list(operation)) , s)

// Burns an NFT by removing its entry from the contract.
// @param nftToBurnId - ID of the NFT
function burn(const action : actionBurn ; const s : storageType) : (list(operation) * storageType) is
  block { 
    // check only nft owner allowed to do
    const nft : nft = get_force(action.nftToBurnId, s.nfts);
    // if nft.owner = source then
    if source =/= nft.owner then fail("You do not have permission to burn this asset")
    else skip;
    const nfts : nfts = s.nfts;
    remove action.nftToBurnId from map nfts;
    s.nfts := nfts;
   } with ((nil: list(operation)) , s)


function dummy(const action : int; const s: storageType) : (list(operation) * storageType) is
  block { 
    skip;
   } with ((nil: list(operation)) , s)

// @remarks In v004 Athens, Michelson does not support multiple entrypoints. This is solved 
// in Ligo through variants and pattern matching.
// @param Any of the action types defined above.
function main(const action : action; const s : storageType) : (list(operation) * storageType) is 
 block {skip} with 
 case action of
 | Mint (mt) -> mint (mt, s)
 | Transfer (tx) -> transfer (tx, s)
 | Burn (bn) -> burn (bn, s)
 | Dummy (dm) -> dummy (dm, s)
end