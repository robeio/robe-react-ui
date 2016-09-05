import chai from "chai";// eslint-disable-line
import ComponentManager from "form/ComponentManager";// eslint-disable-line
import TextInput from "inputs/TextInput";// eslint-disable-line
import NumericInput from "inputs/NumericInput";// eslint-disable-line
import DecimalInput from "inputs/DecimalInput";// eslint-disable-line
import DateInput from "inputs/DateInput";// eslint-disable-line
import PasswordInput from "inputs/PasswordInput";// eslint-disable-line
import MoneyInput from "inputs/MoneyInput";// eslint-disable-line
import RadioInput from "inputs/RadioInput";// eslint-disable-line
import SelectInput from "inputs/SelectInput";// eslint-disable-line
import CheckInput from "inputs/CheckInput";// eslint-disable-line
import HtmlEditor from "inputs/htmleditor/HtmlEditor";// eslint-disable-line
import FileUploadInput from "inputs/upload/FileUploadInput";// eslint-disable-line

describe("form/ComponentManager", () => {
    it("__getComponentByType", () => {
        let component = ComponentManager.findComponentByType("string");
        chai.assert.equal(component, TextInput);

        component = ComponentManager.findComponentByType("number");
        chai.assert.equal(component, NumericInput);

        component = ComponentManager.findComponentByType("decimal");
        chai.assert.equal(component, DecimalInput);

        component = ComponentManager.findComponentByType("date");
        chai.assert.equal(component, DateInput);

        component = ComponentManager.findComponentByType("password");
        chai.assert.equal(component, PasswordInput);

        component = ComponentManager.findComponentByType("money");
        chai.assert.equal(component, MoneyInput);

        component = ComponentManager.findComponentByType("radio");
        chai.assert.equal(component, RadioInput);

        component = ComponentManager.findComponentByType("list");
        chai.assert.equal(component, SelectInput);

        component = ComponentManager.findComponentByType("check");
        chai.assert.equal(component, CheckInput);

        component = ComponentManager.findComponentByType("editor");
        chai.assert.equal(component, HtmlEditor);

        component = ComponentManager.findComponentByType("file");
        chai.assert.equal(component, FileUploadInput);

        chai.assert.throws(() => {
            component = ComponentManager.findComponentByType("test");
        }, "Unknown test type !");
    });

    it("addComponentFinder", () => {
        const finder = function finder(): boolean {
            return false;
        };

        chai.assert.equal(ComponentManager.getComponentFinderNames().length, 1);
        chai.assert.equal(ComponentManager.getComponentFinders().length, 1);
        ComponentManager.addComponentFinder("demo", finder);
        chai.assert.equal(ComponentManager.getComponentFinderNames().length, 2);// eslint-disable-line

        chai.assert.throws(() => {
            ComponentManager.addComponentFinder("__standart", finder);
        }, "Component Finder already exist ! ");

        ComponentManager.deleteComponentFinderByName("demo");
        chai.assert.equal(ComponentManager.getComponentFinderNames().length, 1);// eslint-disable-line
        ComponentManager.deleteComponentFinderByName("test");
        chai.assert.equal(ComponentManager.getComponentFinderNames().length, 1);// eslint-disable-line
    });
});
