import React from "react";
import ReactDOM from "react-dom";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Popover, Overlay, Tooltip, Col} from "react-bootstrap";
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
         * Default value of Slider component (If has range prop defaultValue must array like {[0,100]}).
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
         * After Change event for the component.
         */
        onAfterChange: React.PropTypes.func,
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
        unit: React.PropTypes.string,
        /**
         * Tooltip support for component.
         */
        closeTooltip: React.PropTypes.bool
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
        unit: "",
        closeTooltip: false
    };

    static counter = 1;
    downEvent = "mousedown";
    upEvent = "mouseup";
    moveEvent = "mousemove";
    click = false;
    selectedDivRef;
    layerDivRef;
    circleDivMaxRef;
    circleDivMinRef;
    currentClassName;

    constructor(props:Object) {
        super(props);
        this.selectedDivRef = `SliderSelectedDiv-${Slider.counter}`;
        this.layerDivRef = `SliderLayerDiv-${Slider.counter}`;
        this.circleDivMaxRef = `SliderCircleDivMax-${Slider.counter}`;
        this.circleDivMinRef = `SliderCircleDivMin-${Slider.counter}`;
        Slider.counter++;
        this.state = {
            valueMax: this.props.range ? this.props.defaultValue ? this.props.defaultValue[1] : this.props.minValue : this.props.defaultValue || this.props.minValue,
            valueMin: this.props.range ? this.props.defaultValue ? this.props.defaultValue[0] : this.props.minValue : this.props.defaultValue || this.props.minValue,
            defaultMaxPx: 0,
            defaultMinPx: 0,
            openMaxDesc: false,
            openMinDesc: false,
            disabled: this.props.disabled,
            unit: this.props.unit
        };
    }

    render():Object {

        let classNameSelected = !this.state.disabled ? "sliderSelectedArea" : "sliderSelectedAreaDisabled";
        let classNameCircle = !this.state.disabled ? "sliderButtonMax" : "sliderButtonMaxDisabled";
        let classNameCircleMin = !this.state.disabled ? "sliderButtonMin" : "sliderButtonMinDisabled";
        let classNameLayer = !this.state.disabled ? "sliderLayer" : "sliderLayerDisabled";

        let styleLeft = this.props.range ? parseFloat(this.state.defaultMinPx) : 0;
        let styleWidth = this.props.range ? parseFloat(this.state.defaultMaxPx) - parseFloat(this.state.defaultMinPx) : parseFloat(this.state.defaultMaxPx);

        return (<span>
            {this.props.closeTooltip ? null :
                <span><Overlay show={this.state.openMaxDesc}
                               placement="top"
                               container={this.circleMaxDOM}
                               target={this.circleMaxDOM}>
          <Tooltip id="sliderPopover">{this.state.valueMax + " " + this.state.unit}</Tooltip>
        </Overlay>
            <Overlay show={this.state.openMinDesc}
                     placement="top"
                     container={this.circleMinDOM}
                     target={this.circleMinDOM}>
          <Tooltip id="sliderPopover">{this.state.valueMin + " " + this.state.unit}</Tooltip>
        </Overlay></span>}
            <Col className="sliderContainer">
            <Col ref={this.selectedDivRef} className={classNameSelected}
                 style={{left: styleLeft, width: styleWidth}}
                 onClick={!this.state.disabled ? this.__layerClick : null}/>
            <Col ref={this.layerDivRef} className={classNameLayer}
                 onClick={!this.state.disabled ? this.__layerClick : null}/>
            <Col ref={this.circleDivMaxRef} className={classNameCircle}
                 style={{left: parseFloat(this.state.defaultMaxPx)}}
                 onMouseOver={()=> this.setState({openMaxDesc: true, openMinDesc: false})}
                 onMouseLeave={this.__closeLabelOnMouseLeave}>
            </Col>
                {this.props.range ?
                    <Col ref={this.circleDivMinRef} className={classNameCircleMin}
                         style={{left: this.state.defaultMinPx}}
                         onMouseOver={()=> this.setState({openMinDesc: true, openMaxDesc: false})}
                         onMouseLeave={this.__closeLabelOnMouseLeave}>
                    </Col> : null}
                {!this.props.closeLabel ?
                    <span>
                        <span
                            className="pull-left sliderLabel">{this.props.minLabel ? this.props.minLabel : this.props.minValue}</span>
                        <span
                            className="pull-right sliderLabel">{this.props.maxLabel ? this.props.maxLabel : this.props.maxValue}</span>
                    </span> : null}
        </Col>
        </span>);
    }

    __calculateStyles(e:Object) {
        var selected = this.selectedDOM;
        var circle = this.circleMaxDOM;
        var layer = this.layerDOM;
        let pageX = this.moveEvent === "mousemove" ? e.clientX : this.click ? e.clientX : e.touches[0].pageX;
        let calculatedPosition = parseInt(pageX - selected.getBoundingClientRect().left);
        let afterChangeValue;

        if (!this.props.step) {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth)
                afterChangeValue = this.__changeStylesWithoutRange(e, calculatedPosition, selected, circle, layer);
        }
        else {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth) {
                let steps = layer.offsetWidth / (this.props.maxValue - this.props.minValue) * this.props.step;
                let halfOfSteps = steps / 2;
                for (let i = 0; i <= parseInt(layer.offsetWidth); i += steps) {
                    let halfOfStep = i + halfOfSteps;
                    if (calculatedPosition >= i && calculatedPosition <= i + steps) {
                        if (calculatedPosition < halfOfStep)
                            afterChangeValue = this.__changeStylesWithoutRange(e, i, selected, circle, layer);
                        else if (calculatedPosition > halfOfStep)
                            afterChangeValue = this.__changeStylesWithoutRange(e, i + steps, selected, circle, layer);
                    }
                }
            }
        }

        return afterChangeValue;
    };

    __calculateStylesWithRange(e:Object) {
        var selected = this.selectedDOM;
        var circleMax = this.circleMaxDOM;
        var circleMin = this.circleMinDOM;
        var layer = this.layerDOM;
        let pageX = this.moveEvent === "mousemove" ? e.clientX : this.click ? e.clientX : e.touches[0].pageX;
        let calculatedPosition = parseInt(pageX - layer.getBoundingClientRect().left);
        let onAfterChangeValue;

        if (!this.props.step) {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth) {

                if (this.currentClassName.startsWith("sliderButtonMin")) {
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
                        if (lastValue > this.state.valueMax) {
                            e.target.value = [this.state.valueMax, lastValue];
                            e.target.parsedValue = [this.state.valueMax, lastValue];
                            onAfterChangeValue = [this.state.valueMax, lastValue];
                            this.props.onChange(e);
                        }
                        else {
                            e.target.value = [lastValue, this.state.valueMax];
                            e.target.parsedValue = [lastValue, this.state.valueMax];
                            onAfterChangeValue = [lastValue, this.state.valueMax];
                            this.props.onChange(e);
                        }
                    }

                    this.setState({valueMin: lastValue});

                    return onAfterChangeValue;
                }
                if (this.currentClassName.startsWith("sliderButtonMax")) {
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
                        if (lastValue < this.state.valueMin) {
                            e.target.value = [lastValue, this.state.valueMin];
                            e.target.parsedValue = [lastValue, this.state.valueMin];
                            onAfterChangeValue = [lastValue, this.state.valueMin];
                            this.props.onChange(e);
                        }
                        else {
                            e.target.value = [this.state.valueMin, lastValue];
                            e.target.parsedValue = [this.state.valueMin, lastValue];
                            onAfterChangeValue = [this.state.valueMin, lastValue];
                            this.props.onChange(e);
                        }
                    }

                    this.setState({valueMax: lastValue});

                    return onAfterChangeValue;
                }
            }
        }
        else {
            if (calculatedPosition >= 0 && calculatedPosition <= layer.offsetWidth) {
                let steps = layer.offsetWidth / (this.props.maxValue - this.props.minValue) * this.props.step;
                let halfOfSteps = steps / 2;
                for (let i = 0; i <= parseInt(layer.offsetWidth); i += steps) {
                    let halfOfStep = i + halfOfSteps;
                    if (this.currentClassName.startsWith("sliderButtonMin")) {
                        if (calculatedPosition >= i && calculatedPosition <= i + steps) {
                            if (calculatedPosition < halfOfStep)
                                onAfterChangeValue = this.__changeStylesWithRangeAndStep(e, selected, layer, circleMin, circleMax, i, "min");
                            else if (calculatedPosition > halfOfStep)
                                onAfterChangeValue = this.__changeStylesWithRangeAndStep(e, selected, layer, circleMin, circleMax, i + steps, "min");

                            if (parseInt(circleMin.style.left) >= parseInt(circleMax.style.left)) {
                                selected.style.left = parseFloat(circleMax.style.left) + 'px';
                                selected.style.width = (parseFloat(circleMin.style.left) - parseFloat(circleMax.style.left)) + 'px';
                            }
                        }
                    }
                    if (this.currentClassName.startsWith("sliderButtonMax")) {
                        if (calculatedPosition >= i && calculatedPosition <= i + steps) {
                            if (calculatedPosition < halfOfStep)
                                onAfterChangeValue = this.__changeStylesWithRangeAndStep(e, selected, layer, circleMin, circleMax, i, "max");
                            else if (calculatedPosition > halfOfStep)
                                onAfterChangeValue = this.__changeStylesWithRangeAndStep(e, selected, layer, circleMin, circleMax, i + steps, "max");

                            if (parseInt(circleMin.style.left) >= parseInt(circleMax.style.left)) {
                                selected.style.left = parseFloat(circleMax.style.left) + 'px';
                                selected.style.width = (parseFloat(circleMin.style.left) - parseFloat(circleMax.style.left)) + 'px';
                            }
                        }
                    }
                }
                return onAfterChangeValue;
            }
        }
    };

    __changeStylesWithRangeAndStep(e, selected, layer, circleMin, circleMax, step, state) {
        let decideState;

        if (state === "min") {
            circleMin.style.left = step + 'px';
            decideState = "valueMin";
        }
        else {
            circleMax.style.left = step + 'px';
            decideState = "valueMax";
        }

        selected.style.width = (parseFloat(circleMax.style.left) - parseFloat(circleMin.style.left)) + 'px';
        selected.style.left = parseFloat(circleMin.style.left) + 'px';

        let calculateValue = layer.offsetWidth / (this.props.maxValue - this.props.minValue);
        let newValue = step / calculateValue;
        let lastValue = this.props.step && this.__isFloat(this.props.step) ? parseFloat(this.props.minValue + newValue).toFixed((this.props.step).toString().split(".")[1].length) : Math.round(this.props.minValue + newValue);

        let decideMin = decideState === "valueMin" ? lastValue : this.state.valueMin;
        let decideMax = decideState === "valueMax" ? lastValue : this.state.valueMax;
        if (this.props.onChange && decideMin !== this.state.valueMin || this.props.onChange && decideMax !== this.state.valueMax) {
            if (decideMin > decideMax) {
                e.target.value = [decideMax, decideMin];
                e.target.parsedValue = [decideMax, decideMin];
                this.props.onChange(e);
            }
            else {
                e.target.value = [decideMin, decideMax];
                e.target.parsedValue = [decideMin, decideMax];
                this.props.onChange(e);
            }
        }

        this.setState({[decideState]: lastValue});

        return e.target.value;
    };

    __changeStylesWithoutRange(e, calculatedPosition, selected, circle, layer) {
        selected.style.width = calculatedPosition + 'px';
        circle.style.left = calculatedPosition + 'px';
        let calculateValue = layer.offsetWidth / (this.props.maxValue - this.props.minValue);
        let newValue = calculatedPosition / calculateValue;
        let lastValue = this.props.step && this.__isFloat(this.props.step) ? parseFloat(this.props.minValue + newValue).toFixed((this.props.step).toString().split(".")[1].length) : Math.round(this.props.minValue + newValue);

        if (this.props.onChange && this.state.valueMax != lastValue) {
            e.target.value = lastValue;
            e.target.parsedValue = lastValue;
            this.props.onChange(e);
        }

        this.setState({valueMax: lastValue});

        return lastValue;
    };

    __calculateDefault(type:string) {
        let range = type === "min" ? 0 : 1;
        let defaultValue = this.props.range ? this.props.defaultValue ? this.props.defaultValue[range] : this.props.minValue : this.props.defaultValue ? this.props.defaultValue : (this.props.minValue || 0);
        var layer = this.layerDOM;
        if (layer !== undefined && layer !== null) {
            let calculatePosition = Math.round(parseFloat((((layer.offsetWidth * defaultValue) / (this.props.maxValue - this.props.minValue)) - ((layer.offsetWidth / (this.props.maxValue - this.props.minValue)) * this.props.minValue)).toFixed(2)));
            return calculatePosition + "px";
        }
    };

    __layerClick(e:Object) {
        e.preventDefault();
        this.click = true;
        let onAfterChangeValue;
        if (!this.props.range) {
            onAfterChangeValue = this.__calculateStyles(e);

            if (this.props.onAfterChange) {
                e.target.value = onAfterChangeValue;
                e.target.parsedValue = onAfterChangeValue;
                this.props.onAfterChange(e);
            }
        }
        else if (this.props.range) {
            onAfterChangeValue = this.__calculateStylesWithRange(e);

            if (this.props.onAfterChange) {
                e.target.value = onAfterChangeValue;
                e.target.parsedValue = onAfterChangeValue;
                this.props.onAfterChange(e);
            }
        }

        if (!this.props.range)
            this.setState({openMaxDesc: true});
        else
            this.setState({openMinDesc: true, openMaxDesc: true});
    };

    __circleDivMove(e:Object) {
        this.click = false;
        if (!this.props.range)
            this.__calculateStyles(e);
        else if (this.props.range)
            this.__calculateStylesWithRange(e);
    };

    __closeLabelOnMouseLeave() {
        if ((this.tempRefMax === null || this.tempRefMax === undefined) || (this.tempRefMin === null || this.tempRefMin === undefined))
            this.setState({openMaxDesc: false, openMinDesc: false});
        else return null;
    };

    __isFloat(n:number):boolean {
        return Number(n) === n && n % 1 !== 0;
    }

    __mouseUp(e) {
        if (!this.props.range && this.refs[this.circleDivMaxRef]) {
            if (this.props.onAfterChange) {
                if (this.tempRefMax == this.circleDivMaxRef) {
                    e.target.value = this.state.valueMax;
                    e.target.parsedValue = this.state.valueMax;
                    this.props.onAfterChange(e);
                }
            }
            this.setState({openMaxDesc: false});
        }
        else if (this.props.range && this.refs[this.circleDivMinRef]) {
            if (this.props.onAfterChange) {
                if (this.tempRefMax == this.circleDivMaxRef && this.tempRefMin == this.circleDivMinRef) {
                    if (this.state.valueMin > this.state.valueMax) {
                        e.target.value = [this.state.valueMax, this.state.valueMin];
                        e.target.parsedValue = [this.state.valueMax, this.state.valueMin];
                        this.props.onAfterChange(e);
                    }
                    else {
                        e.target.value = [this.state.valueMin, this.state.valueMax];
                        e.target.parsedValue = [this.state.valueMin, this.state.valueMax];
                        this.props.onAfterChange(e);
                    }
                }
            }
            this.setState({openMinDesc: false, openMaxDesc: false});
        }

        this.tempRefMax = null;
        this.tempRefMin = null;
        document.removeEventListener(this.moveEvent, this.__circleDivMove, true);

    };

    __mouseDown(e:Object) {
        e.preventDefault();
        this.currentClassName = e.target.className;

        if (!this.props.range && this.refs[this.circleDivMaxRef])
            this.setState({openMaxDesc: true});
        else if (this.props.range && this.refs[this.circleDivMinRef]) {
            if (this.currentClassName.startsWith("sliderButtonMin"))
                this.setState({openMinDesc: true, openMaxDesc: false});
            else
                this.setState({openMinDesc: false, openMaxDesc: true});
        }

        this.tempRefMax = this.circleDivMaxRef;
        this.tempRefMin = this.circleDivMinRef;
        document.addEventListener(this.moveEvent, this.__circleDivMove, true);
    };

    __resize() {
        if (!this.props.range && this.refs[this.circleDivMaxRef] && this.refs[this.selectedDivRef] && this.refs[this.layerDivRef])
            this.setState({
                defaultMaxPx: this.__calculateDefault("max")
            });
        else if (this.props.range && this.refs[this.circleDivMaxRef] && this.refs[this.circleDivMinRef] && this.refs[this.selectedDivRef] && this.refs[this.layerDivRef])
            this.setState({
                defaultMaxPx: this.__calculateDefault("max"),
                defaultMinPx: this.__calculateDefault("min")
            });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: nextProps.disabled,
            unit: nextProps.unit
        });
    };

    componentDidMount() {
        this.circleMaxDOM = ReactDOM.findDOMNode(this.refs[this.circleDivMaxRef]);
        this.circleMinDOM = ReactDOM.findDOMNode(this.refs[this.circleDivMinRef]);
        this.selectedDOM = ReactDOM.findDOMNode(this.refs[this.selectedDivRef]);
        this.layerDOM = ReactDOM.findDOMNode(this.refs[this.layerDivRef]);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.downEvent = "touchstart";
            this.upEvent = "touchend";
            this.moveEvent = "touchmove";
        }

        if (!this.state.disabled) {
            this.circleMaxDOM.addEventListener(this.downEvent, this.__mouseDown, false);
            if (this.props.range) {
                this.circleMinDOM.addEventListener(this.downEvent, this.__mouseDown, false);
                this.currentClassName = this.circleMinDOM.className;
            }
            document.addEventListener(this.upEvent, this.__mouseUp, false);
        }

        window.addEventListener("resize", this.__resize, true);

        this.setState({
            defaultMaxPx: this.__calculateDefault("max"),
            defaultMinPx: this.__calculateDefault("min")
        });
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.__resize, true);
        document.removeEventListener(this.downEvent, this.__mouseDown, true);
        document.removeEventListener(this.upEvent, this.__mouseUp, true);
    };
}
