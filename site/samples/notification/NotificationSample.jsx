
import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Button from "react-bootstrap/lib/Button";
import Notification from "notification/Notification";


export default class NotificationSample extends ShallowComponent {
    constructor(props: Object){
        super(props);
        this.state = {
            data:[

            ]
        }
    }
    render():Object {
        return (
            <div>
                <Notification ref="notifications" data={this.state.data} refresh={this.__readHeaderNotifications}/>
                <Button
                    onClick={this.__onClickNotify}>Notify</Button>
               
            </div>
        );
    }
    __onClickNotify = () => {
    };

}
