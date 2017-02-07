import chai from "chai";
import TestUtils from "../../TestUtils";
import Filters from "datagrid/filter/Filters";
import Filter from "datagrid/filter/Filter";
import ComponentManager from "form/ComponentManager";
import DataGridModel from "../DataGridModel.json";
import { Popover, Overlay, Button, ButtonGroup } from "react-bootstrap";


describe("datagrid/filter/Filters", () => {
    let props = {
        fields: [{
            "label": "Name",
            "type": "string",
            "name": "name"
        }],
        visiblePopups: { "name": true }
    };

    it("render", () => {
        let wrapper = TestUtils.mount(props, Filters, props);
        wrapper.setState(props);
        chai.assert.equal(wrapper.find("span").length, 1, "Invisible Filter must be span");
        wrapper.unmount();
        props.fields[0].filter = true;
        wrapper = TestUtils.mount(props, Filters, props);
        wrapper.setState(props);
        chai.assert.equal(wrapper.find(Overlay).length, 1, "Visible Overlay count must be 1");
        //Enzyme can't test portal components.
    });
    it("onChange", (done) => {
        props.fields[0].filter = true;
        props.onChange = () => {
            done();
        };
        let wrapper = TestUtils.mount(props, Filters, props);
        wrapper.setState(props);
        wrapper.instance().__onChange("name", "1", "name=1");
    });
    it("onClear", (done) => {
        props.fields[0].filter = true;
        let wrapper = TestUtils.mount(props, Filters, props);
        wrapper.setState(props);
        wrapper.instance().__onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.equal(value, undefined);
            chai.assert.equal(filter, undefined);
            done();
        };
        wrapper.instance().__onClear("name");
    });

    it("onClearAll", (done) => {
        props.fields[0].filter = true;
        props.onChange = () => {
            done();
        };
        let wrapper = TestUtils.mount(props, Filters, props);
        wrapper.setState(props);
        wrapper.instance().__onChange = (name, value, filter) => {
            chai.assert.equal(name, "name");
            chai.assert.equal(value, undefined);
            chai.assert.equal(filter, undefined);
            done();
        };
        wrapper.instance().__onClearAll();
    });

});
