import React from "react";
import { Panel } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class Renderer extends ShallowComponent {

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        return this.__renderComponent(this.props);
    }

    __renderComponent= (element) => {
        let component = null;

        if (Array.isArray(element.component)) {
            component = this.__renderComponents(element.component);
        } else{
            component = element.component;
        }
        return (
            <Panel header={element.header}>
                {component}
            </Panel>
        );
    }
    __renderComponents = (components) => {
        let componentArray = [];
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            componentArray.push(this.__renderComponent(component));
        }
        return componentArray;
    }
}
