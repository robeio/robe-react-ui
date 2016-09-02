import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import Wizard from "wizard/Wizard";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import TestUtils from "../TestUtils";

describe("wizard/Wizard", () => {
    const props = {
        steps: [
            {
                title: "Step 1",
                component: <span>Content1</span>// eslint-disable-line react/jsx-filename-extension
            },
            {
                title: "Step 2",
                component: <span>Content2</span>// eslint-disable-line react/jsx-filename-extension
            }
        ]
    };
    const wizard = TestUtils.mount(props, Wizard, props);

    it("stepButtons - render", () => {
        let stepButtons = wizard.find(".wizard-step");
        chai.assert.equal(stepButtons.length, props.steps.length, "Step Button count must be same with the step count");
        for (let i = 0; i < stepButtons.length; i++) {
            let button = stepButtons.at(i);
            let buttonText = button.find("a");
            chai.assert.equal(buttonText.node.innerText, (`${i + 1}`), "Step button text must be equal to step index + 1");
            let buttonLabel = button.find("p");
            chai.assert.equal(buttonLabel.node.innerText, props.steps[i].title, "Step button label must be equal to step title");
        }
    });

    it("stepButtons - click", () => {
        let stepButtons = wizard.find(".wizard-step");
        let button = stepButtons.at(1).find("a").at(0);
        chai.assert.equal(wizard.find("span").node.innerText, "Content1", "Step 1 'click' must render Content1");

        button.simulate("click");
        chai.assert.equal(wizard.find("span").node.innerText, "Content2", "Step 2 'click' must render Content2");

        // Click again
        button.simulate("click");
        chai.assert.equal(wizard.find("span").node.innerText, "Content2", "Step 2 'click' must render Content2");
    });

    it("previous & next - click", () => {
        let preButton = wizard.find(".previous").find("a").at(0);
        preButton.simulate("click");
        chai.assert.equal(wizard.find("span").node.innerText, "Content1", "Previous Button Click must render Content1");
        let nextButton = wizard.find(".next").find("a").at(0);
        nextButton.simulate("click");
        chai.assert.equal(wizard.find("span").node.innerText, "Content2", "Next Button Click must render Content2");
    });
});
