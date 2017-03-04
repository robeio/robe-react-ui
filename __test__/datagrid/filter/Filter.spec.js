import chai from "chai";
import TestUtils from "../../TestUtils";
import Filter from "datagrid/filter/Filter";
import ComponentManager from "form/ComponentManager";


describe("datagrid/filter/Filter", () => {
    let props = {
        field: {
            "label": "Name",
            "type": "string",
            "name": "name"
        },
        value: "Test"
    };
    let createOnChange = (expected, done) => {
        return (name, value, filter) => {
            chai.assert.equal(name, "name");
            value = value.target ? value.target.value : value;
            chai.assert.equal(value, expected);
            done();
        };
    }
    let testRendering = (props) => {
        props.field.range = false;
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One " + Component.name + " must be rendered.");
        wrapper.unmount();
    }
    let testRangeRendering = (props) => {
        props.field.range = true;
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 2, "Two " + Component.name + " must be rendered.");
        wrapper.unmount();
    }

    let testHandleChange = (props, done, newValue) => {
        props.onChange = createOnChange(newValue, done);
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        let instance = wrapper.find(Component).node;
        let onChange = instance.__onChange || instance.__onClickSingle || instance.__callOnChange;
        onChange({ target: { name: "name", value: newValue } });
        wrapper.unmount();
    }

    it("render - text", () => {
        props.field.type = "text";
        testRendering(props);
    });
    it("render - number", () => {
        props.field.type = "number";
        testRendering(props);
        testRangeRendering(props);
    });
    it("render - decimal", () => {
        props.field.type = "decimal";
        testRendering(props);
        testRangeRendering(props);
    });
    it("render - date", () => {
        props.field.type = "date";
        testRendering(props);
        testRangeRendering(props);
    });
    it("render - password", () => {
        props.field.type = "password";
        testRendering(props);
    });
    it("render - money", () => {
        props.field.type = "money";
        testRendering(props);
        testRangeRendering(props);
    });
    it("render - radio", () => {
        props.field.type = "radio";
        testRendering(props);
    });
    it("render - select", () => {
        props.field.type = "select";
        testRendering(props);
    });
    it("render - check", () => {
        props.field.type = "check";
        testRendering(props);
    });

    /*
    it("handleChange", (done) => {
        props.field.type = "string";
        testHandleChange(props, done, "123");

        props.field.type = "text";
        testHandleChange(props, done, "123");

        props.field.type = "number";
        testHandleChange(props, done, "2");

        props.field.type = "decimal";
        testHandleChange(props, done, "2");

        props.field.type = "date";
        
        // testHandleChange(props, done, "12/12/1985");

        props.field.type = "password";
        testHandleChange(props, done, "123");

        props.field.type = "money";
        testHandleChange(props, done, "12.2");

        props.field.type = "radio";
        testHandleChange(props, done, "a");

        props.field.type = "select";
        testHandleChange(props, done, "a");

        props.field.type = "check";
        testHandleChange(props, done, false);
        
    });
    */
    it("handleChangeRange-min", (done) => {
        props.field.type = "number";
        props.field.range = true;
        props.value = [0, 2];
        props.onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.deepEqual(value, [1, 2]);
            done();
        };
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        wrapper.find(Component).nodes[0].__onChange({ target: { name: "name-min", value: 1 } })
        wrapper.unmount();
    });
    it("handleChangeRange-max", (done) => {
        props.field.type = "number";
        props.field.range = true;
        props.value = [0, 2];
        props.onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.deepEqual(value, [0, 3]);
            done();
        };
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        wrapper.find(Component).nodes[1].__onChange({ target: { name: "name-max", value: 3 } })
        wrapper.unmount();
    });

    it("null value -min", (done) => {
        props.field.type = "number";
        props.field.range = true;
        props.value = undefined;
        props.onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.deepEqual(value, [undefined, 3]);
            done();
        };
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        wrapper.find(Component).nodes[1].__onChange({ target: { name: "name-max", value: 3 } });
        wrapper.unmount();
    });
    it("null value max", (done) => {
        props.field.type = "number";
        props.field.range = true;
        props.value = undefined;
        props.onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.deepEqual(value, [1, undefined]);
            done();
        };
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        wrapper.find(Component).nodes[0].__onChange({ target: { name: "name-min", value: 1 } });
        wrapper.unmount();
    })
});
