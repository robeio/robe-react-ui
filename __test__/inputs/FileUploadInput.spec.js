import React from "react";
import chai from "chai";
import TestUtils from "../TestUtils";
import FileUploadInput from "inputs/upload/FileUploadInput";
import { Maps } from "robe-react-commons";

const filesUrl = TestUtils.createUrl("files");

let remoteProps = {
    url: filesUrl,
    upload: {
        type: "PUT"
    },
    info: {
        type: "POST"
    },
    delete: {
        type: "DELETE"
    }
};

const defaultProps = {
    name: "files",
    display: "thumbnail",
    label: "Dosya Seçimi",
    remote: remoteProps,
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
    it("render", (done) => {

        /**
         *
         * @type {Array}

        let testArray = [];

        let index = ;

        let defaultProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            remote: remoteProps,
            onError: (e) => {
                done();
                chai.assert.isOk(false, "Hate : " + error);
            }
         };

        testArray.push((index) => {
            let wrapper = null;
            let wrapper = TestUtils.mount({

                onChange: (e) => {
                    testArray[1](1);
                }
            }, FileUploadInput, defaultProps);

        });

        testArray.push((index) => {
            let wrapper = null;
            let wrapper = TestUtils.mount({
                onChange: (e) => {
                    testArray[1](1);
                }
            }, FileUploadInput, defaultProps);
        });

        testArray.push((index) => {
            let wrapper = null;
            let wrapper = TestUtils.mount({
                onChange: (e) => {
                    done();
                }
            }, FileUploadInput, defaultProps);
        });

        testArray[0](0);
         */
        done();
    })
});
