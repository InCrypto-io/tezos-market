import * as React from "react";

export default class BuySell extends React.Component {
    render() {
        if(!this.props.elementID){
            return <span></span>;
        }
        return <div>
            <p>{this.props.mode}</p>
            <img width={100} height={100} src={require(`../images/${this.props.elementID}.png`)}></img>
            <button className={"get-started"}>{this.props.mode}</button>
        </div>
    }
};