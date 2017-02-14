import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Application from "robe-react-commons/lib/application/Application";
import "./Countdown.css";

/**
 * 
 * 
 * @export
 * @class Countdown
 * @extends {ShallowComponent}
 */
export default class Countdown extends ShallowComponent {

    static UNITS_IN_MS = { DAY: 86400000, HOUR: 3600000, MINUTE: 60000, SECOND: 1000 }


    static propTypes: Map = {
        /**
         * Interval of the counter to tick.
         */
        interval: React.PropTypes.number,
        /**
         *Starting value of the component in MS.
         */
        value: React.PropTypes.number,
        /**
         * Will fire when the counter finishes countdown. ( 0 )
         * No parameters. 
         */
        onComplete: React.PropTypes.func,
        /**
         * Will fire on every change of the value (not onComplete)
         * value as parameter.
         */
        onChange: React.PropTypes.func,

        /**
         * Style of the counter.
         */
        style: React.PropTypes.object,

        /**
         * Props for days cell.
         */
        days: React.PropTypes.shape({
            visible: React.PropTypes.boolean,
            label: React.PropTypes.string,
            style: React.PropTypes.object
        }),
        /**
         * Props for hours cell.
         */
        hours: React.PropTypes.shape({
            visible: React.PropTypes.boolean,
            label: React.PropTypes.string,
            style: React.PropTypes.object
        }),
        /**
         * Props for minutes cell.
         */
        minutes: React.PropTypes.shape({
            visible: React.PropTypes.boolean,
            label: React.PropTypes.string,
            style: React.PropTypes.object
        }),
        /**
         * Props for seconds cell.
         */
        seconds: React.PropTypes.shape({
            visible: React.PropTypes.boolean,
            label: React.PropTypes.string,
            style: React.PropTypes.object
        }),
    }

    static defaultProps: Map = {
        interval: 1000,
        value: 10000,
        style: {
            fontSize: "30px"
        },
        days: {
            visible: true,
            label: Application.i18n(Countdown, "countdown.Countdown", "days", "label"),
            style: { fontSize: "12px", display: "block" }
        },
        hours: {
            visible: true,
            label: Application.i18n(Countdown, "countdown.Countdown", "hours", "label"),
            style: { fontSize: "12px", display: "block" }
        },
        minutes: {
            visible: true,
            label: Application.i18n(Countdown, "countdown.Countdown", "minutes", "label"),
            style: { fontSize: "12px", display: "block" }
        },
        seconds: {
            visible: true,
            label: Application.i18n(Countdown, "countdown.Countdown", "seconds", "label"),
            style: { fontSize: "12px", display: "block" }
        }
    }

    /**
     * Holds the ticking status.
     * @memberOf Countdown
     */
    ticking: boolean = false;

    /**
     * Creates an instance of Countdown.
     * @param {Object} props
     * @memberOf Countdown
     */
    constructor(props: Object) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    /**
     * Holds previous values.
     * @memberOf Countdown
     */
    pre: Map = {
        days: -1,
        hours: -1,
        minutes: -1,
        seconds: -1,
    }

    render(): Object {
        let { days, hours, minutes, seconds } = this.__parseLong(this.state.value);
        let counter = (
            <div style={this.props.style}>
                {this.renderCell(this.props.days, days, this.pre.days)}
                {this.renderCell(this.props.hours, hours, this.pre.hours)}
                {this.renderCell(this.props.minutes, minutes, this.pre.minutes)}
                {this.renderCell(this.props.seconds, seconds, this.pre.seconds)}
            </div>
        );
        this.pre = { days, hours, minutes, seconds };
        return counter;
    }

    renderCell(props: Map, value: number, preValue: number) {
        let className = (value === preValue || !this.ticking) ? "countdown" : "countdown countdown-animate";
        if (props.visible) {
            return (
                <div className={className} >
                    <label style={props.style}>{props.label}</label>
                    {this.__addLeftZero(value)}
                </div>
            );
        }
        return undefined;
    }

    /**
     * 
     * Adds 0 to the left side of the integer and converts to a string.
     * @param {number} value
     * @returns
     * 
     * @memberOf Countdown
     */
    __addLeftZero(value: number): string {
        return value.toString().length < 2 ? "0" + value.toString() : value.toString();
    }

    __parseLong(value) {
        let days = this.props.days.visible ? Math.floor(value / Countdown.UNITS_IN_MS.DAY) : 0;
        let hours = this.props.hours.visible ? Math.floor(value % Countdown.UNITS_IN_MS.DAY / Countdown.UNITS_IN_MS.HOUR) : 0;
        let minutes = this.props.minutes.visible ? Math.floor(value % Countdown.UNITS_IN_MS.HOUR / Countdown.UNITS_IN_MS.MINUTE) : 0;
        let seconds = this.props.seconds.visible ? Math.floor(value % Countdown.UNITS_IN_MS.MINUTE / Countdown.UNITS_IN_MS.SECOND) : 0;
        return { days, hours, minutes, seconds };
    }

    /**
     * Tick :)
     * @returns
     * @memberOf Countdown
     */
    __tick() {
        let value = this.state.value;
        value -= this.props.interval;
        if (value < 1) {
            this.stop()
            this.setState({
                value: 0
            });
            if (this.props.onComplete) {
                this.props.onComplete();
            }
            return;
        }
        this.setState({
            value
        });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            this.__tick();
        }.bind(this), this.props.interval);
    }
    /**
     * Resets the values of the counter to the initial values.
     * @memberOf Countdown
     */
    reset() {
        this.forceUpdate();
        this.setState({
            value: this.state.value
        }, () => {
            this.setState({
                value: this.props.value
            });
        });
        this.pre = {
            days: -1,
            hours: -1,
            minutes: -1,
            seconds: -1,
        };

    }

    /**
     * Starts counter.
     * @memberOf Countdown
     */
    start() {
        this.ticking = true;
        this.timer = setTimeout(function () {
            this.__tick();
        }.bind(this), this.props.interval);
    }
    /**
     * Stops counter.
     * @memberOf Countdown
     */
    stop() {
        this.ticking = false;
        clearTimeout(this.timer);
    }

    /**
     * 
     * Returns the current status of the component.
     * @returns {boolean} true - started / false stopped
     * @memberOf Countdown
     */
    isTicking(): boolean {
        return this.ticking;
    }
}