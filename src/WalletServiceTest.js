import * as React from "react";
import Wallet from "./Wallet";

const contract = `
parameter
  (or :_entries
     (string %set_value)
     (or (pair %set_values string int) (pair %multp_set_values string int)));
storage (pair :storage (string %text) (int %num));
code { DUP ;
       DIP { CDR @storage_slash_1 } ;
       CAR @parameter_slash_2 ;
       DUP @parameter ;
       IF_LEFT
         { RENAME @choice_slash_3 ;
           DUUUP @storage ;
           CDR %num ;
           SWAP ;
           PAIR @storage %text %num ;
           NIL operation ;
           PAIR }
         { IF_LEFT
             { RENAME @_choice_num_slash_6 ;
               DUP ;
               CDR @num ;
               SWAP ;
               CAR @choice ;
               PAIR @storage %text %num ;
               NIL operation ;
               PAIR }
             { RENAME @_choice_num_slash_11 ;
               PUSH int 2 ;
               DUUP ;
               CDR @num ;
               MUL ;
               SWAP ;
               CAR @choice ;
               PAIR @storage %text %num ;
               NIL operation ;
               PAIR } } ;
       DIP { DROP ; DROP } };
`;

export default class WalletServiceTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleTx = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1AT6oyJBjEVFZ3A8oYMD1WYGeekKgHn8wi",
            contract)
            .catch(console.error);
        wallet.invoke("multp_set_values",
            {},
            "wallet service",
            753
        ).catch(console.error);
    };

    render() {
        return <div style={{background: "#333"}}>
            <span>++++++++wallet service++++++++++++++++</span>
            <p>
                <button onClick={this.handleTx}>
                    test wallet service
                </button>
            </p>
        </div>
    }
}