import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import moment from "moment";

export default class NotificationItem extends ShallowComponent {

    static propTypes = {
        item: React.PropTypes.object.isRequired
    };

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render(): Object {
        let item = this.props.item;

        return (
            <span>
                <a style={{ padding: "0!important" }} onClick={this.__onRead}>
                    <Col className="notification-item">
                        <Col componentClass="h4" className="item-title" style={{ marginBottom: 0 }}>
                    <Col componentClass="p" style={{ wordWrap: "break-word" }} >{item.description}</Col>
                        </Col>
                        <Col componentClass="p" style={{ fontSize: 12 }} className="item-title">{moment(item.notificationDate).format("DD/MM/YYYY HH:mm")}</Col></Col>
                    <li id="notify" className="divider" />
                </a>
            </span>
        );
    }
    __onRead = () => {
        this.props.onRead(this.props.item.oid);
    };

}
