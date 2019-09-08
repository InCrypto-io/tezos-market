import * as React from "react";
import Header from "./header";
import Gallery from "./gallery";
import BuySell from "./BuySell";
import Footer from "./footer";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "sfdsd",
            pageMode: "my_assets",
            currentTokenId: "0",
            currentElName: "0asdsad",
            title: "Top rated",
            tokens: [
                {
                    owner: "sfdsd",
                    id: "0",
                    name: "asas"
                },
                {
                    owner: "dcvs",
                    id: "1",
                    name: "sdfsdf"
                },
            ],
            assets: [
                {
                    owner: "sfdsd",
                    id: "0",
                    name: "sdfdsf"
                },
                {
                    owner: "dcvs",
                    id: "1",
                    name: "sdfdsf"
                },
                {
                    owner: "dcvs",
                    id: "2",
                    name: "sdfdsf"
                },
            ]
        }
    }

    goToBuy(id, name) {
        this.setState({
            pageMode: "Buy",
            currentTokenId: id,
            currentElName: name,
        })
    }

    goToSell(id, name) {
        this.setState({
            pageMode: "Sell",
            currentTokenId: id,
            currentElName: name,
        })
    }

    selectGallery(id) {
        this.setState({
            pageMode: id,
        })
    }

    onSelect = (id, name) => {
        console.log(id)
        this.setState({
            pageMode: id % 2 === 0 ? "Buy" : "Sell",
            currentTokenId: id,
            currentElName: name,
        })
    };

    onChangeMode = (mode) => {
        this.setState({
            pageMode: mode,
            title: mode
        })
    };

    goToHome = () => {
        this.setState({
            pageMode: "my_assets",
            title: ""
        })
    };

    render() {
        return <div className={"page-body"}>
            <Header pageMode={this.state.pageMode} onChangeMode={(id)=>this.onChangeMode(id)}/>
            {
                (this.state.pageMode !== "Buy" && this.state.pageMode !== "Sell") ?
                    <div className={"get-started-block"}>
                        <p>Swap</p>
                        <p>any digital asset</p>
                        <p>in trustless way</p>

                        <button className={"get-started"}>
                            Get started
                        </button>
                    </div> : <div/>
            }

            {
                (this.state.pageMode === "Buy" || this.state.pageMode === "Sell") ?
                    <BuySell elementID={this.state.currentTokenId} mode={this.state.pageMode}
                             name={this.state.currentElName}
                             goToHome={this.goToHome}/> :
                    <Gallery
                        tokens={this.state.pageMode === "My assets" ? this.state.assets : this.state.tokens}
                        title={this.state.title}
                        onSelect={this.onSelect}/>
            }

            <Footer></Footer>

        </div>
    }
};