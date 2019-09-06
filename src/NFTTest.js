import * as React from "react";
import Wallet from "./Wallet";

const contract = `
parameter
  (or :_entries
     (pair %transfer address nat)
     (or (address %mint) (pair %approve address nat)));
storage
  (pair :storage
     (big_map :accounts
        address
        (pair :account
           (nat %balance)
           (pair (set %tokens nat) (map %allowances address (set nat)))))
     (pair (nat %version)
           (pair (nat %totalSupply) (pair (string %name) (pair (string %symbol) (address %owner))))));
code { DUP ;
       DIP { CDR @storage_slash_1 } ;
       CAR @parameter_slash_2 ;
       LAMBDA @get_account
         (pair address
               (big_map
                  address
                  (pair :account
                     (nat %balance)
                     (pair (set %tokens nat) (map %allowances address (set nat))))))
         (pair :account
            (nat %balance)
            (pair (set %tokens nat) (map %allowances address (set nat))))
         { RENAME @_a_accounts_slash_3 ;
           DUP ;
           CDR @accounts ;
           DUUP ;
           CAR @a ;
           GET ;
           IF_NONE
             { PUSH (map address (set nat)) {} ;
               PUSH (set nat) {} ;
               PAIR %tokens %allowances ;
               PUSH nat 0 ;
               PAIR %balance }
             {} ;
           DIP { DROP } } ;
       DUUP @parameter ;
       IF_LEFT
         { RENAME @_dest_token_id_slash_36 ;
           DUUP @get_account ;
           DUUUUUP @storage ;
           DUUUP ;
           CDR @token_id ;
           PAIR ;
           DUUUP ;
           CAR @dest ;
           PAIR ;
           SENDER ;
           PAIR ;
           PAIR ;
           DUP ;
           CAR ;
           CAR @from ;
           DUUP ;
           CAR ;
           CDAR @dest ;
           DUUUP ;
           CAR ;
           CDDAR @token_id ;
           DUUUUP ;
           CAR ;
           CDDDR @storage ;
           DUP @storage ;
           CAR @accounts %accounts ;
           DUUUUUUP ;
           CDR @get_account_slash_7 ;
           DUUP @accounts ;
           DUUUUUUUP @from ;
           PAIR ;
           EXEC @account_sender ;
           DUP @account_sender ;
           CDAR %tokens ;
           DUUUUUP @token_id ;
           MEM ;
           NOT ;
           IF { DUP @account_sender ;
                CDAR %tokens ;
                PUSH string "There is no such token which You want to transfer" ;
                PAIR ;
                FAILWITH }
              { UNIT } ;
           DROP ;
           DUUP @accounts ;
           DUUP @account_sender ;
           CDDR %allowances ;
           DUUUP @account_sender ;
           CDAR %tokens ;
           DUUUUUUUP @token_id ;
           DIP { PUSH bool False } ;
           UPDATE ;
           PAIR %tokens %allowances ;
           PUSH int 1 ;
           DUUUUP @account_sender ;
           CAR %balance ;
           SUB ;
           ISNAT ;
           IF_NONE
             { DUUUP @account_sender ;
               CAR %balance ;
               PUSH string "Not enough tokens for transfer" ;
               PAIR ;
               FAILWITH }
             { DUUUUP @account_sender ; CDR ; SWAP ; PAIR %balance } ;
           RENAME @new_balance_sender ;
           CAR %balance ;
           PAIR @account_sender %balance ;
           DUUUUUUUUP @from ;
           DIP { SOME } ;
           UPDATE @accounts ;
           DUUUUUUUUP ;
           CDR @get_account_slash_7 ;
           DUUP @accounts ;
           DUUUUUUUUP @dest ;
           PAIR ;
           EXEC @account_dest ;
           DUP @account_dest ;
           CDR ;
           PUSH nat 1 ;
           DUUUP @account_dest ;
           CAR %balance ;
           ADD ;
           PAIR @new_account_dest %balance ;
           DUUUUUUP @storage ;
           CDR ;
           DUUUUP @accounts ;
           DUUUP @new_account_dest ;
           CDDR %allowances ;
           DUUUUP @new_account_dest ;
           CDAR %tokens ;
           DUUUUUUUUUUUP @token_id ;
           DIP { PUSH bool True } ;
           UPDATE ;
           PAIR %tokens %allowances ;
           DUUUUP @new_account_dest ;
           CAR %balance ;
           PAIR @new_account_dest %balance ;
           DUUUUUUUUUUUP @dest ;
           DIP { SOME } ;
           DIIIIP
             { DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP ;
               DROP } ;
           UPDATE @accounts ;
           PAIR %accounts ;
           NIL operation ;
           PAIR }
         { IF_LEFT
             { RENAME @dest_slash_40 ;
               DUUUUP @storage ;
               DUP @storage ;
               CDDDDDR %owner ;
               SENDER ;
               COMPARE ;
               NEQ ;
               IF { PUSH string "Only owner can mint tokens" ; FAILWITH } { UNIT } ;
               DROP ;
               DUUUP @get_account ;
               DUUP @storage ;
               DUUUUP @dest ;
               PAIR ;
               PAIR ;
               DUP ;
               CAR ;
               CAR @dest ;
               DUUP ;
               CAR ;
               CDR @storage ;
               DUP @storage ;
               CAR @accounts %accounts ;
               DUUUUP ;
               CDR @get_account_slash_7 ;
               DUUP @accounts ;
               DUUUUUP @dest ;
               PAIR ;
               EXEC @account_sender ;
               DUUUP @storage ;
               DUP ;
               CAR %accounts ;
               SWAP ;
               CDR ;
               DUP ;
               CAR %version ;
               SWAP ;
               CDR ;
               CDR ;
               PUSH nat 1 ;
               DUUUUUUUP @storage ;
               CDDAR %totalSupply ;
               ADD ;
               PAIR %totalSupply ;
               SWAP ;
               PAIR %version ;
               SWAP ;
               PAIR @storage %accounts ;
               CDR ;
               DUUUP @accounts ;
               DUUUP @account_sender ;
               CDDR %allowances ;
               DUUUUP @account_sender ;
               CDAR %tokens ;
               PUSH nat 1 ;
               DUUUUUUUUP @storage ;
               CDDAR %totalSupply ;
               ADD @new_token_id ;
               DIP { PUSH bool True } ;
               UPDATE ;
               PAIR %tokens %allowances ;
               PUSH nat 1 ;
               DUUUUUP @account_sender ;
               CAR %balance ;
               ADD ;
               PAIR @account_with_new_token %balance ;
               DUUUUUUUP @dest ;
               DIP { SOME } ;
               DIIIIP { DROP ; DROP ; DROP ; DROP ; DROP ; DROP ; DROP } ;
               UPDATE @accounts ;
               PAIR %accounts ;
               NIL operation ;
               PAIR }
             { RENAME @_spender_token_id_slash_42 ;
               DUUUUP @storage ;
               DUUP ;
               CAR @spender ;
               DUUUP ;
               CDR @token_id ;
               DUUUUUP @get_account ;
               DUUUUP @storage ;
               CAR %accounts ;
               SENDER ;
               PAIR ;
               EXEC @account_sender ;
               DUP @account_sender ;
               CDAR %tokens ;
               DUUUP @token_id ;
               MEM ;
               NOT ;
               IF { DUP @account_sender ;
                    CDAR %tokens ;
                    PUSH string "There is no such token which You want to approve" ;
                    PAIR ;
                    FAILWITH }
                  { UNIT } ;
               DROP ;
               DUUUUP @storage ;
               CDR ;
               DUUUUUP @storage ;
               CAR %accounts ;
               DUUUP @account_sender ;
               DUP ;
               CAR %balance ;
               SWAP ;
               CDR ;
               CAR %tokens ;
               DUUUUUP @account_sender ;
               CDDR %allowances ;
               DUUUUUUP @account_sender ;
               CDDR %allowances ;
               DUUUUUUUUUP @spender ;
               GET ;
               IF_NONE
                 { PUSH string "Spender address has no any allowances" ; FAILWITH }
                 {} ;
               RENAME @spenders_allowances ;
               DUUUUUUUUP @token_id ;
               DIP { PUSH bool True } ;
               UPDATE @new_tokens_allowance ;
               DUUUUUUUUUP @spender ;
               DIP { SOME } ;
               UPDATE ;
               SWAP ;
               PAIR %tokens %allowances ;
               SWAP ;
               PAIR @account_sender %balance ;
               SENDER ;
               DIP { SOME } ;
               DIIIIP { DROP ; DROP ; DROP ; DROP ; DROP } ;
               UPDATE ;
               PAIR @storage %accounts ;
               NIL operation ;
               PAIR } } ;
       DIP { DROP ; DROP ; DROP } };
`;

export default class NFTTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            amount: 789,
        }
    }

    handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    };

    getAddress = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1LBr6KLhdxwbWEyDBofhwRwiR8pfvfPPFm",
            contract)
            .catch(console.error);

        this.setState({
            address: wallet.accounts[0].address
        })
    };

    mint = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1LBr6KLhdxwbWEyDBofhwRwiR8pfvfPPFm",
            contract)
            .catch(console.error);
        wallet.invoke("mint",
            {},
            this.state.address
        ).catch(console.error);
    };

    transfer = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1LBr6KLhdxwbWEyDBofhwRwiR8pfvfPPFm",
            contract)
            .catch(console.error);
        wallet.invoke("transfer",
            {},
            this.state.address,
            Number(this.state.amount)
        ).catch(console.error);
    };

    approve = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1LBr6KLhdxwbWEyDBofhwRwiR8pfvfPPFm",
            contract)
            .catch(console.error);
        wallet.invoke("approve",
            {},
            this.state.address,
            Number(this.state.amount)
        ).catch(console.error);
    };

    render() {
        return <div style={{background: "#330"}}>
            <span>---------NFT test----------</span>
            <p>
                <p>
                    <button onClick={this.getAddress}>
                        get address
                    </button>
                </p>
                <p>
                    <p>
                        <span>owner/transfer to </span>
                        <input type="text" value={this.state.address} name={"address"} onChange={this.handleChange} />
                    </p>
                    <p>
                        <span>amount </span>
                        <input type="number" value={this.state.amount} name={"amount"} onChange={this.handleChange} />
                    </p>
                </p>

                <p>
                    <button onClick={this.mint}>
                        mint
                    </button>
                </p>
                <p>
                    <button onClick={this.approve}>
                        approve
                    </button>
                </p>
                <p>
                    <button onClick={this.transfer}>
                        transfer
                    </button>
                </p>
            </p>
        </div>
    }
}