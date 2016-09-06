import chai from "chai";
import React from "react";
import TestUtils from "../TestUtils";
import FileManager from "util/FileManager";
import { AjaxRequest } from "robe-react-commons";
import path from "path";

const filesUrl = TestUtils.createUrl("files");

describe("util/FileManager", () => {
    it("constructors", () => {
        let props = {
            url: filesUrl,
            upload: {
                type: "PUT"
            },
            info: {
                type: "POST"
            },
            preview: {
                type: "GET"
            },
            delete: {
                type: "DELETE"
            }
        };

        let manager = new FileManager(props);
        let exptectedUrl = "http://localhost:3001/files";
        /* eslint-disable no-underscore-dangle */
        // check infoRequest
        chai.assert.equal(exptectedUrl, manager.__deleteRequest.__url);
        // check uploadProps
        chai.assert.equal(exptectedUrl, manager.__uploadProps.url);
        // check deleteRequest
        chai.assert.equal(exptectedUrl, manager.__deleteRequest.__url);
    });

    it("info `files array`", (done) => {
        let fileName = "info_test.png";
        let fileData = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename: fileName,
            mimetype: "image/png",
            originalname: "info_test.png",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/info_test.png.json",
            size: 2067
        };
        let expectedFiles = [fileData];

        let manager = new FileManager({
            url: filesUrl
        });
        manager.info([fileName], (files) => {
            chai.assert.deepEqual(expectedFiles, files);
            done();
        }, (error) => {
            chai.assert.isOk(false, `Failed read file from server ! Reason : ${error}`);
            done();
        });
    });

    it("info `file`", (done) => {
        let filename = "info_test.png";
        let expectedFile = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename: "info_test.png",
            mimetype: "image/png",
            originalname: "info_test.png",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/info_test.png.json",
            size: 2067
        };

        let manager = new FileManager({
            url: filesUrl
        });

        manager.info({
            filename
        }, (file) => {
            chai.assert.deepEqual(expectedFile, file);
            done();
        }, (error) => {
            chai.assert.isOk(false, `Failed read file from server ! Reason : ${error}`);
            done();
        });
    });

    let uploadedFiles = null;

    it("upload", (done) => {
        let manager = new FileManager({
            url: filesUrl
        });

        let blob = new Blob(["Lorem ipsum"], {
            type: "plain/text",
            filename: "Multi File 1"
        });

        let blob2 = new Blob(["Lorem ipsum 2"], {
            type: "plain/text",
            filename: "Multi File 2"
        });

        manager.upload(
            "files",
            [blob, blob2],
            (response) => {
                uploadedFiles = response;
                chai.assert.equal(response.length, 2);
                done();
            },
            (error) => {
                chai.assert.isOk(false, "File couldn't upload ! Detail : ", error);
                done();
            }
        );
    });

    it("uploadFile", (done) => {

        let manager = new FileManager({
            url: filesUrl
        });

        /**
         * {
         *  fieldname: 'files',
            originalname: 'blob',
            encoding: '7bit',
            mimetype: 'plain/text',
            filename: 'a2f401e2-c7f1-d012-8abd-8474c803e7ba',
            destination: '/Users/kamilbukum/DEV/robe/robe-react-ui/data/upload',
            path: '/Users/kamilbukum/DEV/robe/robe-react-ui/data/upload/a2f401e2-c7f1-d012-8abd-8474c803e7ba',
            size: 11
            }
         */
        let blob = new Blob(["Lorem ipsum"], {
            type: "plain/text",
            filename: "Single File 1"
        });


        manager.uploadFile(
            "files",
            blob,
            (response) => {
                uploadedFiles = uploadedFiles ? uploadedFiles.concat(response) : response;
                chai.assert.equal(response.length, 1);
                done();
            },
            (error) => {
                chai.assert.isOk(false, "File couldn't upload ! Detail : ", error);
                done();
            }
        );
    });

    it("delete", (done) => {
        let manager = new FileManager({
            url: filesUrl
        });
        let keys = [];
        for (let i = 0; i < uploadedFiles.length; i++) {
            keys[i] = uploadedFiles[i].filename;
        }
        manager.delete(
            keys,
            (response) => {
                chai.assert.equal(response.length, 3);
                done();
            },
            (error) => {
                chai.assert.isOk(false, "File couldn't upload ! Detail : ", error);
                done();
            }
        );
    });
});

