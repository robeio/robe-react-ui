import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Button from "react-bootstrap/lib/Button";
import QKeyboard_en_US from "./qKeyboard_en_US.json";
import Keyboard_ru_RU from "./keyboard_ru_RU.json";
import QKeyboard_tr_TR from "./qKeyboard_tr_TR.json";
import QKeyboardWithControl_tr_TR from "./qKeyboardWithControl_tr_TR.json";
import KeyboardWithControl_ru_RU from "./keyboardWithControl_ru_RU.json";
import QKeyboardWithSpecial_tr_TR from "./qKeyboardWithSpecial_tr_TR.json";
import QKeyboardWithSpecial_en_US from "./qKeyboardWithSpecial_en_US.json";
import KeyboardWithSpecial_ru_RU from "./keyboardWithSpecial_ru_RU.json";
import NumericKeyboard from "./NumericKeyboard.json";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import "./ScreenKeyboard.css";

export default class ScreenKeyboard extends ShallowComponent {

    static propTypes:Map = {
        /**
         * Input component to be worked on (Needs input's ID field)
         */
        inputId: React.PropTypes.string,
        /**
         * Keyboard buttons language. Possible values "en_US", "tr_TR", "ru_RU", "numeric".
         */
        language: React.PropTypes.oneOf([
            "en_US", "tr_TR", "ru_RU", "numeric"
        ]),
        /**
         * Click event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * Default display of ScreenKeyboard component (works only if has true inputID)
         */
        defaultShow: React.PropTypes.bool,
        /**
         * Displays your text top of Keyboard component
         */
        languageText: React.PropTypes.string,
        /**
         * Style of Keyboard container
         */
        style: React.PropTypes.object,
        /**
         * Display configuration on mobile devices
         */
        showOnMobile: React.PropTypes.any
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        language: "en_US",
        defaultShow: true
    };

    x_pos = 0;
    y_pos = 0;
    static idCounter = 1;
    languageAreaId;
    keyboardAreaId;

    constructor(props:Object) {
        super(props);
        this.languageAreaId = `LanguageArea-${ScreenKeyboard.idCounter}`;
        this.keyboardAreaId = `KeyboardArea-${ScreenKeyboard.idCounter}`;
        ScreenKeyboard.idCounter++;
        this.state = {
            upperCase: false,
            keySet: this.__decideLanguage(this.props.language),
            capsLock: false,
            show: this.props.defaultShow
        };
    }

    render():Object {

        if (!this.props.showOnMobile) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                return null;
        }

        let keyboardArea = this.props.language !== "numeric" ? "keyboardArea" : "keyboardAreaNumeric";
        if (this.state.show || !this.props.inputId)
            return (<div id={this.keyboardAreaId} className={keyboardArea} style={this.props.style}>
                <div id={this.languageAreaId} className="languageTextArea">{this.__convertLanguageText()}
                    {this.props.inputId ? <FaIcon
                        style={{cursor:"pointer"}}
                        className="pull-right"
                        code="fa-close" onClick={()=> this.setState({show:false})}/> : null}
                </div>
                <div id="keySet">
                    {this.__decideKeyboardType(this.props.language)}
                </div>
            </div>);
        else
            return null;
    }

    __renderQKeyboard() {
        let buttonSetArray = [];
        let keySet = this.state.keySet;

        for (let i = 0; i < keySet.length; i++) {
            let key = keySet[i];
            let value = this.state.upperCase ? this.props.language === "tr_TR" ? key.value.split("i").join("İ").toUpperCase() : key.value.toUpperCase() : key.value;
            let className = value === "" ? "buttons letterButtons emptyButton" : "buttons letterButtons";
            if (key.key === "14")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="buttons backspaceButton"
                                 onClick={this.__handleBackspaceClick}><FaIcon
                    code="fa-long-arrow-left"/></Button>);
            else if (key.key === "15")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="buttons qButton"
                                 onClick={()=>{this.__handleButtonClick(value)}}>{value}</Button>);
            else if (key.key === "28")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="buttons capsLockButton"
                                 onClick={this.__handleCapsLockClick}><FaIcon code="fa-chevron-up"/></Button>);
            else if (key.key === "40")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="buttons shiftButton"
                                 onClick={this.__handleShiftClick}>{value}</Button>);
            else if (key.key === "51")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="rightShiftButton"
                                 onClick={this.__handleShiftClick}>{value}</Button>);
            else if (key.key === "52" || key.key === "54")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="buttons"
                                 onClick={this.__handleControlClick}>{value}</Button>);
            else if (key.key === "53")
                buttonSetArray.push(<Button key={i} bsSize="sm" className="buttons spaceButton"
                                 onClick={()=>{this.__handleButtonClick(value)}}>{value}</Button>);
            else
                buttonSetArray.push(<Button key={i} bsSize="sm" className={className}
                                 onClick={()=>{this.__handleButtonClick(value)}}>{value}</Button>);
        }

        return buttonSetArray;
    };

    __renderNumericKeyboard() {
        let buttonSetArray = [];
        let keySet = this.state.keySet;

        for (let i = 0; i < keySet.length; i++) {
            let key = keySet[i];

            if (key.key === "14")
                buttonSetArray.push(<Button key="backspace" bsSize="sm" className="numericKeyboardBackSpace"
                                 onClick={this.__handleBackspaceClick}><FaIcon
                    code="fa-long-arrow-left"/></Button>);
            else {
                if (key.key === "4" || key.key === "7" || key.key === "10")
                    buttonSetArray.push(<br key={"br" + i}/>);

                buttonSetArray.push(<Button key={i} bsSize="sm" className="numericKeyboardNums"
                                 onClick={()=>{this.__handleButtonClick(key.value)}}>{key.value}</Button>);
            }
        }

        return buttonSetArray;
    };

    __handleBackspaceClick() {
        if (this.props.inputId) {
            let element = document.getElementById(this.props.inputId);
            if (element === undefined || element === null) {
                console.warn("Please use same or right ID field for your input.");
                return;
            }
            let value = element.value;
            let selectionStart = element.selectionStart;
            let selectionEnd = element.selectionEnd;

            let nextValue;
            let nextPosition;
            if (selectionStart === selectionEnd) {
                nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
                nextPosition = selectionStart - 1;
            } else {
                nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
                nextPosition = selectionStart;
            }
            nextPosition = (nextPosition > 0) ? nextPosition : 0;

            element.value = nextValue;

            this.setState({
                upperCase: this.state.capsLock,
                keySet: this.state.keySet !== NumericKeyboard ? this.__decideLanguage(this.props.language) : NumericKeyboard
            });

            if (this.props.onChange)
                this.props.onChange(nextValue, "BACKSPACE");

            setTimeout(() => {
                element.focus();
                element.setSelectionRange(nextPosition, nextPosition);
            }, 0);
        } else {
            if (this.props.onChange)
                this.props.onChange(undefined, "BACKSPACE");
        }
    };

    __handleButtonClick(key:string) {
        if (this.props.inputId) {
            let element = document.getElementById(this.props.inputId);
            if (element === undefined || element === null) {
                console.warn("Please use same or right ID field for your input.");
                return;
            }
            let value = element.value;
            let selectionStart = element.selectionStart;
            let selectionEnd = element.selectionEnd;

            const nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);
            element.value = nextValue;

            this.setState({
                upperCase: this.state.capsLock,
                keySet: this.state.keySet !== NumericKeyboard ? this.__decideLanguage(this.props.language) : NumericKeyboard
            });

            if (this.props.onChange)
                this.props.onChange(nextValue, key);

            setTimeout(() => {
                element.focus();
                element.setSelectionRange(selectionStart + 1, selectionStart + 1);
            }, 0);
        }
        else {
            if (this.props.onChange)
                this.props.onChange(undefined, key);
        }

    }

    __handleShiftClick() {
        this.setState({
            upperCase: this.state.capsLock ? true : !this.state.upperCase,
            keySet: this.state.keySet === this.__decideLanguage(this.props.language) ? this.__decideSpecialLanguage(this.props.language) : this.__decideLanguage(this.props.language)
        });
    };

    __handleCapsLockClick() {
        this.setState({upperCase: !this.state.upperCase, capsLock: !this.state.capsLock})
    };

    __handleControlClick() {
        if (this.props.language === "tr_TR" || this.props.language === "ru_RU") {
            this.setState({keySet: this.state.keySet === this.__decideControlLanguage(this.props.language) ? this.__decideSpecialLanguage(this.props.language) : this.__decideControlLanguage(this.props.language)});
        }
    };

    __decideKeyboardType(language) {
        if (language === "en_US" || language === "tr_TR" || language === "ru_RU")
            return this.__renderQKeyboard();
        else if (language === "numeric")
            return this.__renderNumericKeyboard();
        else
            return this.__renderQKeyboard();
    };

    __decideLanguage(language:string) {
        if (language === "en_US")
            return QKeyboard_en_US;
        else if (language === "tr_TR")
            return QKeyboard_tr_TR;
        else if (language === "ru_RU")
            return Keyboard_ru_RU;
        else if (language === "numeric")
            return NumericKeyboard;
        else
            return QKeyboard_en_US;
    };

    __decideSpecialLanguage(language:string) {
        if (language === "en_US")
            return QKeyboardWithSpecial_en_US;
        else if (language === "tr_TR")
            return QKeyboardWithSpecial_tr_TR;
        else if (language === "ru_RU")
            return KeyboardWithSpecial_ru_RU;
        else if (language === "numeric")
            return NumericKeyboard;
        else
            return QKeyboardWithSpecial_en_US;
    };

    __decideControlLanguage(language:string) {
        if (language === "tr_TR")
            return QKeyboardWithControl_tr_TR;
        else if (language === "ru_RU")
            return KeyboardWithControl_ru_RU;
        else
            return QKeyboardWithControl_tr_TR;
    };

    __convertLanguageText():string {
        let language = this.props.language;
        if (language === "en_US")
            return this.props.languageText || "English";
        else if (language === "tr_TR")
            return this.props.languageText || "Türkçe";
        else if (language === "ru_RU")
            return this.props.languageText || "русский";
        else if (language === "numeric")
            return this.props.languageText || "Num";
    };

    __hideKeyboard(e:Object) {
        let target = e.target;
        let element;
        if (this.props.inputId) {
            element = document.getElementById(this.props.inputId);
            if (element === undefined || element === null)
                return;

            if (this.state.show) {
                try {
                    if (target.id === this.keyboardAreaId || target.id === "keySet" || target.id === element.id || target.parentNode.id === "keySet"
                        || target.parentNode.parentNode.id === this.keyboardAreaId || target.parentNode.type === "button" || target.id === this.languageAreaId) {
                        return;
                    }
                } catch (exeption) {
                    // no problem
                }
                this.setState({
                    show: false
                });
            }
            else if (target.id === element.id) {
                this.setState({show: true});
                let element = document.getElementById(this.languageAreaId);
                if (element === undefined || element === null)
                    return;

                element.addEventListener('mousedown', this.__mouseDown, false);
                document.addEventListener('mouseup', this.__mouseUp, false);
            }
        }
    };

    __keyboardMove(e) {
        var div = document.getElementById(this.keyboardAreaId);
        div.style.position = "absolute";
        div.style.top = (e.clientY - this.y_pos) + 'px';
        div.style.left = (e.clientX - this.x_pos) + 'px';
    };

    __mouseUp() {
        document.removeEventListener('mousemove', this.__keyboardMove, true);
    };

    __mouseDown(e) {
        var div = document.getElementById(this.keyboardAreaId);
        this.x_pos = e.clientX - div.offsetLeft;
        this.y_pos = e.clientY - div.offsetTop;
        document.addEventListener('mousemove', this.__keyboardMove, true);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({keySet: this.__decideLanguage(nextProps.language)});
    };

    componentDidMount() {
        if (this.props.inputId) {
            document.addEventListener("click", this.__hideKeyboard, false);
        }

        let element = document.getElementById(this.languageAreaId);
        if (element === undefined || element === null)
            return;

        element.addEventListener('mousedown', this.__mouseDown, false);
        document.addEventListener('mouseup', this.__mouseUp, false);
    };

    componentWillUnmount() {
        if (this.props.inputId) {
            document.removeEventListener("click", this.__hideKeyboard, false);
        }
    };
}
