import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {
    Table,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import momentjs from "moment";
import "./TimePicker.css";

export default class TimePicker extends ShallowComponent {

    static propTypes:Map = {
        /**
         * Value of the component
         */
        value: React.PropTypes.number,
        /**
         * name use as input field name
         */
        name: React.PropTypes.string,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Change event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * Select event for the component. Triggered at date select.
         */
        onSelect: React.PropTypes.func,

        /**
         *  Max width of component
         */
        maxWidth: React.PropTypes.number,

        /**
         *  Base CSS class and prefix for the component
         */
        className: React.PropTypes.string
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        locale: "en",
        value: new Date().getTime(),
        maxWidth: 250,
        className: "center-block"
    };
    
    constructor(props:Object) {
        super(props);
        this.state = {
            moment: this.props.value,
            hour: "12",
            minute: "00",
            second: "00"
        };
    }

    render():Object {
        let className = "time-picker center-block ";
        if (this.props.className) {
            className += this.props.className;
        }
        let label = this.props.label != undefined ? <ControlLabel>{this.props.label}</ControlLabel> : undefined;
        let origin = this.props.maxWidth / 2;
        return (
            <div className={className} style={{maxWidth:this.props.maxWidth}}>
                {label}
                <div className="time-picker-label">
                    <span>
                        {this.state.hour.length === 1 ? "0" + this.state.hour : this.state.hour}
                    </span>
                    <span>:</span>
                    <span>
                        {this.state.minute.length === 1 ? "0" + this.state.minute : this.state.minute}
                    </span>
                    <span>:</span>
                    <span>
                        {this.state.second.length === 1 ? "0" + this.state.second : this.state.second}
                    </span>
                </div>
                <svg height={this.props.maxWidth} width={this.props.maxWidth}>
                    <circle
                        cx={origin}
                        cy={origin}
                        r={origin-10}
                        fill="#34495E"
                        stroke="#2C3E50"/>
                    <circle
                        cx={origin}
                        cy={origin}
                        r={5}
                        fill="white"
                        stroke="#ddd"/>
                    <g>{this.__renderTimeZone()}</g>
                </svg>
            </div>);
    }

    __renderTimeZone() {
        let arr = [],
            angle = 0,
            origin = this.props.maxWidth / 2,
            radius = origin - 25,
            select = {X: origin, Y: 10};


        for (let i = 1, a = 0; i <= 12; i++, a++) {

            let percentage = angle * Math.PI / 180,
                z = Math.sqrt(2 * radius * radius - ( 2 * radius * radius * Math.cos(percentage) )),
                x = radius * Math.sin(percentage),
                y = Math.sqrt(z * z - x * x),
                Y = (origin - radius) + y,
                X = origin + x,
                code = (a == 0 ? 12 : a);

            let zoneClassName = "time-zone",
                textClassName = "time-zone-text";

            if (this.state.hour === code.toString()) {
                select.X = X;
                select.Y = Y;
                zoneClassName = "time-zone-selected";
                textClassName = "time-zone-text-selected";
            }

            arr.push(
                <circle
                    key={"c"+i}
                    cx={X}
                    cy={Y}
                    name={"hour"}
                    data={code}
                    className={zoneClassName}
                    onClick={this.__timeZoneClick}
                />,
                <text
                    key={"t"+i}
                    x={X}
                    y={Y+4}
                    className={textClassName}
                    textAnchor="middle">
                    {code}
                </text>
            );
            angle += 30;
        }

        arr.push(
            <line
                x1={origin}
                y1={origin}
                x2={select.X}
                y2={select.Y}
                className="time-stick"/>);

        return arr;
    }

    __timeZoneClick(e) {
        let state = {};
        let name = e.target.getAttribute("name");
        let data = e.target.getAttribute("data");
        state[name] = data;
        this.setState(state)
    }


    shouldComponentUpdate():boolean {
        return true;
    }
}
