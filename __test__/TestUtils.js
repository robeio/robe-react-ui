import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import { Maps, Class, AjaxRequest } from "robe-react-commons";
import ReactTestUtils from "react-addons-test-utils";
const langJSON = require("assets/en_US.json");
import CA from "robe-react-commons/lib/application/Application";
CA.loadI18n(langJSON);

const url = "http://localhost:3001";

const ApplicationInformation = new AjaxRequest({
    url: `${url}/application`,
    type: "GET",
    dataType: "json"
});

class TestUtils extends Class {

    getBaseUrl() {
        return url;
    }

    createUrl(path: string): string {
        return `${url}/${path}`;
    }

    getInformation(onSuccess, onError) {
        ApplicationInformation.call(
            undefined,
            undefined,
            onSuccess,
            onError
        );
    }

    renderIntoDocument(...args) {
        return ReactTestUtils.renderIntoDocument.apply(undefined, args);
    }

    mount(props: Object, ClassComponent: Object, defaultProps): Object {
        return mount(this.createComponent(props, ClassComponent, defaultProps));
    }

    shallow(props: Object, ClassComponent: Object, defaultProps): Object {
        return shallow(this.createComponent(props, ClassComponent, defaultProps));
    }

    renderClassIntoDocument(props: Object, ClassComponent: Object, defaultProps) {
        return this.renderIntoDocument(this.createComponent(props, ClassComponent, defaultProps));
    }

    /**
     * @param props
     * @param ClassComponent
     * @param defaultProps
     * @returns {Object}
     */
    createComponent(props: Object, ClassComponent: Object, defaultProps){
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return React.createElement(ClassComponent, props);
    }

    findDOMNode(...args) {
        return ReactDOM.findDOMNode.apply(undefined, args);
    }

    blobToFile(blob: Blob, fileName:string): File {
        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        blob.lastModifiedDate = new Date();
        blob.name = fileName;
        // Cast to a File() type
        return blob;
    }
}

export default new TestUtils();
