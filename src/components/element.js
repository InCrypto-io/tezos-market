import * as React from "react";

export default class Element extends React.Component {
    render() {
        return <div className={"element"} onClick={()=>(this.props.onSelect(this.props.element))}>
            <span>{this.props.element}</span>
            <span>sgdfhng</span>
        </div>
    }
};