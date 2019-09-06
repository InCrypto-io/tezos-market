import * as React from "react";

export default class WalletTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: "",
            text: "text",
            number: 55
        }
    }

    componentDidMount() {

        window.tbapi.getAllAccounts().then(function (r) {
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

        window.tbapi.initiateTransaction(
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

        window.tbapi.initiateTransaction(
            source,
            "KT1AT6oyJBjEVFZ3A8oYMD1WYGeekKgHn8wi",
            0.00001,
            1000000,
            `(Left "${this.state.text}")`,
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

        window.tbapi.initiateTransaction(
            source,
            "KT1AT6oyJBjEVFZ3A8oYMD1WYGeekKgHn8wi",
            0.00001,
            1000000,
            `(Right (Left (Pair "${this.state.text}" ${this.state.number})))`,
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

    handleInvokeTxMultpSetTextAndNumber = async () => {
        // const tezosNode = "http://alphanet-node.tzscan.io";
        // const source = {url: tezosNode, apiKey: ''};
        const source = this.state.accounts[0].address;

        window.tbapi.initiateTransaction(
            source,
            "KT1AT6oyJBjEVFZ3A8oYMD1WYGeekKgHn8wi",
            0.00001,
            1000000,
            `(Right (Right (Pair "${this.state.text}" ${this.state.number})))`,
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
        window.tbapi.haveAccess().then(function (r) {
            if (r == false) {
                console.log("We don't have access");
            } else {
                console.log("We have access");
            }
        }).catch(console.error);
    };

    requestAccess = async () => {
        window.tbapi.requestAccess().then(function (r) {
            if (r == false) {
                console.log("Access rejected or blocked");
            } else {
                console.log("Access granted!");
            }
        }).catch(console.error);
    };

    getAllAccounts = async () => {
        const inst = this;
        await window.tbapi.getAllAccounts().then(function (r) {
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
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        return <div style={{background: "#030"}}>
            <span>++++++++window.tbapi++++++++++++++++</span>
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

                <p>
                    <button onClick={this.handleInvokeTxMultpSetTextAndNumber}>
                        Update text and 2 * number tx
                    </button>
                </p>
            </p>

            <span>-------------------------------</span>
        </div>
    }
}