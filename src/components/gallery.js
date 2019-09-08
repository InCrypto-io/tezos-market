import * as React from "react";
import Element from "./element";

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onSelect = (id, name) => {
        this.props.onSelect(id, name);
    };

    render() {
        const {tokens, title} = this.props;
        return <div className={"gallery"}>
            <span>{title}</span>
            <div className={"gal"}>
                {
                    tokens.map(el => {
                        return <Element element={el} onSelect={this.onSelect}/>
                    })
                }
            </div>
        </div>
    }
};