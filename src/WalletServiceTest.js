import * as React from "react";
import Wallet from "./Wallet";

const contract = `
{ parameter (or (or nat int) (or (pair %mint address nat) (pair %transfer address nat))) ;
  storage (pair address (map nat address)) ;
  code { {} ;
         { { PUSH (lambda
                     (pair (pair address nat) (pair address (map nat address)))
                     (pair (list operation) (pair address (map nat address))))
                  { { {} ;
                      { { { { DUP } ; CAR } ;
                          { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                            { { { { { { DUP } ; CAR } ; { {} ; SOURCE } } ;
                                  { COMPARE ; NEQ } } ;
                                IF { { { PUSH string "You do not have permission to mint assets" ;
                                         { { { { { DIP { DUP } ; SWAP } } ; CAR } ; { {} ; SOURCE } } ;
                                           { COMPARE ; NEQ } } } ;
                                       IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                   { PUSH unit Unit } } ;
                              { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                { { {} ;
                                    { { DUP ;
                                        { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                              SWAP } } ;
                                          CAR } ;
                                        { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                      SWAP } } ;
                                              SWAP } } ;
                                          CDR } } ;
                                      { DIP { SOME } ; UPDATE } } ;
                                    {} ;
                                    { DIP { DUP } ; SWAP } ;
                                    {} ;
                                    SWAP ;
                                    {} ;
                                    DIP { DROP } ;
                                    {} ;
                                    DIP { DROP } ;
                                    {} } ;
                                  { { {} ;
                                      DUP ;
                                      {} ;
                                      { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                      {} ;
                                      SWAP ;
                                      {} ;
                                      { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                        DIP { DROP } ;
                                        { SWAP ; PAIR } } ;
                                      {} ;
                                      { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } ;
                                      {} } ;
                                    { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ; NIL operation } ;
                                      PAIR } } } ;
                                {} ;
                                DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } } ;
                            {} ;
                            DIP { { DIP { { DIP { DIP { DIP { {} } } } ; DROP } } ; DROP } } } ;
                          {} ;
                          DIP { { DIP { DIP { {} } } ; DROP } } } ;
                        DIP { { DIP { {} } ; DROP } } } } } ;
             { PUSH (lambda
                       (pair (pair address nat) (pair address (map nat address)))
                       (pair (list operation) (pair address (map nat address))))
                    { { {} ;
                        { { { { DUP } ; CAR } ;
                            { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                              { { { { { DUP } ; CDR } ;
                                    { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CDR } } ;
                                  { GET ; IF_NONE { { PUSH string "GET_FORCE" ; FAILWITH } } { {} } } } ;
                                { DUP ;
                                  { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CDR } ;
                                    { { {} ;
                                        { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                              SWAP } } ;
                                          CAR } ;
                                        {} ;
                                        { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                        {} ;
                                        SWAP ;
                                        {} ;
                                        DIP { DROP } ;
                                        {} ;
                                        { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } ;
                                        {} } ;
                                      { { {} ;
                                          { { DUP ;
                                              { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                              { { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                    SWAP } } ;
                                                            SWAP } } ;
                                                    SWAP } } ;
                                                CDR } } ;
                                            { DIP { SOME } ; UPDATE } } ;
                                          {} ;
                                          { DIP { DUP } ; SWAP } ;
                                          {} ;
                                          SWAP ;
                                          {} ;
                                          DIP { DROP } ;
                                          {} ;
                                          DIP { DROP } ;
                                          {} } ;
                                        { { {} ;
                                            DUP ;
                                            {} ;
                                            { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                              SWAP } ;
                                            {} ;
                                            SWAP ;
                                            {} ;
                                            { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                              DIP { DROP } ;
                                              { SWAP ; PAIR } } ;
                                            {} ;
                                            { SWAP ;
                                              DIP { { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } } } ;
                                            {} } ;
                                          { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                              NIL operation } ;
                                            PAIR } } } } ;
                                    {} ;
                                    DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                                            DROP } } } ;
                                  {} ;
                                  DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } ;
                                {} ;
                                DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } } ;
                              {} ;
                              DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } ;
                            {} ;
                            DIP { { DIP { DIP { {} } } ; DROP } } } ;
                          DIP { { DIP { {} } ; DROP } } } } } ;
               { PUSH (lambda
                         (pair nat (pair address (map nat address)))
                         (pair (list operation) (pair address (map nat address))))
                      { { {} ;
                          { { { { DUP } ; CAR } ;
                              { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                { { { { { DUP } ; CDR } ;
                                      { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                    { GET ; IF_NONE { { PUSH string "GET_FORCE" ; FAILWITH } } { {} } } } ;
                                  { { { { DUP ; { {} ; SOURCE } } ; { COMPARE ; NEQ } } ;
                                      IF { { { PUSH string "You do not have permission to burn this asset" ;
                                               { { { DIP { DUP } ; SWAP } ; { {} ; SOURCE } } ;
                                                 { COMPARE ; NEQ } } } ;
                                             IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                         { PUSH unit Unit } } ;
                                    { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CDR } ;
                                      { { {} ;
                                          { { DUP ;
                                              { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                        SWAP } } ;
                                                SWAP } } ;
                                            { DIP { NONE address } ; UPDATE } } ;
                                          {} ;
                                          { DIP { DUP } ; SWAP } ;
                                          {} ;
                                          SWAP ;
                                          {} ;
                                          DIP { DROP } ;
                                          {} ;
                                          DIP { DROP } ;
                                          {} } ;
                                        { { {} ;
                                            DUP ;
                                            {} ;
                                            { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                              SWAP } ;
                                            {} ;
                                            SWAP ;
                                            {} ;
                                            { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                              DIP { DROP } ;
                                              { SWAP ; PAIR } } ;
                                            {} ;
                                            { SWAP ;
                                              DIP { { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } } } ;
                                            {} } ;
                                          { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                              NIL operation } ;
                                            PAIR } } } ;
                                      {} ;
                                      DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                                              DROP } } } } ;
                                  {} ;
                                  DIP { { DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } ;
                                          DROP } } } ;
                                {} ;
                                DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } ;
                              {} ;
                              DIP { { DIP { DIP { {} } } ; DROP } } } ;
                            DIP { { DIP { {} } ; DROP } } } } } ;
                 { PUSH (lambda
                           (pair int (pair address (map nat address)))
                           (pair (list operation) (pair address (map nat address))))
                        { { {} ;
                            { { { { DUP } ; CAR } ;
                                { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                  { PUSH unit Unit ;
                                    { { { DIP { DUP } ; SWAP } ; NIL operation } ; PAIR } } ;
                                  {} ;
                                  DIP { { DIP { { DIP { DIP { DIP { {} } } } ; DROP } } ; DROP } } } ;
                                {} ;
                                DIP { { DIP { DIP { {} } } ; DROP } } } ;
                              DIP { { DIP { {} } ; DROP } } } } } ;
                   { { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                           SWAP } } ;
                       CAR } ;
                     { { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                     SWAP } } ;
                             SWAP } } ;
                         CDR } ;
                       { PUSH unit Unit ;
                         { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ;
                           IF_LEFT
                             { { { DUP ;
                                   IF_LEFT
                                     { { { DUP ;
                                           { {} ;
                                             {} ;
                                             { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } } ;
                                                       SWAP } } ;
                                               SWAP } ;
                                             {} ;
                                             { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                           SWAP } } ;
                                                   SWAP } ;
                                                 { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                               PAIR } ;
                                             EXEC } ;
                                           {} ;
                                           DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } ;
                                                   DROP } } } ;
                                         {} ;
                                         DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } ;
                                                 DROP } } } }
                                     { { { DUP ;
                                           { {} ;
                                             {} ;
                                             { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                               SWAP } } ;
                                                       SWAP } } ;
                                               SWAP } ;
                                             {} ;
                                             { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                           SWAP } } ;
                                                   SWAP } ;
                                                 { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                               PAIR } ;
                                             EXEC } ;
                                           {} ;
                                           DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } ;
                                                   DROP } } } ;
                                         {} ;
                                         DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } ;
                                                 DROP } } } } } ;
                                 {} ;
                                 DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } ;
                                         DROP } } } }
                             { { { DUP ;
                                   IF_LEFT
                                     { { { DUP ;
                                           { {} ;
                                             {} ;
                                             { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                                       SWAP } } ;
                                                                               SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } } ;
                                                       SWAP } } ;
                                               SWAP } ;
                                             {} ;
                                             { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                           SWAP } } ;
                                                   SWAP } ;
                                                 { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                               PAIR } ;
                                             EXEC } ;
                                           {} ;
                                           DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } ;
                                                   DROP } } } ;
                                         {} ;
                                         DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } ;
                                                 DROP } } } }
                                     { { { DUP ;
                                           { {} ;
                                             {} ;
                                             { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                               SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } } ;
                                                       SWAP } } ;
                                               SWAP } ;
                                             {} ;
                                             { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                           SWAP } } ;
                                                   SWAP } ;
                                                 { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                               PAIR } ;
                                             EXEC } ;
                                           {} ;
                                           DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } ;
                                                   DROP } } } ;
                                         {} ;
                                         DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } ;
                                                 DROP } } } } } ;
                                 {} ;
                                 DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } ;
                                         DROP } } } } } } ;
                       {} ;
                       DIP { { DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } ;
                                       DROP } } ;
                               DROP } } } ;
                     {} ;
                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                             DROP } } } ;
                   {} ;
                   DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } ;
                 {} ;
                 DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } } ;
               {} ;
               DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } ;
             {} ;
             DIP { { DIP { DIP { {} } } ; DROP } } } ;
           DIP { { DIP { {} } ; DROP } } } } }

`;

export default class WalletServiceTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleTx = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1CZ2S9eSM8csf5Cnv7TZs7EnbqMGYnAxFv",
            contract)
            .catch(console.error);
        wallet.invoke("transfer",
            {},
            "KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
            1
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