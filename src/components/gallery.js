import * as React from "react";
import Element from "./element";

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onSelect = (id) => {
        this.props.onSelect(id);
    };

    render() {
        const {tokens} = this.props;
        return <div className={"gallery"}>
            <span>Gal title</span>
            <div className={"header-links"}>
                {
                    tokens.map(el => {
                        return <Element element={el} onSelect={this.onSelect}/>
                    })
                }
            </div>
        </div>
    }
};