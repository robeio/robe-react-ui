
import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import HtmlEditor from "inputs/htmleditor/HtmlEditor";

describe("inputs/htmleditor/HtmlEditor", () => {
    const getComponent = (props: Object): Object => {
        return (
            <HtmlEditor
                label="HtmlEditor Label Text Example"
                value={props.value !== undefined ? props.value : "This is some example text must be equals with HtmlEditor value"}
                onChange={props.onChange !== undefined ? props.onChange : () => { }}
                validations={{
                    required: (value: any): Array => {
                        return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                    }
                }}
            />
        );
    };

    it("'props' Controls", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.props.label, "HtmlEditor Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with HtmlEditor value");
        chai.assert.equal(componentNode.props.onChange.name, "");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);
        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.equal(componentNode.isValid(), false);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1);
    });
});
