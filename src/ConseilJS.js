import * as React from "react";
import {TezosWalletUtil, TezosNodeWriter, TezosNodeReader} from 'conseiljs';

const conseiljs = require('conseiljs');

const alphanetFaucetAccount = {
    "mnemonic": [
        "demise",
        "help",
        "race",
        "vocal",
        "elegant",
        "color",
        "bronze",
        "era",
        "degree",
        "employ",
        "finger",
        "traffic",
        "artist",
        "game",
        "security"
    ],
    "secret": "1f2f7487e65411486bd300794f495959750a5698",
    "amount": "63303868019",
    "pkh": "tz1gvPjFRxz5gWdifYA9BGcMjpLnKaDxD1Um",
    "password": "cJ8VjIQ72e",
    "email": "bqtgmubp.jdmmjfmy@tezos.example.org"
};

const tezosNode = "http://alphanet-node.tzscan.io";

// async function sendTransactionOperation(server, keyStore, to, amount, fee, derivationPath, counter) {
//         // const counter = (yield TezosNodeReader.getCounterForAccount(server, keyStore.publicKeyHash)) + 1;
//         const transaction = {
//             destination: to,
//             amount: amount.toString(),
//             storage_limit: '300',
//             gas_limit: '10600',
//             counter: counter.toString(),
//             fee: fee.toString(),
//             source: keyStore.publicKeyHash,
//             kind: 'transaction'
//         };
//         // const operations = TezosNodeWriter.appendRevealOperation(server, keyStore, keyStore.publicKeyHash, counter - 1, [transaction]);
//         // return await TezosNodeWriter.sendOperation(server, operations, keyStore, derivationPath);
//         return await TezosNodeWriter.sendOperation(server, [transaction], keyStore, derivationPath);
// }

export default class ConseilJS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
            storage: ""
        }
    }

    componentDidMount() {
    }

    handleTx = async () => {
        const keystore = await TezosWalletUtil.unlockFundraiserIdentity(alphanetFaucetAccount.mnemonic.join(' '), alphanetFaucetAccount.email, alphanetFaucetAccount.password, alphanetFaucetAccount.pkh);

        const counter = await TezosNodeReader.getCounterForAccount(tezosNode, keystore.publicKeyHash);
        console.log("counter", counter);

        // const res = await TezosNodeWriter.sendAccountOriginationOperation(tezosNode, keystore, alphanetFaucetAccount.amount, undefined, true, false, 1);
        // console.log("res", res);

        const result = await TezosNodeWriter.sendTransactionOperation(tezosNode, keystore, 'tz1Peq6qz1tBMMv4JUR1EkaxQeLbKbQFfXhH', 1234, 1, '');
        // const result = await sendTransactionOperation(tezosNode, keystore, 'tz1Peq6qz1tBMMv4JUR1EkaxQeLbKbQFfXhH', 1, 1, '', 989898);
        console.log("result", result);
        this.setState({
            result: JSON.stringify(result, null, 4)
        })

        // await this.handleTx();
    };

    invoke = async () => {
        const keystore = await TezosWalletUtil.unlockFundraiserIdentity(alphanetFaucetAccount.mnemonic.join(' '), alphanetFaucetAccount.email, alphanetFaucetAccount.password, alphanetFaucetAccount.pkh);

        const counter = await TezosNodeReader.getCounterForAccount(tezosNode, keystore.publicKeyHash);
        console.log("counter", counter);

        const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,
            keystore,
            'KT1CdWUuiPAop9hsdBydYM4dAagZCdoEjmAg',
            0,
            1,
            '',
            1000,
            100000,
            '{"string": "Cryptonomicon"}',
            conseiljs.TezosParameterFormat.Micheline);

        console.log("result", result);

        this.setState({
            result: JSON.stringify(result, null, 4)
        })

        // await this.handleTx();
    };

    getStorage = async () => {
        const conseilServerInfo = {url: tezosNode, apiKey: ''};

        // const contractParameters = `parameter string; storage string;  code { DUP ;  DIP { CDR @v_slash_1 } ;  DIP { DROP } ;  CAR @choice_slash_2 ;  NIL operation ;  PAIR };`;
        // const entryPoints = await conseiljs.TezosContractIntrospector.generateEntryPointsFromParams(contractParameters);
        // const entryPoints = await conseiljs.TezosContractIntrospector.generateEntryPointsFromAddress(conseilServerInfo,"main","KT1E16WjiQQNbygDhcy9mXMrce7qvxj9K9rR");
        const entryPoints = await conseiljs.TezosContractIntrospector.generateEntryPointsFromCode(`
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

        `);


        entryPoints.forEach(p => {
            console.log(`${p.name}(${p.parameters.map(pp => (pp.name || 'unnamed') + '/' + pp.type).join(', ')})`);
        });

        console.log("entryPoints", entryPoints);
        console.log(entryPoints[0].generateParameter('test ok'));
    };

    render() {
        return <div>
            <span>++++++++ConseilJS++++++++++++++++</span>
            <p>
                <button onClick={this.handleTx}>
                    Send value
                </button>
            </p>
            <p>
                <button onClick={this.invoke}>
                    Invoke contact method
                </button>
            </p>
            <p>
                <button onClick={this.getStorage}>
                    GetStore
                </button>
            </p>
            <pre><code>
                {this.state.result}
            </code></pre>
            <pre><code>
                {this.state.storage}
            </code></pre>
        </div>
    }
}