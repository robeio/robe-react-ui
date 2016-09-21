import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "./Toast.css";

export default class ToastContainer extends ShallowComponent {

    render(): Object {
        return (
            <NotificationContainer />
        );
    }
}
