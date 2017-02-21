import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Popover, Overlay, Tooltip} from "react-bootstrap";
import "./Slider.css";

export default class Slider extends ShallowComponent {

    static propTypes:Map = {
        /**
         * Maximum value of Slider component.
         */
        maxValue: React.PropTypes.number,
        /**
         * Minimum value of Slider component.
         */
        minValue: React.PropTypes.number,
        /**
         * Default value of Slider component (If has range prop value must array like {[0,100]}).
         */
        defaultValue: React.PropTypes.number,
        /**
         * Increment or decrement of values.
         */
        step: React.PropTypes.number,
        /**
         * Disables component.
         */
        disabled: React.PropTypes.bool,
        /**
         * Range support for slider component.
         */
        range: React.PropTypes.bool,
        /**
         * Change event for the component.
         */
        onChange: React.PropTypes.func,
        /**
         * Close of min-max labels.
         */
        closeLabel: React.PropTypes.bool,
        /**
         * Label of maximum value.
         */
        maxLabel: React.PropTypes.string,
        /**
         * Label of minimum value.
         */
        minLabel: React.PropTypes.string,
        /**
         * Unit of popover content.
         */
        unit: React.PropTypes.string
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        maxValue: 100,
        minValue: 0,
        disabled: false,
        closeLabel: false,
        unit: ""
    };

    static idCounter = 1;
    downEvent = "mousedown";
    upEvent = "mouseup";
    moveEvent = "mousemove";
    click = false;
    selectedDiv;
    layerDiv;
    circleDivMax;
    circleDivMin;
    id;

    constructor(props:Object) {
        super(props);
        this.selectedDiv = `SliderSelectedDiv-${Slider.idCounter}`;
        this.layerDiv = `SliderLayerDiv-${Slider.idCounter}`;
        this.circleDivMax = `SliderCircleDivMax-${Slider.idCounter}`;
        this.circleDivMin = `SliderCircleDivMin-${Slider.idCounter}`;
        Slider.idCounter++;
        this.state = {
            valueMax: this.props.range ? this.props.defaultValue ? this.props.defaultValue[1] : this.props.minValue : this.props.defaultValue || this.props.minValue,
            valueMin: this.props.range ? this.props.defaultValue ? this.props.defaultValue[0] : this.props.minValue : this.props.defaultValue || this.props.minValue,
            defaultValueMax: 0,
            defaultValueMin: 0,
            openMaxDesc: false,
            openMinDesc: false,
            disabled: this.props.disabled
        };
    }

    render():Object {

        let classNameSelected = !this.state.disabled ? "sliderSelectedArea" : "sliderSelectedAreaDisabled";
        let classNameCircle = !this.state.disabled ? "sliderButton" : "sliderButtonDisabled";
        let classNameCircleMin = !this.state.disabled ? "sliderButtonMin" : "sliderButtonMinDisabled";
        let classNameLayer = !this.state.disabled ? "sliderLayer" : "sliderLayerDisabled";

        let styleLeft = this.props.range ? parseFloat(this.state.defaultValueMin) : 0;
        let styleWidth = this.props.range ? parseFloat(this.state.defaultValueMax) - parseFloat(this.state.defaultValueMin) : parseFloat(this.state.defaultValueMax);

        return (<span>
            <Overlay show={this.state.openMaxDesc}
                     placement="top"
                     container={document.getElementById(this.circleDivMax)}
                     target={document.getElementById(this.circleDivMax)}>
          <Tooltip id="sliderPopover">{this.state.valueMax + " " + this.props.unit}</Tooltip>
        </Overlay>
            <Overlay show={this.state.openMinDesc}
                     placement="top"
                     container={document.getElementById(this.circleDivMin)}
                     target={document.getElementById(this.circleDivMin)}>
          <Tooltip id="sliderPopover">{this.state.valueMin + " " + this.props.unit}</Tooltip>
        </Overlay>
            <div className="sliderContainer">
            <div id={this.selectedDiv} className={classNameSelected}
                 style={{left: styleLeft, width: styleWidth}}
                 onClick={!this.state.disabled ? this.__layerClick : null}></div>
            <div id={this.layerDiv} className={classNameLayer}
                 onClick={!this.state.disabled ? this.__layerClick : null}></div>
            <div id={this.circleDivMax} className={classNameCircle}
                 style={{left: parseFloat(this.state.defaultValueMax)}}
                 onMouseOver={()=> this.setState({openMaxDesc: true, openMinDesc: false})}
                 onMouseDown={()=> this.setState({openMaxDesc: true, openMinDesc: false})}
                 onMouseUp={()=> this.setState({openMaxDesc: false, openMinDesc: false})}>
            </div>
                {this.props.range ?
                    <div id={this.circleDivMin} className={classNameCircleMin}
                         style={{left: this.state.defaultValueMin}}
                         onMouseOver={()=> this.setState({openMinDesc: true, openMaxDesc: false})}
                         onMouseDown={()=> this.setState({openMinDesc: true, openMaxDesc: false})}
                         onMouseUp={()=> this.setState({openMinDesc: false, openMaxDesc: false})}>
                    </div> : null}
                {!this.props.closeLabel ?
                    <span>
                        <span className="pull-left sliderLabel">{this.props.minLabel ? this.props.minLabel : this.props.minValue}</span>
                        <span className="pull-right sliderLabel">{this.props.maxLabel ? this.props.maxLabel : this.props.maxValue}</span>
                    </span> : null}
        </div>
        </span>);
    }

    __calculateStyles(e:Object) {
        var selected = document.getElementById(this.selectedDiv);
        var circle = document.getElementById(this.circleDivMax);
        var layer = document.getElementById(this.layerDiv);
        let pageX = this.moveEvent === "mousemove" ? e.clientX : this.click ? e.clientX : e.touches[0].pageX;
        let calculatedPosition = parseInt(pageX - selected.getBoundingClientRect().left);

        if (!this.props.step) {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth)
                this.__changeStyles(calculatedPosition, selected, circle, layer);
        }
        else {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth) {
                let steps = layer.offsetWidth / (this.props.maxValue - this.props.minValue) * this.props.step;
                let halfOfSteps = steps / 2;
                for (let i = 0; i <= parseInt(layer.offsetWidth); i += steps) {
                    let halfOfStep = i + halfOfSteps;
                    if (calculatedPosition >= i && calculatedPosition <= i + steps) {
                        if (calculatedPosition < halfOfStep)
                            this.__changeStyles(i, selected, circle, layer);
                        else if (calculatedPosition > halfOfStep)
                            this.__changeStyles(i + steps, selected, circle, layer);
                    }
                }
            }
        }
    };

    __calculateStylesWithRange(e:Object) {
        var selected = document.getElementById(this.selectedDiv);
        var circleMax = document.getElementById(this.circleDivMax);
        var circleMin = document.getElementById(this.circleDivMin);
        var layer = document.getElementById(this.layerDiv);
        let pageX = this.moveEvent === "mousemove" ? e.clientX : this.click ? e.clientX : e.touches[0].pageX;
        let calculatedPosition = parseInt(pageX - layer.getBoundingClientRect().left);

        if (!this.props.step) {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth) {

                if (this.id.startsWith("SliderCircleDivMin")) {
                    circleMin.style.left = calculatedPosition + 'px';
                    if (parseInt(circleMin.style.left) >= parseInt(circleMax.style.left)) {
                        selected.style.left = parseFloat(circleMax.style.left) + 'px';
                        selected.style.width = (parseFloat(circleMin.style.left) - parseFloat(circleMax.style.left)) + 'px';
                    }
                    else {
                        selected.style.left = parseFloat(circleMin.style.left) + 'px';
                        selected.style.width = (parseFloat(circleMax.style.left) - calculatedPosition) + 'px';
                    }
                    let calculateValue = layer.offsetWidth / (this.props.maxValue - this.props.minValue);
                    let newValue = calculatedPosition / calculateValue;
                    let lastValue = this.props.step && this.__isFloat(this.props.step) ? parseFloat(this.props.minValue + newValue).toFixed((this.props.step).toString().split(".")[1].length) : Math.round(this.props.minValue + newValue);

                    if (this.props.onChange && lastValue !== this.state.valueMin) {
                        if (lastValue > this.state.valueMax)
                            this.props.onChange([this.state.valueMax, lastValue]);
                        else
                            this.props.onChange([lastValue, this.state.valueMax]);
                    }

                    this.setState({valueMin: lastValue});
                }
                if (this.id.startsWith("SliderCircleDivMax")) {
                    circleMax.style.left = (calculatedPosition) + 'px';
                    if (parseInt(circleMin.style.left) <= parseInt(circleMax.style.left)) {
                        selected.style.left = parseFloat(circleMin.style.left) + 'px';
                        selected.style.width = (parseFloat(circleMax.style.left) - parseFloat(circleMin.style.left)) + 'px';
                    }
                    else {
                        selected.style.left = parseFloat(circleMax.style.left) + 'px';
                        selected.style.width = (parseFloat(circleMin.style.left) - calculatedPosition) + 'px';
                    }
                    let calculateValue = layer.offsetWidth / (this.props.maxValue - this.props.minValue);
                    let newValue = calculatedPosition / calculateValue;
                    let lastValue = this.props.step && this.__isFloat(this.props.step) ? parseFloat(this.props.minValue + newValue).toFixed((this.props.step).toString().split(".")[1].length) : Math.round(this.props.minValue + newValue);

                    if (this.props.onChange && lastValue !== this.state.valueMax) {
                        if (lastValue < this.state.valueMin)
                            this.props.onChange([lastValue, this.state.valueMin]);
                        else
                            this.props.onChange([this.state.valueMin, lastValue]);
                    }

                    this.setState({valueMax: lastValue});
                }
            }
        }
        else {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth) {
                let steps = layer.offsetWidth / (this.props.maxValue - this.props.minValue) * this.props.step;
                let halfOfSteps = steps / 2;
                for (let i = 0; i <= parseInt(layer.offsetWidth); i += steps) {
                    let halfOfStep = i + halfOfSteps;
                    if (this.id.startsWith("SliderCircleDivMin")) {
                        if (calculatedPosition >= i && calculatedPosition <= i + steps) {
                            if (calculatedPosition < halfOfStep) {
                                circleMin.style.left = i + 'px';
                                this.__changeStylesWithRange(selected, layer, circleMin, circleMax, i, "min");
                            }
                            else if (calculatedPosition > halfOfStep) {
                                circleMin.style.left = (i + steps) + 'px';
                                this.__changeStylesWithRange(selected, layer, circleMin, circleMax, i + steps, "min");
                            }

                            if (parseInt(circleMin.style.left) >= parseInt(circleMax.style.left)) {
                                selected.style.left = parseFloat(circleMax.style.left) + 'px';
                                selected.style.width = (parseFloat(circleMin.style.left) - parseFloat(circleMax.style.left)) + 'px';
                            }
                        }
                    }
                    if (this.id.startsWith("SliderCircleDivMax")) {
                        if (calculatedPosition >= i && calculatedPosition <= i + steps) {
                            if (calculatedPosition < halfOfStep) {
                                circleMax.style.left = i + 'px';
                                this.__changeStylesWithRange(selected, layer, circleMin, circleMax, i, "max");
                            }
                            else if (calculatedPosition > halfOfStep) {
                                circleMax.style.left = (i + steps) + 'px';
                                this.__changeStylesWithRange(selected, layer, circleMin, circleMax, i + steps, "max");
                            }

                            if (parseInt(circleMin.style.left) >= parseInt(circleMax.style.left)) {
                                selected.style.left = parseFloat(circleMax.style.left) + 'px';
                                selected.style.width = (parseFloat(circleMin.style.left) - parseFloat(circleMax.style.left)) + 'px';
                            }
                        }
                    }
                }
            }
        }
    };

    __changeStylesWithRange(selected, layer, circleMin, circleMax, step, state) {
        let decideState = state === "min" ? "valueMin" : "valueMax";
        selected.style.width = (parseFloat(circleMax.style.left) - parseFloat(circleMin.style.left)) + 'px';
        selected.style.left = parseFloat(circleMin.style.left) + 'px';
        let calculateValue = layer.offsetWidth / (this.props.maxValue - this.props.minValue);
        let newValue = step / calculateValue;
        let lastValue = this.props.step && this.__isFloat(this.props.step) ? parseFloat(this.props.minValue + newValue).toFixed((this.props.step).toString().split(".")[1].length) : Math.round(this.props.minValue + newValue);

        let decideMin = decideState === "valueMin" ? lastValue : this.state.valueMin;
        let decideMax = decideState === "valueMax" ? lastValue : this.state.valueMax;
        if (this.props.onChange && decideMin !== this.state.valueMin || this.props.onChange && decideMax !== this.state.valueMax) {
            if (decideMin > decideMax)
                this.props.onChange([decideMax, decideMin]);
            else
                this.props.onChange([decideMin, decideMax]);
        }

        this.setState({[decideState]: lastValue});
    };

    __changeStyles(calculatedPosition, selected, circle, layer) {
        selected.style.width = calculatedPosition + 'px';
        circle.style.left = calculatedPosition + 'px';
        let calculateValue = layer.offsetWidth / (this.props.maxValue - this.props.minValue);
        let newValue = calculatedPosition / calculateValue;
        let lastValue = this.props.step && this.__isFloat(this.props.step) ? parseFloat(this.props.minValue + newValue).toFixed((this.props.step).toString().split(".")[1].length) : Math.round(this.props.minValue + newValue);

        if (this.props.onChange && this.state.valueMax != lastValue)
            this.props.onChange(lastValue);

        this.setState({valueMax: lastValue});
    };

    __calculateDefault(type:string) {
        let range = type === "min" ? 0 : 1;
        let defaultValue = this.props.range ? this.props.defaultValue ? this.props.defaultValue[range] : this.props.minValue : this.props.defaultValue ? this.props.defaultValue : (this.props.minValue || 0);
        var layer = document.getElementById(this.layerDiv);
        let calculatePosition = Math.round(parseFloat((((layer.offsetWidth * defaultValue) / (this.props.maxValue - this.props.minValue)) - ((layer.offsetWidth / (this.props.maxValue - this.props.minValue)) * this.props.minValue)).toFixed(2)));
        return calculatePosition + "px";
    };

    __layerClick(e:Object) {
        e.preventDefault();
        this.click = true;
        if (!this.props.range)
            this.__calculateStyles(e);
        else if (this.props.range)
            this.__calculateStylesWithRange(e);
    };

    __circleDivMove(e:Object) {
        this.click = false;
        if (!this.props.range)
            this.__calculateStyles(e);
        else if (this.props.range)
            this.__calculateStylesWithRange(e);
    };

    __isFloat(n:number):boolean {
        return Number(n) === n && n % 1 !== 0;
    }

    __mouseUp() {
        document.removeEventListener(this.moveEvent, this.__circleDivMove, true);
    };

    __mouseDown(e:Object) {
        e.preventDefault();
        document.addEventListener(this.moveEvent, this.__circleDivMove, true);
        this.id = e.target.id;
    };

    componentDidMount() {
        let circleDivMax = document.getElementById(this.circleDivMax);
        let circleDivMin = document.getElementById(this.circleDivMin);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.downEvent = "touchstart";
            this.upEvent = "touchend";
            this.moveEvent = "touchmove";
        }

        if (!this.state.disabled) {
            circleDivMax.addEventListener(this.downEvent, this.__mouseDown, false);
            if (this.props.range) {
                circleDivMin.addEventListener(this.downEvent, this.__mouseDown, false);
                this.id = this.circleDivMin;
            }
            document.addEventListener(this.upEvent, this.__mouseUp, false);
        }

        this.setState({
            defaultValueMax: this.__calculateDefault("max"),
            defaultValueMin: this.__calculateDefault("min")
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: nextProps.disabled
        });
    };

}
