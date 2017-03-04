/**
 * Created by cagdasbekar on 09/02/17.
 */
import chai from "chai";
import TestUtils from "../TestUtils";
import DataFilter from "datafilter/DataFilter";

describe("DataFilter", () => {
    let fields = [
        {
            "label": "Id",
            "type": "number",
            "name": "id",
            "filter": false
        },
        {
            "label": "A",
            "type": "string",
            "name": "a",
            "filter": true
        },
        {
            "label": "B",
            "type": "number",
            "name": "b",
            "filter": true
        },
        {
            "label": "C",
            "type": "date",
            "name": "c",
            "filter": true
        },
        {
            "label": "D",
            "type": "select",
            "name": "d",
            "filter": true,
            "items": [
                {
                    "value": "f",
                    "text": "F"
                },
                {
                    "value": "g",
                    "text": "G"
                }
            ]
        },
        {
            "label": "E",
            "type": "radio",
            "name": "e",
            "filter": true,
            "items": [
                {
                    "value": "h",
                    "text": "H"
                },
                {
                    "value": "j",
                    "text": "J"
                }
            ]
        }
    ];

    it("render", () => {
        let props = {
            fields:fields,
            onChange: () => { }
        }
        let dataFilter = TestUtils.mount(props, DataFilter, props);
        chai.assert.equal(dataFilter.find(DataFilter).length, 1);

        let inputField = dataFilter.find(".data-filter-input").first();
        inputField.simulate("focus");
        let links = dataFilter.find("a");
        chai.assert.equal(links.length,5,"NavItems count not correct");
        chai.assert.equal(links.first().text(),"A","First navitem's label not correct");

        let e = {target:{value:"A"}}
        dataFilter.instance().__onChange(e);
        links.first().simulate("click");
        links = dataFilter.find("a");
        chai.assert.equal(links.length,8,"NavItems count not correct");

        e = {target:{value:"A ="}}
        dataFilter.instance().__onChange(e);
        links.first().simulate("click");
        chai.assert.equal(inputField.node.value,"A = \"","Input text wrong");

        e = {target:{value:"A = \"a"}}
        dataFilter.instance().__onChange(e);
        chai.assert.equal(inputField.node.value,"A = \"a","Input text wrong");

        inputField.simulate("keyDown", {keyCode: 13});
        chai.assert.equal(dataFilter.instance().filters.length,1,"Filter not changed for first item");

        links = dataFilter.find("a");
        links.at(1).simulate("click");
        links = dataFilter.find("a");
        links.first().simulate("click");
        chai.assert.equal(inputField.node.value,"B = ","Input text wrong");

        e = {target:{value:"B = 1"}}
        dataFilter.instance().__onChange(e);
        inputField.simulate("keyDown", {keyCode: 13});
        chai.assert.equal(dataFilter.instance().filters.length,2,"Filter not changed for second item");

        links = dataFilter.find("a");
        links.at(2).simulate("click");
        links = dataFilter.find("a");
        links.first().simulate("click");
        chai.assert.equal(inputField.node.value,"C = \"","Input text wrong");

        e = {target:{parsedValue:1487236653579}}
        dataFilter.instance().__dateChange(e);
        dataFilter.instance().__hideIfOut();
        chai.assert.equal(dataFilter.instance().filters.length,3,"Filter not changed for third item");

        links = dataFilter.find("a");
        links.at(3).simulate("click");
        links = dataFilter.find("a");
        inputField.simulate("keyDown", {keyCode: 38});
        links.first().simulate("click");
        chai.assert.equal(inputField.node.value,"D = ","Input text wrong");

        links = dataFilter.find("a");
        links.first().simulate("click");
        inputField.simulate("keyDown", {keyCode: 13});
        chai.assert.equal(dataFilter.instance().filters.length,4,"Filter not changed for fourth item");

        links = dataFilter.find("a");
        links.at(4).simulate("click");
        links = dataFilter.find("a");
        links.first().simulate("click");
        chai.assert.equal(inputField.node.value,"E = ","Input text wrong");

        e = {target:{value:"AE = H"}}
        dataFilter.instance().__onChange(e);
        e = {target:{value:"E = H"}}
        dataFilter.instance().__onChange(e);
        inputField.simulate("keyDown", {keyCode: 13});
        chai.assert.equal(dataFilter.instance().filters.length,5,"Filter not changed for fifth item");

        inputField.simulate("keyDown", {keyCode: 8});
        chai.assert.equal(dataFilter.instance().filters.length,4,"Delete not successful");

        e = {target:{value:"E = "}}
        dataFilter.instance().__onChange(e);
        inputField.simulate("keyDown", {keyCode: 8});
        chai.assert.equal(inputField.node.value,"E ","Input text wrong");

        inputField.simulate("keyDown", {keyCode: 8});
        chai.assert.equal(dataFilter.instance().filters.length,4,"Delete not successful");

        inputField.simulate("keyDown", {keyCode: 8});
        chai.assert.equal(dataFilter.instance().filters.length,3,"Delete not successful");

        let closeicon = dataFilter.find(".data-filter-select-icon");
        closeicon.first().simulate("click");
        chai.assert.equal(dataFilter.instance().filters.length,2,"Delete with close icon not successful");

        let closeallicon = dataFilter.find(".data-filter-close-all");
        closeallicon.first().simulate("click");
        chai.assert.equal(dataFilter.instance().filters.length,0,"Delete with close all icon not successful");

        inputField.simulate("keyDown", {keyCode: 9});
        chai.assert.equal(dataFilter.instance().state.showSelect,false,"Close menu unsuccessful");

        inputField.simulate("focus");
        chai.assert.equal(dataFilter.instance().state.showSelect,true,"Menu open unsuccessful");

        inputField.simulate("blur");
        dataFilter.instance().__hideIfOut();
        chai.assert.equal(dataFilter.instance().state.showSelect,false,"Hide if out unsuccessful");

        dataFilter.unmount();
    });
});