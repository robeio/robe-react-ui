import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import TestUtils from "../TestUtils";
import Wizard from "wizard/Wizard";
import Step from "wizard/Step";
import WizardTest from "./WizardTest"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved


describe("wizard/Wizard", () => {
    const assert = chai.assert;
    let props;

    it("render - empty", () => {
        let wizard = TestUtils.mount(props, Wizard);
        assert.equal(wizard.find(".wizard").length, 0);
        wizard.unmount();
    });

    it("render", () => {
        let wizardTest = TestUtils.mount(props, WizardTest);
        assert.equal(wizardTest.find(Step).length, 3);
        assert.equal(wizardTest.find(".step-active").length, 1);
        assert.equal(wizardTest.find(".step-passive").length, 2);

        let labels = wizardTest.find(".label");
        assert.equal(labels.nodes[0].innerText, "");
        assert.equal(labels.nodes[1].innerText, "Two");
        assert.equal(labels.nodes[2].innerText, "Three");

        wizardTest.unmount();
    });

    it("__onChange", () => {
        let wizardTest = TestUtils.mount(props, WizardTest);
        wizardTest.find(".step").last().simulate("click");
        assert.equal(wizardTest.find(".step-active").length, 2);
        assert.equal(wizardTest.find(".step-passive").length, 1);

        wizardTest.find(".step").last().simulate("click");
        assert.equal(wizardTest.find(".step-active").length, 3);
        assert.equal(wizardTest.find(".step-passive").length, 0);

        wizardTest.unmount();
    });

    it("__handleNextButtonClick - __handlePreviousButtonClick", () => {
        let wizardTest = TestUtils.mount(props, WizardTest);
        wizardTest.find("#next").simulate("click");
        assert.equal(wizardTest.find(".step-active").length, 2);
        assert.equal(wizardTest.find(".step-passive").length, 1);

        wizardTest.find("#previous").simulate("click");
        assert.equal(wizardTest.find(".step-active").length, 1);
        assert.equal(wizardTest.find(".step-passive").length, 2);

        wizardTest.unmount();
    });

    it("__onComplete", () => {
        let wizardTest = TestUtils.mount(props, WizardTest);
        wizardTest.find("#next").simulate("click");
        wizardTest.find("#next").simulate("click");
        wizardTest.find("#complete").simulate("click");
        assert.equal(wizardTest.find(".step-active").length, 3);
        wizardTest.unmount();
    });

});
