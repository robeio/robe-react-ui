import React from "react";
import BaseInput from "inputs/BaseInput";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";

const components = [
    {
        header: "Text Input ",
        component: <BaseInput type="text" />
    }
];

export default class Showcase extends ShallowComponent {

    render() {
        let componentArray = [];
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            componentArray.push(<Renderer
                header={component.header}
                component={component.component}
            />);
        }
        return (
            <div>
                {componentArray}
            </div>
        );
    }
}
