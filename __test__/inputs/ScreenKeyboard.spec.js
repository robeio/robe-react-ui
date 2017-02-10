import chai from "chai";
import TestUtils from "../TestUtils";
import ScreenKeyboard from "inputs/screenkeyboard/ScreenKeyboard";
import QKeyboard_tr_TR from "inputs/screenkeyboard/qKeyboard_tr_TR.json";
import KeyboardWithSpecial_ru_RU from "inputs/screenkeyboard/keyboardWithSpecial_ru_RU.json";

let inputId = "id";
let language = "tr_TR";
let languageText = "Türkçe";

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
        chai.assert.equal("Türkçe", wrapper.instance().__convertLanguageText());
        wrapper.unmount();

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(QKeyboard_tr_TR, wrapper.instance().__decideLanguage(props.language));
        wrapper.unmount();

        props = {
            language: "ru_RU"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(KeyboardWithSpecial_ru_RU, wrapper.instance().__decideSpecialLanguage(props.language));
        wrapper.unmount();

        props = {
            language: "not true define"
        };

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__decideControlLanguage(props.language).length);
        wrapper.unmount();
    });

    it("__render Q and Numeric Keyboard", () => {
        let props = {language: language};

        let wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(54, wrapper.instance().__renderQKeyboard().length);
        wrapper.unmount();

        props = {language: "numeric"};

        wrapper = TestUtils.mount(props, ScreenKeyboard, props);
        chai.assert.equal(13, wrapper.instance().__renderDigitalKeyboard().length);
        wrapper.unmount();
    });


    it("__handleBackSpaceClick", () => {
        let props = {inputId: inputId};

        try {
            let wrapper = TestUtils.mount(props, ScreenKeyboard, props);
            wrapper.instance().__handleBackspaceClick();
            wrapper.unmount();
        } catch (error) {
            chai.assert.equal(error.message, "please use same or right ID field for your input.");
        }
    });

    it("__handleButtonClick", () => {
        let props = {inputId: inputId};
        
        try {
            let wrapper = TestUtils.mount(props, ScreenKeyboard, props);
            wrapper.instance().__handleButtonClick();
            wrapper.unmount();
        } catch (error) {
            chai.assert.equal(error.message, "please use same or right ID field for your input.");
        }
    });
});
