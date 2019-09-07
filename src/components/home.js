import * as React from "react";
import Header from "./header";

export default class Home extends React.Component {

    render() {
        return <div className={"page-body"}>
            <Header></Header>
            <span>Description</span>

            <button>
                Get started
            </button>
        </div>
    }
};