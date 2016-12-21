import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import { Grid, Col, ListGroup, ListGroupItem, InputGroup, Nav, NavItem } from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import ComponentList from "./ComponentList";
import Progress from "progress/Progress";
import TextInput from "inputs/TextInput";
import FaIcon from "faicon/FaIcon";


export default class Components extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            componentSelection: window.location.hash.substring(1) === "Components" ? "Components/complex/DataGrid" : window.location.hash.substring(1),
            filter: "",
            selectedGroup: "complex"
        };
    }

    render(): Object {
        let componentDetail;
        let componentMenu = [];
        let selectedGroup = window.location.hash.split("/")[1] || this.state.selectedGroup;
        let components = ComponentList.getList(this.state, this.__handleChange)[selectedGroup];

        for (let i = 0; i < components.length; i++) {
            let item = components[i];
            let active = this.state.componentSelection === `Components/${selectedGroup}/${item.header}`;
            if (item.header.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) {
                componentMenu.push(
                    <ListGroupItem
                        href={`#Components/${selectedGroup}/${item.header}`}
                        key={`#${item.header}`}
                        onClick={this.__onComponenListClick}
                        active={active}
                        >
                        {item.header}
                    </ListGroupItem>);
                if (active) {
                    componentDetail = (
                        <Renderer
                            header={item.header}
                            desc={item.desc}
                            alternatives={item.alternatives}
                            json={item.json}
                            sample={item.sample}
                            code={item.code}
                            />);
                }
            }
        }
        return (
            <Grid>
                <NotificationContainer />
                <h2>Components</h2>
                <h5>Here you can find the samples and usages of the components.</h5>
                <Col xs={12} sm={3} style={{ borderRight: "lightgray 1px solid", paddingLeft: 0 }}>
                    <TextInput
                        inputGroupRight={<InputGroup.Addon> <FaIcon code="fa-search" size="fa-sm" /> </InputGroup.Addon>}
                        onChange={this.__onFilterChange}
                        value={this.state.filter}
                        placeholder="Search"
                        />
                    <Nav bsStyle="tabs" justified activeKey={selectedGroup} onSelect={this.__onGroupChange}>
                        <NavItem eventKey="complex" ><FaIcon code="fa-cubes" fixed={false} /> Complex</NavItem>
                        <NavItem eventKey="inputs" ><FaIcon code="fa-terminal" fixed={false} /> Inputs</NavItem>
                        <NavItem eventKey="charts" ><FaIcon code="fa-line-chart" fixed={false} /> Charts</NavItem>
                    </Nav>
                    <ListGroup>{componentMenu}</ListGroup>
                </Col>
                <Col xs={12} sm={9}>
                    {componentDetail}
                </Col>
            </Grid>
        );
    }

    __onGroupChange = (selectedKey: string) => {
        let selectedComponent;
        switch (selectedKey) {
            case "complex": {
                selectedComponent = "DataGrid";
            } break;
            case "inputs": {
                selectedComponent = "TextInput";
            } break;
            case "charts": {
                selectedComponent = "AreaChart";
            } break;
            default:
        }
        window.location.hash = `Components/${selectedKey}/${selectedComponent}`;
        this.setState({
            selectedGroup: selectedKey,
            componentSelection: `Components/${selectedKey}/${selectedComponent}`
        });
    };

    __onFilterChange = (e: Object) => {
        this.setState({
            filter: e.target.value
        });
    };

    __onComponenListClick = (e: Object) => {
        this.setState({
            componentSelection: `Components/${this.state.selectedGroup}/${e.target.text}`
        });
        Progress.start();
    };

}
