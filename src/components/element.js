import * as React from "react";

export default class Element extends React.Component {
    render() {
        return <div className={"element"}>
            <span>{this.props.element}</span>
            <span>sgdfhng</span>
        </div>
    }
};