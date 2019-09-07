import * as React from "react";
import Header from "./header";
import Gallery from "./gallery";

export default class Home extends React.Component {
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