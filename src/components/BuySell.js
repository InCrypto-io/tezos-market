import * as React from "react";

export default class BuySell extends React.Component {
    render() {
        console.log(this.props)
        return <div>
            <span>{this.props.element}</span>
            <button>{this.props.mode}</button>
        </div>
    }
};