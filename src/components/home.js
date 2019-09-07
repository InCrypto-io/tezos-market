import * as React from "react";
import Header from "./header";
import Gallery from "./gallery";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageMode: "my_assets",
            currentTokenId: "0"
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

    render() {
        return <div className={"page-body"}>
            <Header></Header>
            <span>Description</span>

            <button>
                Get started
            </button>

            <Gallery></Gallery>

        </div>
    }
};