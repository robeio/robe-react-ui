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
    it("props", (done) => {
        let expectedFilename = "info_test.png";
        let componentNode = TestUtils.renderClassIntoDocument({}, FileUploadInput, defaultProps);
        chai.assert.equal(componentNode.props.name, "files");
        chai.assert.equal(componentNode.props.display, "thumbnail");
        chai.assert.deepEqual(componentNode.props.value, undefined);
        chai.assert.equal(componentNode.props.autoUpload, true);
        chai.assert.equal(componentNode.props.multiple, true);
        chai.assert.deepEqual(componentNode.props.remote, defaultProps.remote);

        let remoteProps = Maps.mergeDeep(defaultProps.remote, {
            info: {
                type: "GET"
            }
        });

        componentNode = TestUtils.renderClassIntoDocument({
            multiple: false,
            onError: (e) => {
                chai.assert.isOk(false, "Single File Load Error ! ", e);
                done();
            },
            onChange: (e) => {
                chai.assert.equal(e.target.value, expectedFilename, " FileInput is single ( not multiple ) ! Value must be a string filename value ! ");
            },
            display: "list",
            remote: remoteProps,
            autoUpload: false,
            value: "info_test.png"
        }, FileUploadInput, defaultProps);

        chai.assert.equal(componentNode.props.display, "list");
        chai.assert.deepEqual(componentNode.props.value, "info_test.png");
        chai.assert.equal(componentNode.props.autoUpload, false);
        chai.assert.equal(componentNode.props.multiple, false);
        chai.assert.deepEqual(componentNode.props.remote, remoteProps);

        componentNode = TestUtils.renderClassIntoDocument({
            multiple: true,
            onError: (e) => {
                chai.assert.isOk(false, "Multiple File Load Error ! ", e);
                done();
            },
            onChange: (e) => {
                chai.assert.deepEqual(e.target.value, [expectedFilename], " FileInput is multiple ! Value must be a array filename value ! ");
                done();
            },
            display: "list",
            remote: remoteProps,
            autoUpload: false,
            value: ["info_test.png"]
        }, FileUploadInput, defaultProps);

        chai.assert.equal(componentNode.props.display, "list");
        chai.assert.deepEqual(componentNode.props.value, ["info_test.png"]);
        chai.assert.equal(componentNode.props.autoUpload, false);
        chai.assert.equal(componentNode.props.multiple, true);
        chai.assert.deepEqual(componentNode.props.remote, remoteProps);
    });

    it("render", (done) => {
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            value: ["info_test.png"],
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(false, `FileInput Error -> ${error}`);
                done();
            }
        };

        let testArray = [];
        let wrapper;
        testArray.next = () => {
            let prop = testArray.pop();
            if (prop) {
                wrapper = TestUtils.mount(prop, FileUploadInput, defProps);
            }
        };


        let test2 = {
            value: ["unknwonfile.png"],
            onChange: (e) => {
                chai.assert.isOk(false, `It should give  error ! Because file not found on system ! e: ${e}`);
                done();
            },
            onError: (error) => {
                chai.assert.isOk(true, `File not found on system. It is correct. Error Detail: ${error}`);
                done();
            }
        };

        let test1 = {
            onChange: (e) => {
                chai.assert.deepEqual(e.target.oldValue, []);
                // chai.assert.deepEqual(e.target.value, ["info_test.png"]);
                testArray.push(test2);
                testArray.next();
            }
        };

        testArray.push(test1);

        testArray.next();
    })

    it("__onInitSuccess", () => {
        let filename = "unknow_file_name";
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(true);
            },
            onChange: (e) => {
                chai.assert.isOk(false, `Coming ${filename} from server is not exist in FileInput ! `);
            }
        };
        let wrapper = TestUtils.mount({}, FileUploadInput, defProps);
        /* eslint-disable no-underscore-dangle */
        wrapper.instance().__onInitSuccess([{
            filename: filename
        }]);
    });

    it("browse", () => {
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(false, `FileInput Error -> ${error}`);
            },
            onChange: (e) => {
                chai.assert.deepEqual(e.target.oldValue, []);
            }
        };
        let wrapper = TestUtils.mount({}, FileUploadInput, defProps);
        wrapper.instance().browse();
    });

    it("open", () => {
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(false, `FileInput Error -> ${error}`);
            },
            onChange: (e) => {
                chai.assert.deepEqual(e.target.oldValue, []);
            }
        };
        let wrapper = TestUtils.mount({}, FileUploadInput, defProps);
        wrapper.instance().open();
    });

    it("upload & deleteItem", (done) => {
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(false, `FileInput Error -> ${error}`);
                done(error);
            }
        };

        let wrapper = null;
        let uploadProps = {
            onChange: (e) => {
                if (e.target.event === "upload") {
                    chai.assert.deepEqual(e.target.oldValue, [], "Old Value must be an empty array ! ");
                    chai.assert.equal(e.target.value.length, 1);
                    console.log(e);
                    wrapper.instance().deleteItem({
                        filename: e.target.value[0]
                    });
                } else if (e.target.event === "delete") {
                    // chai.assert.deepEqual(e.target.oldValue, deleteProps.value, "Old Value must has more than one files which files uploaded.");
                    // chai.assert.deepEqual(e.target.value, [], "New Value must be an empty array");
                    done();
                }
            }
        };


        wrapper = TestUtils.mount(uploadProps, FileUploadInput, defProps);
        let blob = new Blob(["Lorem ipsum"], {
            type: "plain/text",
            filename: "Single File 1"
        });

        let file: File = TestUtils.blobToFile(blob, "example_file.txt");
        wrapper.instance().upload([file]);
    });


    it("check maxFileSize", (done) => {
        let wrapper;
        let callCount = 0;
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            value: ["info_test.png"],
            maxFileSize: 1,
            remote: remoteProps,
            onError: (error) => {
                if (callCount === 0) {
                    chai.assert.isOk(false, `FileInput Error -> ${error}`);
                } else if (callCount === 1) {
                    chai.assert.isOk(true);
                }
                done();
            },
            onChange: (e) => {
                callCount++;
                let blob = new Blob(["Lorem ipsum"], {
                    type: "plain/text",
                    filename: "Single File 1"
                });

                let file: File = TestUtils.blobToFile(blob, "example_file.txt");
                wrapper.instance().upload([file]);
            }
        };

        wrapper = TestUtils.mount({}, FileUploadInput, defProps);
    });

    it("__onUploadSucess", () => {
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(true);
            },
            onChange: (e) => {
                chai.assert.isOk(false, "Callback Uploades files wasn't execute right ! ");
            }
        };
        let wrapper = TestUtils.mount({}, FileUploadInput, defProps);
        /* eslint-disable no-underscore-dangle */
        wrapper.instance().__onUploadSucess([]);

    });


    it("check fileNameExist", (done) => {
        let count = 0;
        let wrapper = null;
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            value: ["info_test.png"],
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(true);
                done();
            },
            onChange: (e) => {
                if (count > 1) {
                    chai.assert.isOk(false, "Must give error. Because Uploaded file exist ! ");
                    done();
                } else {
                    count++;
                    /* eslint-disable no-underscore-dangle */
                    wrapper.instance().__onUploadSucess([{ filename: "info_test.png" }]);
                }
            }
        };
        wrapper = TestUtils.mount({}, FileUploadInput, defProps);
    });
});
