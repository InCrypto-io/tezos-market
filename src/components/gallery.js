import * as React from "react";
import Header from "./header";
import Element from "./element";

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: ["assets", "orders", "history"]
        }
    }

    onSelect = (id) => {
        this.props.onSelect(id);
    };

    render() {
        const {elements} = this.state;
        return <div className={"gallery"}>
            <span>Gal title</span>
            <div className={"header-links"}>
                {
                    elements.map(el => {
                        return <Element element={el} onSelect={this.onSelect}/>
                    })
                }
            </div>
        </div>
    }
};