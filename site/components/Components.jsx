import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import BaseInput from "inputs/BaseInput";
import CheckInput from  "inputs/CheckInput";

const components = [
    {
        header: "Base Input ",
        component: <BaseInput type="text" />
    },{
       header: "Check Input ",
       component: <CheckInput label="Check Input"/>
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
