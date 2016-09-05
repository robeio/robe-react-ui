import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { Maps, Class } from "robe-react-commons";
import ReactTestUtils from "react-addons-test-utils";

class TestUtils extends Class {

    getTestUrl() {
        return "http://localhost:3001";
    }

    getUrl(path: string): string {
        return `http://localhost:3001/${path}`;
    }

    renderIntoDocument(...args) {
        return ReactTestUtils.renderIntoDocument.apply(undefined, args);
    }
    mount(props: Object, ClassComponent: Object, defaultProps): Object {
        this.createComponent(props, ClassComponent, defaultProps);
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return mount(React.createElement(ClassComponent, props));
    }

    /**
     * @deprecated
     * @param props
     * @param ClassComponent
     * @param defaultProps
     * @returns {Object}
     */
    getComponent(props: Object, ClassComponent: Object, defaultProps){
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return React.createElement(ClassComponent, props);
    }

    createComponent(props: Object, ClassComponent: Object, defaultProps){
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return React.createElement(ClassComponent, props);
    }

    findDOMNode(...args) {
        return ReactDOM.findDOMNode.apply(undefined, args);
    }
}

export default new TestUtils();
