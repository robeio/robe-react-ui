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
        // check previewRequest
        chai.assert.equal(exptectedUrl, manager.__previewRequest.__url);
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

    it("upload", (done) => {
        let test = (app) => {
            let manager = new FileManager({
                url: filesUrl
            });

            let fileInformation = {

            };

            let filePath = path.join(app.applicationPath, "data/browse/browse1.png");
            console.log(filePath);
            manager.upload(
                "files",
                [filePath],
                (response) => {
                    console.log(response);
                    done();
                },
                (error) => {
                    console.log(error);
                    done();
                }
            );
        }

        let onSuccess = (response) => {
            console.log(response);
            test(response);
        };

        let onError = (error) => {
            console.log(error);
            done();
        };

        TestUtils.getInformation(onSuccess, onError);

        // manager.upload();
    });

    it("uploadFile", () => {
        let manager = new FileManager({
            url: filesUrl
        });
        // manager.uploadFile();
    });

    it("delete", () => {
        let manager = new FileManager({
            url: filesUrl
        });
        // manager.delete();
    });

    it("preview", () => {
        let manager = new FileManager({
            url: filesUrl
        });
        // manager.preview();
    });

});
