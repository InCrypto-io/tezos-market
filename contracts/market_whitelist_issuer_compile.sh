PARAMETER='WhitelistIssuer(record issuer = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) end)'
STORAGE='record orders = map 1n -> record owner = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address); buy_sell = True; price = 0mtz; nft_asset = 1n; nft_issuer = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address); end; end; owner = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address); whitelist_issuer = set ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address); end; total_orders = 1n; end'


contract_name="market"
entry_point="main"


echo "### CONTRACT ###"

ligo compile-contract $contract_name.ligo $entry_point > ${contract_name}_tmp.tz
#correcting end of line for UNIX systems
tr -d '\r' < ${contract_name}_tmp.tz > ${contract_name}.tz
rm ${contract_name}_tmp.tz

cat ${contract_name}.tz

echo "### PARAMETER ###"

ligo compile-parameter $contract_name.ligo $entry_point "$PARAMETER"

echo "### STORAGE ###"

ligo compile-storage $contract_name.ligo $entry_point "$STORAGE"