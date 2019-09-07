import * as React from "react";

export default class Element extends React.Component {
    render() {
        if(!this.props.element || !this.props.element.id){
            return <div/>;
        }
        return <div className={"element"} onClick={()=>(this.props.onSelect(this.props.element.id))}>
            <img width={100} height={100} src={require(`../images/${this.props.element.id}.png`)}></img>
            <p className={"element-description"}>{this.props.element.id}</p>
        </div>
    }
};