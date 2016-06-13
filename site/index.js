import React from "react";
import { render } from "react-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Components } from "./components";
import { NotFound } from "./error";

import { ShallowComponent } from "robe-react-commons";

const app = document.getElementById("app");


class Site extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            activePage: (
                <Components />
            )
        };
    }

    render() {
        return (
            <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Robe React UI</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav onSelect={this.__onSelect}>
                    <NavItem eventKey={1} href="#">Components</NavItem>
                    <NavItem eventKey={2} href="#">JsDocs</NavItem>
                    <NavItem eventKey={3} href="#">About</NavItem>
                </Nav>
            </Navbar>
                {this.state.activePage}
            </div>
        );
    }
    __onSelect = (selectedKey) => {
        console.log(selectedKey)
        switch (selectedKey) {
            case 1 :
                this.setState({
                    activePage: (
                        <Components />
                    )
                });
                break;
            case 2 :
                this.setState({
                    activePage: (
                        <NotFound />
                    )
                });
                break;
            case 3 :
                this.setState({
                    activePage: (
                        <NotFound />
                    )
                });
                break;
            default :
                throw new Error("Unknown Page");
        }
    }
}

render(
    <Site />,
    app
);
