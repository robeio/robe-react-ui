import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Application} from "robe-react-commons";
import Renderer from "./Renderer";
import {Grid, Col, ListGroup, ListGroupItem, InputGroup} from "react-bootstrap";
import DocList from "./DocList";
import Progress from "progress/Progress";
import "./style.css";


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
                let href = item.header.split(' ').join('+');
                componentMenu.push(
                    <ListGroupItem
                        href={`#Docs/${href}`}
                        key={`#${href}`}
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
                <Col xs={12} sm={3} style={{paddingLeft: 0, marginTop: 25}}>
                    <ListGroup className="side-menu">
                        {componentMenu}
                    </ListGroup>
                </Col>
                <Col xs={12} sm={9} ref="componentView" style={{padding: 0, marginTop: 25}}>
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
