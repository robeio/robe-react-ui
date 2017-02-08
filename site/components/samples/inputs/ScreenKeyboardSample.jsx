import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import NumericInput from "robe-react-ui/lib/inputs/NumericInput";
import ScreenKeyboard from "robe-react-ui/lib/inputs/screenkeyboard/ScreenKeyboard";

export default class TextInputSample extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
            screenKeyboardValue: "",
            screenKeyboardValueWithNumeric: "",
            screenKeyboardDefault: ""
        };
    }

    render():Object {
        return (
            <span>
                <div style={{marginBottom:230}}>
                    <TextInput
                        id="screenKeyboardSample" // id -> required
                        label="Screen Keyboard With Language Keyboard"
                        name="screenKeyboardValue"
                        value={this.state.screenKeyboardValue}
                        onChange={this.__handleChange}
                    />
                    <ScreenKeyboard inputId="screenKeyboardSample"
                                    language="tr_TR"
                                    showOnMobile
                                    languageText="Türkçe Q"
                                    onClick={this.__onClickTextKeyboard}
                    />
                </div>

                <div style={{marginBottom:200}}>
                    <NumericInput
                        id="screenKeyboardSample1" // id -> required
                        label="Screen Keyboard With Numeric Keyboard"
                        name="screenKeyboardValueWithNumeric"
                        value={this.state.screenKeyboardValueWithNumeric}
                        onChange={this.__handleChange}
                    />
                    <ScreenKeyboard inputId="screenKeyboardSample1"
                                    language="numeric"
                                    onClick={this.__onClickNumericKeyboard}
                    />
                </div>

                <div style={{marginBottom:230}}>
                    <label>Can Use Without Input (Returns Only Clicked Key)</label><br/>
                    <span>Clicked Key : <label>{this.state.screenKeyboardDefault}</label></span>
                   <ScreenKeyboard onClick={this.__onClickDefaultKeyboard} languageText="English -- Draggable Area --"/>
                </div>
            </span>
        );
    }

    __onClickTextKeyboard(value:string, key:string) {
        this.setState({screenKeyboardValue: value});
        console.log(value, key);
    };

    __onClickNumericKeyboard(value:string, key:string) {
        this.setState({screenKeyboardValueWithNumeric: value});
        console.log(value, key);
    };

    __onClickDefaultKeyboard(value:string, key:string) {
        this.setState({screenKeyboardDefault: key});
    };

    __handleChange(e:Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    }
}
