import React from "react";
import ReactDOM from "react-dom";
import { ShallowComponent, Application } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FaIcon from "../faicon/FaIcon";
import NotificationItem from "./NotificationItem";
import "./Notification.css";
import messages from "./notificationMessages.json";

Application.loadI18n(messages);
/**
 * Notification is a view component for representing all notifications via a clickable icon and count label.
 * Also a popup will show the details of the notifications.
 * @export
 * @class Notification
 * @extends {ShallowComponent}
 */
export default class Notification extends ShallowComponent {

    /**
     * PropTypes of the component.
     *
     * @static
     */
    static propTypes = {
        /**
         * Click event for the notification details.
         * Footer link will be rendered according to this property.
         */
        notificationDetailClick: React.PropTypes.func,
        /**
         * Text for the notification details link.
         */
        notificationDetailLabel: React.PropTypes.string,
        /**
         * Title for the notification popup.
         */
        title: React.PropTypes.string,
    };

    static defaultProps = {
        title: Application.i18n("notification").title,
        notificationDetailLabel: Application.i18n("notification").details
    };


    constructor(props: Object) {
        super(props);
        this.state = {
            open: true,
            data: this.props.data
        };
    }


    render(): Object {
        let open = this.state.open ? "dropdown open" : "dropdown";
        let notificationButtonClass = this.state.open ? "fa-caret-down" : "fa-bell";
        open += (this.props.className ? ` ${this.props.className}` : "");
        return (
            <Col className={open} aria-expanded={true}>
                <Button bsStyle="primary" id="notify" className="btn-header-button btn-header" role="button" onClick={this.__onNotificationOpenClick}>
                    <FaIcon code={notificationButtonClass} size="fa-lg" /> {this.state.data.length}
                </Button>
                <ul id="notify" className="dropdown-menu notifications" role="menu">
                    <span className="menu-title">{this.props.title}</span>
                    <li id="notify" className="divider" />
                    {this.__renderNotificationItems()}
                    {this.__renderFooter()}
                </ul>
            </Col>);
    }

    __renderFooter(): Object {
        if (this.props.notificationDetailClick === undefined) {
            return undefined;
        }
        return (
            <div>
                <li id="notify" className="divider" />
                <div className="notification-footer">
                    <i
                        className="menu-title pull-right"
                        onClick={this.__notificationDetailClick}
                        >
                        {this.props.notificationDetailLabel}
                        <FaIcon code="fa-arrow-circle-right" size="fa-lg" />
                    </i>
                </div>
            </div>
        );
    }

    __renderNotificationItems(): Object {
        if (this.state.data.length > 0) {
            let notifications = [];
            let items = this.state.data;

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                notifications.push(
                    <NotificationItem
                        key={i}
                        item={item}
                        onRead={this.props.onRead}
                        />
                );
            }
            return (<Col className="notifications-wrapper">{notifications}</Col>);
        }
        return (
            <Col>
                <span style={{ padding: "10px" }} >
                    {Application.i18n("notification").noContent}
                </span>
            </Col>);
    }


    __onNotificationOpenClick(e: Object) {
        this.setState({
            open: !this.state.open
        });

        e.preventDefault();
    }

    __notificationDetailClick(e: Object) {
        this.__onNotificationOpenClick(e);
        e.preventDefault();
    }


    __handleClick(e: Object) {
        if (ReactDOM.findDOMNode(this).contains(e.target)) { // eslint-disable-line
            return;
        }

        if (this.state.open) {
            this.setState({
                open: false
            });
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.__handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__handleClick, false);
    }

    componentWillReceiveProps(nextProps: Object) {
        this.setState({
            data: nextProps.data || [],
            open: nextProps.open
        });
    }
}
