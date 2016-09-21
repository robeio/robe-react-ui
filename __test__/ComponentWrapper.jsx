import React from "react";
import { render } from "react-dom";

import { ShallowComponent } from "robe-react-commons";

const elementId = "KarmaTestContainer";
let testContainer = document.getElementById(elementId);

if (testContainer) {
    testContainer = document.createElement("div");
    testContainer.setAttribute("id", elementId);
    document.body.appendChild(testContainer);
    testContainer = document.getElementById(elementId);
}

export default class ComponentWrapper extends ShallowComponent {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
    static wrapComponent(childrens) {
        return render(
            <ComponentWrapper>
                {childrens}
            </ComponentWrapper>,
            testContainer
        );
    }
}
