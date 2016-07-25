import React from "react";
import ReactDOM from "react-dom";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FaIcon from "faicon/FaIcon";
import NotificationItem from "notification/NotificationItem";
import UIApplication from "../app/UIApplication";
import "notification/Notification.css";

export default class Notification extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {
            notifyOpen: false,
            data: this.props.data
        };
    }
    render() {
        let notifyOpen = this.state.notifyOpen ? "dropdown open" : "dropdown";
        let notificationButtonClass = this.state.notifyOpen ? "fa-caret-down" : "fa-bell";

        return (
                <Col className={notifyOpen} aria-expanded={true}>
                    <Button bsStyle="primary" id="notify" className="btn-header-button btn-header" role="button" onClick={this.__onNotificationOpenClick}>
                        <FaIcon code={notificationButtonClass} size="fa-lg" /> {this.state.data.length}
                    </Button>
                    <Col id="notify" componentClass="ul" className="dropdown-menu notifications" role="menu">
                        <Col className="notification-heading">
                            <Col componentClass="h4" className="menu-title">Bildirimler
                            </Col>
                        </Col>
                        <Col id="notify" componentClass="li" className="divider" />
                        <Col className="notifications-wrapper">
                            {this.__renderNotificationItems()}
                        </Col>
                        <Col id="notify" componentClass="li" className="divider" />
                        <Col className="notification-footer">
                            <a
                                style={{ padding: 0 }}
                                href={`${UIApplication.getBaseUrlPath()}#/account/`}
                            >
                            <Col
                                componentClass="h7"
                                className="menu-title"
                                onClick={this.__closeNotifyAfterClick}
                            >
                                Tüm Bildirimler
                                <Col
                                    componentClass="i"
                                    className="glyphicon glyphicon-circle-arrow-right"
                                />
                            </Col>
                            </a>
                        </Col>
                    </Col>
            </Col>);
    }

    __renderNotificationItems = () => {
        if (this.state.data.length > 0) {
            let notifications = [];
            let items = this.state.data;

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                notifications.push(<Col key={i} onClick={this.__closeNotifyAfterClick}><NotificationItem refresh={this.__refresh} key={i} item={item} /></Col>);
            }

            return (notifications);
        }
        return (<Col>
            <Col componentClass="label" style={{ padding: "10px" }}>
                Henüz bir bildiriminiz bulunmamaktadır.
            </Col>
        </Col>);
    }


    __onNotificationOpenClick = (ev) => {
        this.setState({
            notifyOpen: !this.state.notifyOpen
        });
        ev.preventDefault();
    }

    __handleClick = (e) => {
        if (ReactDOM.findDOMNode(this).contains(e.target)) {
            return;
        }

        if (this.state.notifyOpen) {
            this.setState({
                notifyOpen: false
            });
        }
    }

    // __closeNotifyAfterClick = (e) => {
    __closeNotifyAfterClick = () => {
        this.setState({
            notifyOpen: false
        });
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data || []
        });
    }
}
