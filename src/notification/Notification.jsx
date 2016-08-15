import React from "react";
import ReactDOM from "react-dom";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FaIcon from "../faicon/FaIcon";
import NotificationItem from "./NotificationItem";
import "./Notification.css";
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
         * Link for the notification details.
         * Footer link will be rendered according to this property.
         */
        notificationDetailPath: React.PropTypes.string,
        /**
         * Text for the notification details link.
         */
        notificationDetailLabel: React.PropTypes.string,
        /**
         * Link for the notification details.
         * Footer link will be rendered according to this property.
         */
        title: React.PropTypes.string,
    };

    static defaultProps = {
        title: "Notifications",
        notificationDetailLabel: "See all"
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
        open = open + (this.props.className ? ` ${this.props.className}` : "");
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
        if (this.props.notificationDetailPath === undefined) {
            return undefined;
        }
        return (
            <div>
                <li id="notify" componentClass="li" className="divider" />
                <div className="notification-footer">
                    <a href={this.props.notificationDetailPath}>
                        <i className="menu-title pull-right"
                            onClick={this.__closeNotifyAfterClick}>
                            {this.props.notificationDetailLabel}
                            <FaIcon code="fa-arrow-circle-right" size="fa-lg" />
                        </i>
                    </a>
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
                        refresh={this.__refresh}
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
                <span style={{ padding: "10px" }}>You don't have any notification.</span>
            </Col>);
    }


    __onNotificationOpenClick = (ev) => {
        this.setState({
            open: !this.state.open
        });
        ev.preventDefault();
    }

    __handleClick = (e) => {
        if (ReactDOM.findDOMNode(this).contains(e.target)) {
            return;
        }

        if (this.state.open) {
            this.setState({
                open: false
            });
        }
    }
    __refresh = () => {
        if (this.props.refresh) {
            this.props.refresh();
        }
    }

    componentDidMount = () => {
        document.addEventListener("click", this.__handleClick, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener("click", this.__handleClick, false);
    }

    componentWillReceiveProps(nextProps: Object) {
        this.setState({
            data: nextProps.data || []
        });
    }
}
