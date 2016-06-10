import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import Col from "react-bootstrap/lib/Col";
import moment from "moment";
import RequestUtils from "libs/util/RequestUtils";
import GlobalVariables from "app/GlobalVariables";

class NotificationItem extends BaseComponent {

    static propTypes = {
        item: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    };

    render() {
        let item = this.props.item;

        return (
            <span>
                <a style={{padding:"0!important"}} href={GlobalVariables.get("applicationRootPath")+this.__handlePathTo(item)} onClick={this.__onRead.bind(undefined,item.oid)}>
                    <Col className="notification-item">
                        <Col componentClass="h4" className="item-title" style={{marginBottom:0}}>
                    <Col componentClass="p" style={{wordWrap:"break-word"}}>{item.description}</Col>
                        </Col>
                        <Col componentClass="p" style={{fontSize:12}} className="item-title">{moment(item.notificationDate).format("DD/MM/YYYY HH:mm")}</Col></Col>
                    <li id="notify" className="divider"/>
                </a>
            </span>
        );

    }

    __handlePathTo = (item)=> {

        if (item.notifyTo == "ADMIN") {
            return "#/account";
        } else {

            if (item.notifyType == "APPROVED") {
                return this.__handleClassToPath(item.parentClass)
            } else {
                return "#/account/notifications?id=" + item.oid;
            }
        }
    };

    __handleClassToPath = (clazz)=> {
        switch (clazz) {
            case "com.mebitech.hermes.hibernate.entity.Address":
                return "#/account/information/addresses";
            case "com.mebitech.hermes.hibernate.entity.Contact":
                return "#/account/information/contact-informations";
            case "com.mebitech.hermes.hibernate.entity.BankInformation":
                return "#/account/information/bank-informations";
            case "com.mebitech.hermes.hibernate.entity.PostAd":
                return "#/account/postads";
            case "com.mebitech.hermes.hibernate.entity.Order":
                return "#/account/orders/incoming-order";
            case "com.mebitech.hermes.hibernate.entity.MerchantComment":
                return "#";
        }

        return clazz;

    };

    __onRead = (oid)=> {
        var item = {};
        item.oid = oid;
        RequestUtils.makeRequest("commons/notifications/" + oid, "PUT", item, function (response) {

            if (this.props.refresh) {
                this.props.refresh();
            }

        }.bind(this));
    };

}


module.exports = NotificationItem;