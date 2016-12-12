import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import { Grid, Col, ListGroup, ListGroupItem, InputGroup } from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import DocList from "./DocList";
import Progress from "progress/Progress";
import TextInput from "inputs/TextInput";
import FaIcon from "faicon/FaIcon";



export default class Docs extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            componentSelection: window.location.hash.substring(1) === "Docs" ? "Docs/Validation" : window.location.hash.substring(1),
            filter: ""
        };
    }

    render(): Object {
        let componentDetail;
        let componentMenu = [];
        let components = DocList.getList(this.state, this.__handleChange);

        for (let i = 0; i < components.length; i++) {
            let item = components[i];
            let active = this.state.componentSelection === `Docs/${item.header}`;
            if (item.header.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) {
                componentMenu.push(
                    <ListGroupItem
                        href={`#Docs/${item.header}`}
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
                <Col xs={12} sm={3} style={{ borderRight: "lightgray 1px solid" }} >
                    <TextInput
                        inputGroupRight={<InputGroup.Addon> <FaIcon code="fa-search" size="fa-sm" /> </InputGroup.Addon>}
                        onChange={this.__onFilterChange}
                        value={this.state.filter}
                        placeholder="Search"
                        />
                    <ListGroup>{componentMenu}</ListGroup>
                </Col>
                <Col xs={12} sm={9} ref="componentView">
                    {componentDetail}
                </Col>
            </Grid>
        );
    }

    __onFilterChange = (e: Object) => {
        this.setState({
            filter: e.target.value
        });
    };

    __onComponenListClick = (e: Object) => {
        this.setState({
            componentSelection: `Docs/${e.target.text}`
        });
        Progress.start();
    };
}
