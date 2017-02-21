import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Application} from "robe-react-commons";
import Renderer from "./Renderer";
import {Grid, Col, Collapse, ListGroup, ListGroupItem, InputGroup, Nav, NavItem} from "react-bootstrap";
import ComponentList from "./ComponentList";
import Progress from "progress/Progress";
import TextInput from "inputs/TextInput";
import FaIcon from "faicon/FaIcon";
import "./style.css";


export default class Components extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            componentSelection: window.location.hash.substring(1) === "Components" ? "Components/functional/Button" : window.location.hash.substring(1),
            filter: "",
            selectedGroup: window.location.hash.substring(1) === "Components" ? "functional" : window.location.hash.split("/")[1]
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
                <h2>{Application.i18n(Components, "components.Components", "title")}</h2>
                <h5>{Application.i18n(Components, "components.Components", "description")}</h5>

                <Col xs={12} sm={3} style={{paddingLeft: 0, marginTop: 10}}>
                    <TextInput
                        inputGroupRight={<InputGroup.Addon> <FaIcon code="fa-search" size="fa-sm"/> </InputGroup.Addon>}
                        onChange={this.__onFilterChange}
                        value={this.state.filter}
                        placeholder={Application.i18n(Components, "components.Components", "search")}
                    />
                    <ListGroup className="parent">
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "functional")}>
                            <FaIcon code="fa-cubes" fixed={true}/>&nbsp;&nbsp;
                            {Application.i18n(Components, "components.Components", "functional")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "functional"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "layout")}>
                            <FaIcon code="fa-sliders" fixed={true}/>&nbsp;&nbsp;
                            {Application.i18n(Components, "components.Components", "layout")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "layout"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "inputs")}>
                            <FaIcon code="fa-terminal" fixed={true}/>&nbsp;&nbsp;
                            {Application.i18n(Components, "components.Components", "inputs")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "inputs"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "charts")}>
                            <FaIcon code="fa-pie-chart" fixed={true}/>&nbsp;&nbsp;
                            {Application.i18n(Components, "components.Components", "charts")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "charts"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "extras")}>
                            <FaIcon code="fa-ambulance" fixed={true}/>&nbsp;&nbsp;
                            {Application.i18n(Components, "components.Components", "extras")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "extras"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                    </ListGroup>

                </Col>
                <Col xs={12} sm={9} style={{padding: 0, marginTop: 6}}>
                    {componentDetail}
                </Col>
            </Grid>
        );
    }

    __onGroupChange = (selectedKey: string) => {
        let selectedComponent;
        switch (selectedKey) {
            case "functional": {
                selectedComponent = "Button";
            }
                break;
            case "layout": {
                selectedComponent = "DragDropLayout";
            }
                break;
            case "inputs": {
                selectedComponent = "CheckInput";
            }
                break;
            case "charts": {
                selectedComponent = "AreaChart";
            }
                break;
            case "extras": {
                selectedComponent = "Countdown";
            }
                break;
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
