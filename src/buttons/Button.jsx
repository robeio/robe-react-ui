import React from "react";
import BButton from "react-bootstrap/lib/Button";
import { ShallowComponent } from "robe-react-commons";
import FaIcon from "../faicon/FaIcon";
import "./Button.css";

/**
 * Button is a base component which wraps React-Bootstraps input component.
 * Does necessary validations, rendering of validation messages.
 * @export
 * @class Button
 */
export default class Button extends ShallowComponent {
    /**
     * PropTypes of the component
     * @static
     */
    static propTypes: Map = {

        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,

        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool,
        /**
        * Event for synced operations.
        * Any operation will NOT trigger loading indicator and will act as normal button.
        */
        onClick: React.PropTypes.func,

        /**
        * Event for async operations (timeouts, AJAX calls).
        * Operation will trigger loading indicator.
        */
        onClickAsync: React.PropTypes.func,

        /**
         * Loading indicator.
         */
        loadingIndicator: React.PropTypes.oneOf(["fa-spinner", "fa-circle-o-notch", "fa-refresh", "fa-cog"])

    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        hidden: false,
        loadingIndicator: "fa-circle-o-notch"
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    /**
     * Renders the component
     * @returns {Object}
     */
    render(): Object {
        let onClick = this.props.onClickAsync !== undefined ? this.__onClickAsync : this.props.onClick;
        let {onClickAsync,loadingIndicator, ...newProps } = this.props; //eslint-disable-line
        return (
            <BButton {...newProps} onClick={onClick} className="ajaxButton">
                {this.props.children}
                {this.state.isLoading ? (<span> &nbsp; <FaIcon code={`${this.props.loadingIndicator} fa-spin`} /> </span>) : undefined}
            </BButton>
        );
    }

    blocked: false

    __onClickAsync(e: Object) {
        if (this.state.isLoading) {
            return;
        }
        this.setState({
            isLoading: true
        });
        this.props.onClickAsync(e, this.done);
    }

    /**
     * Finishes the loading state of the button.
     * Should be called after async call responses.
     */
    done() {
        this.setState({
            isLoading: false
        });
    }

}
