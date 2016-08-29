import chai from "chai";
import React from "react";
import Notification from "notification/Notification";
import NotificationItem from "notification/NotificationItem";
import { mount } from "enzyme";

describe("notification/Notification", () => {
    const getComponent = (props: Object): Object => {
        return (<Notification className="pull-right" {...props} notificationDetailPath="notify"/>);
    };
    it("render", () => {
        let wrapper = mount(getComponent({data: []}));

        let span = wrapper.find("span");
        chai.assert.equal(wrapper.find("span").last().text(), "You don't have any notification.");

        let data = [{
            oid: "1",
            description: "Description1"
        }, {
            oid: "2",
            description: "Description2"
        }];

        wrapper.setProps({ data: data, className: "" });

        chai.assert.equal(wrapper.find(Notification).length, 1);
        chai.assert.equal(wrapper.find(NotificationItem).length, 2);

        wrapper.setProps({ open: false, className: "test-class" });

        chai.assert.equal(wrapper.find(".open").length, 0);
        chai.assert.equal(wrapper.find(".test-class").length, 1);

        wrapper.setProps({ notificationDetailPath: undefined });
        chai.assert.equal(wrapper.props().notificationDetailPath, undefined);

        let button = wrapper.find("a").first();
        button.simulate("click");

        wrapper.setProps({ onRead: (oid :string) => {
            chai.assert.equal(oid, "1");
        } });

        button = wrapper.find("a").first();
        button.simulate("click");

        button = wrapper.find("button.btn-header-button").first();
        button.simulate("click");

        // let e = {};
        // e.target = {};
        // wrapper.instance().__handleClick(e); // eslint-disable-line no-underscore-dangle


        wrapper.setProps({ data: null });
        chai.assert.equal(wrapper.find(Notification).length, 1);


        wrapper.unmount();
    });
});