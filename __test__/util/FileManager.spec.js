import chai from "chai";
import React from "react";
import TestUtils from "../TestUtils";
import FileManager from "util/FileManager";
import { AjaxRequest } from "robe-react-commons";

const url = TestUtils.createUrl("files");
describe("util/FileManager", () => {
    it("constructors", () => {
        let props = {
            url: url,
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
        let fileName = "testfile.png";
        let fileData = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename: fileName,
            mimetype: "image/png",
            originalname: "testfile.png",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/testfile.png.json",
            size: 2067
        };
        let expectedFiles = [fileData];

        let manager = new FileManager({
            url
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
        let filename = "testfile.png";
        let expectedFile = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename: "testfile.png",
            mimetype: "image/png",
            originalname: "testfile.png",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/testfile.png.json",
            size: 2067
        };

        let manager = new FileManager({
            url
        });

        manager.info({
            filename
        }, (file) => {
            console.log(file);
            chai.assert.deepEqual(expectedFile, file);
            done();
        }, (error) => {
            chai.assert.isOk(false, `Failed read file from server ! Reason : ${error}`);
            done();
        });
    });

    it("upload", () => {
        new AjaxRequest({
            url: "",
            type: "GET",
            dataType: "json"
        })
        let manager = new FileManager({
            url
        });
        // manager.upload();
    });

    it("uploadFile", () => {
        let manager = new FileManager({
            url
        });
        // manager.uploadFile();
    });

    it("delete", () => {
        let manager = new FileManager({
            url
        });
        // manager.delete();
    });

    it("preview", () => {
        let manager = new FileManager({
            url
        });
        // manager.preview();
    });

});
