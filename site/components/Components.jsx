import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Application} from "robe-react-commons";
import Renderer from "./Renderer";
import {Grid, Col, Collapse, ListGroup, ListGroupItem, InputGroup, Nav, NavItem} from "react-bootstrap";
import ComponentList from "./ComponentList";
import Progress from "progress/Progress";
import TextInput from "inputs/TextInput";
import FaIcon from "faicon/FaIcon";
import "./style.css"


export default class Components extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            componentSelection: window.location.hash.substring(1) === "Components" ? "Components/complex/DataGrid" : window.location.hash.substring(1),
            filter: "",
            selectedGroup: window.location.hash.substring(1) === "Components" ? "complex" : window.location.hash.split("/")[1]
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
                <Col xs={12} sm={3} style={{ borderRight: "lightgray 1px solid", paddingLeft: 0 }}>
                    <TextInput
                        inputGroupRight={<InputGroup.Addon> <FaIcon code="fa-search" size="fa-sm" /> </InputGroup.Addon>}
                        onChange={this.__onFilterChange}
                        value={this.state.filter}
                        placeholder={Application.i18n(Components, "components.Components", "search")}
                    />
                    <ListGroup className="parent">
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "complex")}>
                            <FaIcon code="fa-cubes" fixed={false}/>&nbsp;
                            {Application.i18n(Components, "components.Components", "complex")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "complex"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "inputs")}>
                            <FaIcon code="fa-terminal" fixed={false}/>&nbsp;
                            {Application.i18n(Components, "components.Components", "inputs")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "inputs"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                        <ListGroupItem onClick={this.__onGroupChange.bind(undefined, "charts")}>
                            <FaIcon code="fa-line-chart" fixed={false}/>&nbsp;
                            {Application.i18n(Components, "components.Components", "charts")}
                        </ListGroupItem>
                        <Collapse in={selectedGroup === "charts"}>
                            <div>
                                {componentMenu}
                            </div>
                        </Collapse>
                    </ListGroup>

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
            }
                break;
            case "inputs": {
                selectedComponent = "TextInput";
            }
                break;
            case "charts": {
                selectedComponent = "AreaChart";
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
