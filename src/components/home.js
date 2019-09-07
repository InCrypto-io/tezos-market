import * as React from "react";
import Header from "./header";
import Gallery from "./gallery";
import BuySell from "./BuySell";

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
            pageMode: "Buy",
            currentTokenId: id
        })
    };

    onChangeMode = (mode) => {
        this.setState({
            pageMode: mode,
        })
    };

    getTokensForCurrentMode = () => {
        return this.state.tokens;
    };

    render() {
        return <div className={"page-body"}>
            <Header pageMode={this.state.pageMode} onChangeMode={(id)=>this.onChangeMode(id)}/>
            {
                (this.state.pageMode !== "Buy" && this.state.pageMode !== "Sell") ?
                    <div className={"get-started-block"}>
                        <p>Super mega coin swap</p>
                        <p>We are the best blablabla lorem ipsum bla</p>
                        <p>Bla ipsum Lorem bla</p>

                        <button className={"get-started"}>
                            Get started
                        </button>
                    </div> : <div/>
            }

            {
                this.state.pageMode === "Buy" ? <BuySell elementID={this.state.currentTokenId} mode={this.state.pageMode}/> :
                    <Gallery
                        // tokens={()=>(this.getTokensForCurrentMode())}
                        tokens={this.state.tokens}
                        title={this.state.title}
                        onSelect={this.onSelect}/>
            }

        </div>
    }
};