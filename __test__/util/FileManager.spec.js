import chai from "chai";
import React from "react";
import TestUtils from "../TestUtils";
import FileManager from "util/FileManager";

const url = "http://localhost:3001/files";

describe("util/FileManager", () => {
    it("constructors", () => {
        let props = {
            request: {
                url: "http://localhost:3000/files",
                upload: {
                    type: "PUT"
                },
                load: {
                    type: "POST"
                },
                preview: {
                    type: "GET"
                },
                delete: {
                    type: "DELETE"
                }
            }
        }
        // check uploadProps
        // check infoRequest
        // check deleteRequest
        // check previewRequest
    });

    it("info `files array`", (done) => {
        let expectedFiles = [
            {
                destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
                encoding: "7bit",
                fieldname: "files",
                filename: "testfile.txt",
                mimetype: "plain/text",
                originalname: "testfile.txt",
                path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/testfile.txt.json",
                size: 2067
            }
        ];

        let manager = new FileManager({
            url
        });
        manager.info(["testfile.txt"], (files) => {
            chai.assert.deepEqual(expectedFiles, files);
            done();
        }, (error) => {
            chai.assert.isOk(false, `Failed read file from server ! Reason : ${error}`);
            done();
        });
    });

    it("info `file`", (done) => {
        let filename = "testfile.txt";
        let expectedFile = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename,
            mimetype: "plain/text",
            originalname: "testfile.txt",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/testfile.txt.json",
            size: 2067
        };

        let manager = new FileManager({
            url
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

    it("upload", () => {
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
