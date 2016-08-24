import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { Maps, Class } from "robe-react-commons";
import ReactTestUtils from "react-addons-test-utils";

class TestUtils extends Class {
    renderIntoDocument() {
        return ReactTestUtils.renderIntoDocument.apply(undefined, arguments);
    }
    mount(props: Object, ClassComponent: Object, defaultProps): Object {
        this.getComponent(props, ClassComponent, defaultProps)
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return mount(React.createElement(ClassComponent, props));
    }

    getComponent(props: Object, ClassComponent: Object, defaultProps){
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return React.createElement(ClassComponent, props);
    }

    findDOMNode() {
        return ReactDOM.findDOMNode.apply(undefined, arguments);
    }
}

export default new TestUtils();
