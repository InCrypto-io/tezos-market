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
            title: "Top rated",
            tokens: [
                {
                    owner: "sfdsd",
                    id: "0",
                },
                {
                    owner: "dcvs",
                    id: "1",
                },
                {
                    owner: "dvdf",
                    id: "2",
                },
                {
                    owner: "fff",
                    id: "3",
                },
                {
                    owner: "sfdsd",
                    id: "4",
                },
            ],
            assets: [
                {
                    owner: "sfdsd",
                    id: "8",
                },
                {
                    owner: "dcvs",
                    id: "10",
                },
            ]
        }
    }

    goToBuy(id) {
        this.setState({
            pageMode: "Buy",
            currentTokenId: id
        })
    }

    goToSell(id) {
        this.setState({
            pageMode: "Sell",
            currentTokenId: id
        })
    }

    selectGallery(id) {
        this.setState({
            pageMode: id,
        })
    }

    onSelect = (id) => {
        console.log(id)
        this.setState({
            pageMode: id % 2 === 0 ? "Buy" : "Sell",
            currentTokenId: id
        })
    };

    onChangeMode = (mode) => {
        this.setState({
            pageMode: mode,
            title: mode
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
                    <BuySell elementID={this.state.currentTokenId} mode={this.state.pageMode}/> :
                    <Gallery
                        tokens={this.state.pageMode === "My assets" ? this.state.assets : this.state.tokens}
                        title={this.state.title}
                        onSelect={this.onSelect}/>
            }

            <Footer></Footer>

        </div>
    }
};