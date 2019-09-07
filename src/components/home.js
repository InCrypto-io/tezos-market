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
            pageMode: "buy",
            currentTokenId: id
        })
    }

    goToSell(id) {
        this.setState({
            pageMode: "sell",
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
            pageMode: "buy",
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
            <span>{this.state.pageMode}</span>

            <button>
                Get started
            </button>

            {
                this.state.pageMode === "buy" ? <BuySell elementID={this.state.currentTokenId} mode={this.state.pageMode}/> :
                    <Gallery
                        // tokens={()=>(this.getTokensForCurrentMode())}
                        tokens={this.state.tokens}
                        onSelect={this.onSelect}/>
            }

        </div>
    }
};