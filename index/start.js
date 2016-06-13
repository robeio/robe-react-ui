import React from "react";
import { render } from "react-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

const app = document.getElementById("app");

const navbarInstance = (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Robe React UI</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">ShowCase</NavItem>
            <NavItem eventKey={2} href="#">Components</NavItem>
            <NavItem eventKey={3} href="#">JsDocs</NavItem>
            <NavItem eventKey={4} href="#">About</NavItem>
        </Nav>
    </Navbar>
);

render(
    navbarInstance,
    app
);
