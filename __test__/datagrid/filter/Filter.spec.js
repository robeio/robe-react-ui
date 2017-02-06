import chai from "chai";
import TestUtils from "../../TestUtils";
import Filter from "datagrid/filter/Filter";
import ComponentManager from "form/ComponentManager";


describe("datagrid/filter/Filters", () => {
    let props = {
        field: {
            "label": "Name",
            "type": "string",
            "name": "name"
        },
        value: "Test"
    };
    it("render - text", () => {
        props.field.range = false;
        props.field.type = "text";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One TextArea must be rendered.");
        wrapper.unmount();
    });
    it("render - number", () => {
        props.field.range = false;
        props.field.type = "number";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One NumberInput must be rendered.");
        wrapper.unmount();

        props.field.range = true;
        wrapper = TestUtils.mount(props, Filter, props);
        chai.assert.equal(wrapper.find(Component).length, 2, "Two NumberInput must be rendered for range.");
        wrapper.unmount();
    });
    it("render - decimal", () => {
        props.field.range = false;
        props.field.type = "decimal";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One DecimalInput must be rendered.");
        wrapper.unmount();

        props.field.range = true;
        wrapper = TestUtils.mount(props, Filter, props);
        chai.assert.equal(wrapper.find(Component).length, 2, "Two DecimalInput must be rendered for range.");
        wrapper.unmount();
    });
    it("render - date", () => {
        props.field.range = false;
        props.field.type = "date";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One DateInput must be rendered.");
        wrapper.unmount();

        props.field.range = true;
        wrapper = TestUtils.mount(props, Filter, props);
        chai.assert.equal(wrapper.find(Component).length, 2, "Two DateInput must be rendered for range.");
        wrapper.unmount();
    });
    it("render - password", () => {
        props.field.range = false;
        props.field.type = "password";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One PasswordInput must be rendered.");
        wrapper.unmount();
    });
    it("render - money", () => {
        props.field.range = false;
        props.field.type = "money";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One MoneyInput must be rendered.");
        wrapper.unmount();

        props.field.range = true;
        wrapper = TestUtils.mount(props, Filter, props);
        chai.assert.equal(wrapper.find(Component).length, 2, "Two MoneyInput must be rendered for range.");
        wrapper.unmount();
    });
    it("render - radio", () => {
        props.field.range = false;
        props.field.type = "radio";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One RadioInput must be rendered.");
        wrapper.unmount();
    });
    it("render - select", () => {
        props.field.range = false;
        props.field.type = "select";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One SelectInput must be rendered.");
        wrapper.unmount();
    });
    it("render - check", () => {
        props.field.range = false;
        props.field.type = "check";
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        chai.assert.equal(wrapper.find(Component).length, 1, "One CheckInput must be rendered.");
        wrapper.unmount();
    });

    it("handleChange", (done) => {
        props.field.type = "string";
        props.onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.equal(value, "Test2");
            done();
        };
        let wrapper = TestUtils.mount(props, Filter, props);
        let Component = ComponentManager.getComponent(props.field.type);
        wrapper.find(Component).node.__onChange({ target: { name: "name", value: "Test2" } })
        wrapper.unmount();
    });
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
        wrapper.find(Component).nodes[0].__numericFilter({ target: { name: "name-min", value: 1 } })
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
        wrapper.find(Component).nodes[1].__numericFilter({ target: { name: "name-max", value: 3 } })
        wrapper.unmount();
    });
    it("null props", (done) => {
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
        wrapper.find(Component).nodes[1].__numericFilter({ target: { name: "name-max", value: 3 } })
        wrapper.unmount();
    });
});
