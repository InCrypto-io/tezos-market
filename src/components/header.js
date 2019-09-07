import * as React from "react";

export default class Header extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            current: "assets",
            pages: ["assets", "orders", "history"],
        }
    }

    setCurrent = (what) => {
        this.setState({
            current: what
        })
    };

    render() {
        const {pages, current} = this.state;
        return <div className={"header"}>
            <img src="../logo.svg" alt=""/>
            <span>title</span>
            <div className={"header-links"}>
            {
                pages.map(page => {
                    return <div className={page === current ? "active" : ""}><span onClick={()=>{this.setCurrent(page)}}>{page}</span></div>
                })
            }
        </div>
        </div>
    }
};