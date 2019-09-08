import * as React from "react";

export default class Footer extends React.Component {

    render() {
        return <div className={"footer"}>
            <img src={require("../footer.jpeg")} alt=""/>
        </div>
    }
};