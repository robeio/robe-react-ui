import React from "react";
import { render } from "react-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Components } from "./components";
import Welcome from "./Welcome";
import { NotFound } from "./error";
import "./style.css";
import Progress from "progress/Progress";


import { ShallowComponent } from "robe-react-commons";

const app = document.getElementById("app");


class Site extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        let path = window.location.hash.substring(1).split("/")[0];
        this.state = {
            activeKey: path
        };
    }

    render(): Object {
        let activePage = this.__getActivePage(this.state.activeKey);
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <img src="./avatar.png" alt="logo" />
                        <Navbar.Brand>
                            <a href="#" onClick={this.__onSelect} >Robe React UI</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav activeKey={this.state.activeKey} onSelect={this.__onSelect}>
                        <NavItem eventKey="Components" >Components</NavItem>
                        <NavItem eventKey="JsDocs" >JsDocs</NavItem>
                        <NavItem eventKey="About" >About</NavItem>
                    </Nav>
                </Navbar>
                {activePage}
            </div>
        );
    }

    __onSelect = (key) => {
        Progress.start();
        window.location.hash = `#${key}`;
        this.setState({
            activeKey: key
        });
    };
    __getActivePage = (path: string) => {
        switch (path) {
            case "Components":
                return (
                    <Components />
                );
            case "JsDocs":
                return (
                    <NotFound />
                );
            case "About":
                return (
                    <NotFound />
                );
            default:
                return (
                    <Welcome />
                );
        }
    }
    componentDidUpdate() {
        Progress.done();
    }
}

render(
    <Site />,
    app
);
