import * as React from "react";
import Wallet from "./Wallet";

const contract = `
parameter
  (or :_entries
     (pair %transfer address nat)
     (or (address %mint)
         (or (pair %approve address nat) (pair %transferFrom address (pair address nat)))));
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
       DUP @get_account ;
       LAMBDA
         (pair (pair address
                     (pair address
                           (pair nat
                                 (pair :storage
                                    (big_map :accounts
                                       address
                                       (pair :account
                                          (nat %balance)
                                          (pair (set %tokens nat) (map %allowances address (set nat)))))
                                    (pair (nat %version)
                                          (pair (nat %totalSupply) (pair (string %name) (pair (string %symbol) (address %owner)))))))))
               (lambda
                  (pair address
                        (big_map
                           address
                           (pair :account
                              (nat %balance)
                              (pair (set %tokens nat) (map %allowances address (set nat))))))
                  (pair :account
                     (nat %balance)
                     (pair (set %tokens nat) (map %allowances address (set nat))))))
         (pair (list operation)
               (pair :storage
                  (big_map :accounts
                     address
                     (pair :account
                        (nat %balance)
                        (pair (set %tokens nat) (map %allowances address (set nat)))))
                  (pair (nat %version)
                        (pair (nat %totalSupply) (pair (string %name) (pair (string %symbol) (address %owner)))))))
         { RENAME @_from_dest_token_id_storage__get_account_slash_8 ;
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
             { DROP ; DROP ; DROP ; DROP ; DROP ; DROP ; DROP ; DROP ; DROP ; DROP } ;
           UPDATE @accounts ;
           PAIR %accounts ;
           NIL operation ;
           PAIR } ;
       PAIR @perform_transfer ;
       DUUUP @parameter ;
       IF_LEFT
         { RENAME @_dest_token_id_slash_36 ;
           DUUP @perform_transfer ;
           DUUUUUUP @storage ;
           DUUUP ;
           CDR @token_id ;
           PAIR ;
           DUUUP ;
           CAR @dest ;
           PAIR ;
           SENDER ;
           PAIR ;
           DIP { DUP ; CAR ; SWAP ; CDR } ;
           DIIIP { DROP } ;
           PAIR ;
           EXEC }
         { IF_LEFT
             { RENAME @dest_slash_40 ;
               DUUUUUP @storage ;
               DUP @storage ;
               CDDDDDR %owner ;
               SENDER ;
               COMPARE ;
               NEQ ;
               IF { PUSH string "Only owner can mint tokens" ; FAILWITH } { UNIT } ;
               DROP ;
               DUUUUP @get_account ;
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
             { IF_LEFT
                 { RENAME @_spender_token_id_slash_42 ;
                   DUUUUUP @storage ;
                   DUUP ;
                   CAR @spender ;
                   DUUUP ;
                   CDR @token_id ;
                   DUUUUUUP @get_account ;
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
                   PAIR }
                 { RENAME @_from_dest_token_id_slash_52 ;
                   DUUUUUP @storage ;
                   DUUP ;
                   CAR @from ;
                   DUUUP ;
                   CDDR @token_id ;
                   DUUUUUUP @get_account ;
                   DUUUUP @storage ;
                   CAR %accounts ;
                   DUUUUP @from ;
                   PAIR ;
                   EXEC @account_from ;
                   DUUUUUUP @perform_transfer ;
                   DUUUUUP @storage ;
                   CDR ;
                   DUUUUUUP @storage ;
                   CAR %accounts ;
                   DUUUUP @account_from ;
                   DUP ;
                   CAR %balance ;
                   SWAP ;
                   CDR ;
                   CAR %tokens ;
                   DUUUUUUP @account_from ;
                   CDDR %allowances ;
                   DUUUUUUUP @account_from ;
                   CDDR %allowances ;
                   SENDER ;
                   GET ;
                   IF_NONE
                     { DUUUUUUUUUP @from ;
                       PUSH string "Not allowed to spend from" ;
                       PAIR ;
                       FAILWITH }
                     { DUP @allowed ;
                       DUUUUUUUUUUP @token_id ;
                       MEM ;
                       NOT ;
                       IF { PUSH string "Not allowed to spend this token" ; FAILWITH } { UNIT } ;
                       DROP ;
                       DUP @allowed ;
                       DUUUUUUUUUUP @token_id ;
                       DIP { PUSH bool False } ;
                       DIIIP { DROP } ;
                       UPDATE } ;
                   RENAME @new_allowances_from ;
                   SENDER ;
                   DIP { SOME } ;
                   UPDATE @account_from_map ;
                   SWAP ;
                   PAIR %tokens %allowances ;
                   SWAP ;
                   PAIR @account_from %balance ;
                   DUUUUUUUP @from ;
                   DIP { SOME } ;
                   UPDATE ;
                   PAIR @storage %accounts ;
                   DUUUUP @token_id ;
                   PAIR ;
                   DUUUUUUUP ;
                   CDAR @dest ;
                   PAIR ;
                   DUUUUUP @from ;
                   PAIR ;
                   DIP { DUP ; CAR ; SWAP ; CDR } ;
                   DIIIP { DROP ; DROP ; DROP ; DROP ; DROP } ;
                   PAIR ;
                   EXEC } } } ;
       DIP { DROP ; DROP ; DROP ; DROP } };
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
        await wallet.init("KT1RVJpyqptByTfZGaAH7qrtXGuktW5Cfd6B",
            contract)
            .catch(console.error);

        this.setState({
            address: wallet.accounts[0].address
        })
    };

    mint = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1RVJpyqptByTfZGaAH7qrtXGuktW5Cfd6B",
            contract)
            .catch(console.error);
        wallet.invoke("mint",
            {},
            this.state.address
        ).catch(console.error);
    };

    transfer = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1RVJpyqptByTfZGaAH7qrtXGuktW5Cfd6B",
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
        await wallet.init("KT1RVJpyqptByTfZGaAH7qrtXGuktW5Cfd6B",
            contract)
            .catch(console.error);
        wallet.invoke("approve",
            {},
            this.state.address,
            Number(this.state.amount)
        ).catch(console.error);
    };

    getAccess = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1RVJpyqptByTfZGaAH7qrtXGuktW5Cfd6B",
            contract)
            .catch(console.error);
        await wallet.requestAccess();
    };

    render() {
        return <div style={{background: "#330"}}>
            <span>---------NFT test----------</span>
            <p>tz1iycxdCJ3xMYFJ7Qr8zBudNxk89S2TQS7S</p>
            <p>
                <p>
                    <button onClick={this.getAccess}>
                        get access
                    </button>
                </p>
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