import * as React from "react";

export default class BuySell extends React.Component {
    render() {
        return <div className={"element"}>
            <span>{this.props.mode}</span>
            <span>{this.props.element}</span>
        </div>
    }
};