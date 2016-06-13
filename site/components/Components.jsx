import React from "react";
import BaseInput from "inputs/BaseInput";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";

const components = [
    {
        header: "Text Input ",
        component: [
            {
                header: "Text Input ",
                component: <BaseInput type="text" />
            },
            {
                header: "Default Value",
                component: <BaseInput type="text" value="Default Value" />
            }
        ]
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
