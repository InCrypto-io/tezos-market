import * as React from "react";

export default class BuySell extends React.Component {
    render() {
        if(!this.props.elementID){
            return <span></span>;
        }
        return <div>
            <img width={50} height={50} src={require(`../images/${this.props.elementID}.png`)}></img>
            <span>{this.props.elementID}</span>
            <button>{this.props.mode}</button>
        </div>
    }
};