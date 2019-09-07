import * as React from "react";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: ["assets", "orders", "history"],
        }
    }

    setCurrent = (what) => {
        this.props.onChangeMode(what);
    };

    render() {
        const {pages} = this.state;
        const {pageMode} = this.props;
        return <div className={"header"}>
            <img src={require("../logo.png")} width={285} height={100} alt=""/>
            <div className={"header-links"}>
                {
                    pages.map(page => {
                        return <div className={page === pageMode ? "active" : ""}>
                            <span className={"header-link"} onClick={() => {
                            this.setCurrent(page)
                        }}>{page}</span></div>
                    })
                }
            </div>
        </div>
    }
};