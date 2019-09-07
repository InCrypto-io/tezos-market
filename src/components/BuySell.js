import * as React from "react";

export default class BuySell extends React.Component {
    render() {
        if(!this.props.elementID){
            return <span></span>;
        }
        return <div className={"buy-sell"}>
            <p>{this.props.mode}</p>
            <img width={100} height={100} src={require(`../images/${this.props.elementID}.png`)}></img>
            {this.props.mode === "Buy" ? <span>50 TZ</span>  : <input value={50}/>}
            <button className={"get-started"}>{this.props.mode}</button>
        </div>
    }
};