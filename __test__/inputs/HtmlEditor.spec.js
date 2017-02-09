import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "../TestUtils";
import HtmlEditor from "inputs/htmleditor/HtmlEditor";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("inputs/htmleditor/HtmlEditor", () => {
    const getComponent = (props: Object): Object => {
        return (
            <HtmlEditor // eslint-disable-line react/jsx-filename-extension
                label="HtmlEditor Label Text Example"
                value={props.value !== undefined ? props.value : "This is some example text must be equals with HtmlEditor value"}
                onChange={props.onChange}
                validations={{
                    htmlRequired: true
                }}
            />
        );
    };

    it("'props' Controls", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.props.label, "HtmlEditor Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with HtmlEditor value");
        chai.assert.isDefined(componentNode.props.validations.htmlRequired, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({
            onChange: () => {
            }
        }));
        chai.assert.equal(componentNode.isValid(), true);
        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.equal(componentNode.isValid(), false);
    });
});
