import React from "react";
import { mount } from "enzyme";
import { Maps, Class } from "robe-react-commons";

class ComponentTestUtil extends Class {
    mountComponent(props: Object, ClassComponent: Object, defaultProps): Object {
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
}

export default new ComponentTestUtil();
