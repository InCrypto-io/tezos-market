import * as React from "react";

export default class Footer extends React.Component {

    render() {
        return <div className={"footer"}>
            <img src={require("../footer.jpeg")} alt=""/>
            <a className={"link"} href="blaize.tech">blaize.tech</a>
        </div>
    }
};