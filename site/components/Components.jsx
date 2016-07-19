import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import ReactDOM  from "react-dom";
import { Grid, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import NotificationManager from "react-notifications/lib/NotificationManager";
import ComponentList from "./ComponentList";



export default class Showcase extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            componentSelection: window.location.hash.substring(1)
        };
    }

    render(): Object {
        let componentArray = [];
        let componentMenu = [];
        let components = ComponentList.getComponentList(this.state, this.__handleChange);

        for (let i = 0; i < components.length; i++) {
            let item = components[i];
            componentMenu.push(
                <ListGroupItem
                    href={`#${item.header}`}
                    key={`#${item.header}`}
                    onClick={this.__onComponenListClick}
                    active={this.state.componentSelection === item.header}
                    >
                    {item.header}
                </ListGroupItem>);
            componentArray.push(
                <Renderer
                    header={item.header}
                    desc={item.desc}
                    alternatives={item.alternatives}
                    json={item.json}
                    sample={item.sample}
                    code={item.code}
                    />);
        }
        return (
            <Grid>
                <NotificationContainer />
                <h2>Components</h2>
                <h5>Here you can find the samples and usages of the components.</h5>
                <Col xs={12} sm={3} style={{ borderRight: "lightgray 1px solid" }} > <ListGroup>{componentMenu}</ListGroup></Col>
                <Col xs={12} sm={9} style={{ height: "80vh", overflow: "scroll" }} ref="componentView">
                    {componentArray}
                </Col>
            </Grid>
        );
    }

    __onComponenListClick = (e: Object) => {
        this.setState({
            componentSelection: e.target.text
        });
    };


    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0;
    }
}
