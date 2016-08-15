import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

export default class TostContainer extends ShallowComponent {
    render() {
        return (
            <NotificationContainer />
        );
    }
}