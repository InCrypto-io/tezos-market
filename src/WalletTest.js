import * as React from "react";

require('tbapi/tbapi');
const tbapi = window.tbapi;


export default class WalletTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: "",
            text: "text for field in contract",
            number: 55
        }
    }

    componentDidMount() {

        tbapi.getAllAccounts().then(function (r) {
            console.log("getAllAccounts", r);
            if (r == false) {
                console.error(r.error);
            } else {
                console.log("Here are the accounts", r.data);
            }
        }).catch(console.error);
    }

    handleTx = async () => {
        const source = this.state.accounts[0].address;

        tbapi.initiateTransaction(
            source,
            "KT1MoVC2LEKCT4T7Q2Q9ZU6wZAigukf6icBH",
            5,
            10000).then(function (r) {
            console.log("rrrrrrr", r);
            if (r == false) {
                console.error(r.error);
            } else {
                console.log("Transaction was set!", r.data);
            }
        }).catch(console.error);
    };

    handleInvokeTxSetText = async () => {
        // const tezosNode = "http://alphanet-node.tzscan.io";
        // const source = {url: tezosNode, apiKey: ''};
        const source = this.state.accounts[0].address;

        tbapi.initiateTransaction(
            source,
            "KT1CmiFM7fCZNCJ7ideTxxPCxfiKvbMmAocc",
            0.00001,
            1000000,
            `set_value("${this.state.text}" string, "${this.state.number}" int)`,
            800000,
            60000
        ).then(function (r) {
            console.log("rrrrrrr", r);
            if (r == false) {
                console.error(r.error);
            } else {
                console.log("Transaction was set!", r.data);
            }
        }).catch(console.error);
    };

    handleInvokeTxSetTextAndNumber = async () => {
        // const tezosNode = "http://alphanet-node.tzscan.io";
        // const source = {url: tezosNode, apiKey: ''};
        const source = this.state.accounts[0].address;

        tbapi.initiateTransaction(
            source,
            "KT1CmiFM7fCZNCJ7ideTxxPCxfiKvbMmAocc",
            0.00001,
            1000000,
            `set_values("${this.state.text}" string)`,
            800000,
            60000
        ).then(function (r) {
            console.log("rrrrrrr", r);
            if (r == false) {
                console.error(r.error);
            } else {
                console.log("Transaction was set!", r.data);
            }
        }).catch(console.error);
    };

    checkAccess = async () => {
        tbapi.haveAccess().then(function (r) {
            if (r == false) {
                console.log("We don't have access");
            } else {
                console.log("We have access");
            }
        }).catch(console.error);
    };

    requestAccess = async () => {
        tbapi.requestAccess().then(function (r) {
            if (r == false) {
                console.log("Access rejected or blocked");
            } else {
                console.log("Access granted!");
            }
        }).catch(console.error);
    };

    getAllAccounts = async () => {
        const inst = this;
        await tbapi.getAllAccounts().then(function (r) {
            if (r == false) {
                console.error(r.error);
            } else {
                inst.setState({
                    accounts: r.data
                });
                console.log("Here are the accounts", r.data);
            }
        }).catch(console.error);
    };

    handleChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.text;
        let name = target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        return <div style={{background: "#030"}}>
            <span>++++++++tbapi++++++++++++++++</span>
            <p>
                <button onClick={this.requestAccess}>
                    requestAccess
                </button>
            </p>
            <p>
                <button onClick={this.checkAccess}>
                    checkAccess
                </button>
            </p>

            <p>
                <span>Accounts:</span>
                {this.state.accounts ? this.state.accounts.map((a) => (
                    <p key={a.address}><span>{a.address}</span></p>)) : "none"}
            </p>
            <p>

                <button onClick={this.getAllAccounts}>
                    getAllAccounts
                </button>
            </p>

            <p>

                <button onClick={this.handleTx}>
                    Send tx
                </button>
            </p>

            <p>
                <p>
                    <p>
                        <span>text to contract </span>
                        <input type="text" value={this.state.text} name={"text"} onChange={this.handleChange} />
                    </p>
                    <p>
                        <span>number to contract </span>
                        <input type="number" value={this.state.number} name={"number"} onChange={this.handleChange} />
                    </p>
                </p>

                <p>
                    <button onClick={this.handleInvokeTxSetText}>
                        Update only text tx
                    </button>
                </p>

                <p>
                    <button onClick={this.handleInvokeTxSetTextAndNumber}>
                        Update text and number tx
                    </button>
                </p>
            </p>

            <span>-------------------------------</span>
        </div>
    }
}