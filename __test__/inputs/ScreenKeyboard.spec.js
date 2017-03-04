import chai from "chai";
import TestUtils from "../TestUtils";
import ScreenKeyboard from "inputs/screenkeyboard/ScreenKeyboard";
import QKeyboard_tr_TR from "inputs/screenkeyboard/QKeyboard_tr_TR.json";
import KeyboardWithSpecial_ru_RU from "inputs/screenkeyboard/KeyboardWithSpecial_ru_RU.json";

let inputId = "keyboardId";
let language = "tr_TR";
let languageText = "Türkçe";

beforeEach(function () {
    var fixture = '<input id="keyboardId" type="text">';

    document.body.insertAdjacentHTML(
        'afterbegin',
        fixture);
});

describe("Screen Keyboard", () => {

    it("render", () => {
        let wrapper = TestUtils.mount({}, ScreenKeyboard, {});
        chai.assert.equal(wrapper.find(ScreenKeyboard).length, 1);
    });

    it("__handleLanguageTypes", () => {
        let props = {
            languageText: languageText,
            language: language
        };

        let wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal("Türkçe", wrapper.instance().__convertLanguageText(), "Converting language false" + props.languageText);
        wrapper.unmount();

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(QKeyboard_tr_TR, wrapper.instance().__decideLanguage(props.language), "Wrong language decided with given props" + props.language);
        wrapper.unmount();

        props = {
            language: "ru_RU"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(KeyboardWithSpecial_ru_RU, wrapper.instance().__decideSpecialLanguage(props.language), "Wrong special language decided with given props" + props.language);
        wrapper.unmount();

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__decideControlLanguage(props.language).length, "Wrong control language decided with given props" + props.language);
        wrapper.unmount();

        props = {
            language: "tr_TR"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__decideSpecialLanguage(props.language).length, "Wrong special language decided with given props" + props.language);
        wrapper.unmount();

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__decideControlLanguage(props.language).length, "Wrong control language decided with given props" + props.language);
        wrapper.unmount();

        props = {
            language: "en_US"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__decideSpecialLanguage(props.language).length, "Wrong special language decided with given props" + props.language);
        wrapper.unmount();

        props = {
            language: "not true define"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__decideControlLanguage(props.language).length, "Wrong control language decided with given props" + props.language);
        wrapper.unmount();

        props = {
            languageText: "English Q",
            language: "numeric"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal("English Q", wrapper.instance().__convertLanguageText(), "Converting language false" + props.languageText);
        wrapper.unmount();

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(11, wrapper.instance().__decideSpecialLanguage(props.language).length, "Wrong special language decided with given props" + props.language);
        wrapper.unmount();

        props = {
            language: "decimal"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal("Dec", wrapper.instance().__convertLanguageText(), "Converting language false" + props.language);
        wrapper.unmount();

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(13, wrapper.instance().__decideSpecialLanguage(props.language).length, "Wrong special language decided with given props" + props.language);
        wrapper.unmount();
    });

    it("__render Q and Numeric Keyboard", () => {
        let props = {language: language};

        let wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__renderQKeyboard().length, "Rendered keyboard not a Q keyboard" + props.language);
        wrapper.unmount();

        props = {language: "numeric"};

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(11, wrapper.instance().__renderDigitalKeyboard().length, "Rendered keyboard not a Digital keyboard" + props.language);
        wrapper.unmount();
    });

    it("__handleButtonClick", () => {
        let props = {inputId: inputId, changeValueAutomatically: true};

        try {
            let wrapper = TestUtils.mount(props, ScreenKeyboard, props);
            wrapper.instance().__handleButtonClick({
                target: {
                    data: "f", getAttribute: function () {
                        return "f";
                    }
                }
            });
            chai.assert.equal(document.getElementById("keyboardId").value, "f", "Input text wrong");
            wrapper.instance().__handleButtonClick({
                target: {
                    data: "a", getAttribute: function () {
                        return "a";
                    }
                }
            });
            chai.assert.equal(document.getElementById("keyboardId").value, "fa", "Input text wrong");

            wrapper.instance().__handleBackspaceClick({target:{value: "fa"}});
            chai.assert.equal(document.getElementById("keyboardId").value, "f", "Input text wrong");

            wrapper.instance().__handleButtonClick({
                target: {
                    data: "t", selectionStart: 0, getAttribute: function () {
                        return "t";
                    }
                }
            });

            chai.assert.equal(document.getElementById("keyboardId").value, "ft", "Input text wrong");

            wrapper.unmount();
        } catch (error) {
            chai.assert.equal(error.message, "please use same or right ID field for your input.");
        }
    });


    
});
