
import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Button from "react-bootstrap/lib/Button";
import Notification from "notification/Notification";


export default class NotificationSample extends ShallowComponent {

    static style={
        background:"gray",
        height:"30px",
        padding:"5px"
    };
    constructor(props: Object){
        super(props);
        this.state = {
            data: [
            ]
        };
    }
    render(): Object {
        return (
            <div>
            <div style={NotificationSample.style}>
                <Notification
                    ref="notifications"
                    data={this.state.data}
                    refresh={this.__readHeaderNotifications}
                    className="pull-right"
                    notificationDetailPath="#"
                    onRead={this.__onRead}
                    notificationDetailClick={this.__notificationDetailClick}
                />
            </div>
                <Button onClick={this.__onClickNotify}>
                    Notify
                </Button>
            </div>
        );
    }
    __onRead=(id: any) => {
        alert(`Notification Read: ${id}`);// eslint-disable-line no-alert
    }
    __onClickNotify = () => {
        let data = this.refs.notifications.state.data;
        let notif = {
            oid: data.length,
            description: `Sample ${data.length}`,
            notificationDate: new Date(),
        };
        data.push(notif);
        this.refs.notifications.setState({
            data: data,
            count: data.length
        });
    };
    __notificationDetailClick= () => {
        alert("See All");// eslint-disable-line no-alert
    };

}
