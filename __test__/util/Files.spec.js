import chai from "chai";
import Files from "util/Files";
import TestUtils from "../TestUtils";

const assert = chai.assert;
describe("util/Files", () => {
    it("getExtensionByMime", () => {
        let expected = "png";
        let result = Files.getExtensionByMime("image/png");
        assert.equal(expected, result);
    });
    it("getExtensionByPath", () => {
        let expected = "png";
        let result = Files.getExtensionByPath("/example/example.png");
        assert.equal(expected, result);
        result = Files.getExtensionByPath("example/example.png");
        assert.equal(expected, result);
    });
    it("getFileName", () => {
        let expected = "example.png";
        let result = Files.getFileName("/example/example.png");
        assert.equal(expected, result);
        result = Files.getFileName("example/example.png");
        assert.equal(expected, result);
    });
    it("presentSize", () => {
        let expected = "1 KB 1 Bytes";
        let result = Files.presentSize(1024 + 1);
        assert.equal(expected, result);
        expected = "1 MB 1 Bytes";
        result = Files.presentSize(1024 * 1024 + 1);
        assert.equal(expected, result);
    });
    it("getDroppedFiles", () => {
        let blob = new Blob(["Lorem ipsum"], {
            type: "plain/text",
            filename: "Single File 1"
        });
        let file: File = TestUtils.blobToFile(blob, "example_file.txt");

        let expectedArray = [
            {
                file,
                isUploaded: false,
                lastModified: file.lastModifiedDate.getTime(),
                name: 'example_file.txt',
                size: blob.size,
                type: blob.type
            }
        ];


        let result = Files.getDroppedFiles([file]);
        assert.equal(expectedArray.length, result.length);
        assert.equal(expectedArray[0].file, result[0].file);
        assert.equal(expectedArray[0].file, result[0].file);
        assert.isNotOk(expectedArray[0].isUploaded, " initial isUploaded member is not false ! ");
        assert.equal(expectedArray[0].lastModified, result[0].lastModified);
        assert.equal(expectedArray[0].name, result[0].name);
        assert.equal(expectedArray[0].size, result[0].size);
        assert.equal(expectedArray[0].type, result[0].type);
    });
    it("getDroppedFile", () => {
        let blob = new Blob(["Lorem ipsum"], {
            type: "plain/text",
            filename: "Single File 1"
        });

        let file: File = TestUtils.blobToFile(blob, "example_file.txt");

        let expectedData =  {
            file,
            isUploaded: false,
            lastModified: file.lastModifiedDate.getTime(),
            name: 'example_file.txt',
            size: blob.size,
            type: blob.type
        };

        let result = Files.getDroppedFile(file);

        assert.equal(expectedData.file, result.file);
        assert.isNotOk(expectedData.isUploaded, " initial isUploaded member is not false ! ");
        assert.equal(expectedData.lastModified, result.lastModified);
        assert.equal(expectedData.name, result.name);
        assert.equal(expectedData.size, result.size);
        assert.equal(expectedData.type, result.type);
    });
});

