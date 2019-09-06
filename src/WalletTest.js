import * as React from "react";

require('tbapi/tbapi');
const tbapi = window.tbapi;


export default class WalletTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: "",
            value: "text for field in contract"
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

    handleInvokeTx = async () => {
        // const tezosNode = "http://alphanet-node.tzscan.io";
        // const source = {url: tezosNode, apiKey: ''};
        const source = this.state.accounts[0].address;

        tbapi.initiateTransaction(
            source,
            "KT1EiSyVzA56AvSVmA47941uFixjE94ZRsvy",
            0.00001,
            1000000,
            `("${this.state.value}" string)`,
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
        this.setState({value: event.target.value});
    };


    render() {
        return <div>
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
                <input type="text" value={this.state.value} onChange={this.handleChange} />

                <button onClick={this.handleInvokeTx}>
                    Invoke tx
                </button>
            </p>

            <span>-------------------------------</span>
        </div>
    }
}