import React from "react";
import chai from "chai";
import TestUtils from "../TestUtils";
import FileUploadInput from "inputs/upload/FileUploadInput";
import { Maps } from "robe-react-commons";
const defaultProps = {
    name: "files",
    display: "thumbnail",
    label: "Dosya Seçimi",
    remote: {
        url: TestUtils.createUrl("files"),
        upload: {
            type: "PUT"
        },
        info: {
            type: "POST"
        },
        delete: {
            type: "DELETE"
        }
    },
    onChange: () => {
        return true;
    }
};

describe("inputs/upload/FileUploadInput", () => {
    it("props", () => {
        let componentNode = TestUtils.renderClassIntoDocument({}, FileUploadInput, defaultProps);
        chai.assert.equal(componentNode.props.name, "files");
        chai.assert.equal(componentNode.props.display, "thumbnail");
        chai.assert.deepEqual(componentNode.props.value, []);
        chai.assert.equal(componentNode.props.autoUpload, true);
        chai.assert.equal(componentNode.props.multiple, true);
        chai.assert.deepEqual(componentNode.props.remote, defaultProps.remote);
        let onChangeFunction = (e) => {
            console.log(e.target.value);
        }
        let remoteProps = Maps.mergeDeep(defaultProps.remote, {
            info: {
                type: "GET"
            }
        });

        componentNode = TestUtils.renderClassIntoDocument({
            multiple: false,
            onChange: onChangeFunction,
            display: "list",
            remote: remoteProps,
            autoUpload: false,
            value: ["info_test.png"]
        }, FileUploadInput, defaultProps);

        chai.assert.equal(componentNode.props.display, "list");
        chai.assert.deepEqual(componentNode.props.value, ["info_test.png"]);
        chai.assert.equal(componentNode.props.autoUpload, false);
        chai.assert.equal(componentNode.props.multiple, false);
        chai.assert.deepEqual(componentNode.props.remote, remoteProps);
    });
    it("render", () => {

    })
});
