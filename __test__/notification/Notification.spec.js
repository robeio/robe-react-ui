import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import TestUtils from "../TestUtils";
import Notification from "notification/Notification"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import NotificationItem from "notification/NotificationItem"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { mount } from "enzyme"; // eslint-disable-line import/no-extraneous-dependencies

describe("notification/Notification", () => {
    const getComponent = (props: Object): Object => {
        return (<Notification className="pull-right" {...props} notificationDetailPath="notify" />); // eslint-disable-line react/jsx-filename-extension
    };

    const notificationDetailClick = (e: Object) => {
        chai.assert.isObject(e, "notificationDetailClick is notifiy");
    };
    it("render", () => {
        let wrapper = mount(getComponent({ data: [] }));
        chai.assert.equal(wrapper.find(NotificationItem).length, 0);

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

        wrapper.setProps({ onRead: (oid: string) => {
            chai.assert.equal(oid, "1");
        } });

        button = wrapper.find("a").first();
        button.simulate("click");

        chai.assert.equal(wrapper.state().open, false);
        button = wrapper.find("button.btn-header-button").first();
        button.simulate("click");
        chai.assert.equal(wrapper.state().open, true);

        wrapper.setProps({ data: null });
        chai.assert.equal(wrapper.find(Notification).length, 1);


        wrapper = mount(getComponent({ data: [], detailsClick: notificationDetailClick }));

        let footer = wrapper.find("div.notification-footer");
        chai.assert.equal(footer.length, 1);

        footer.find("i").first().simulate("click");

        wrapper.unmount();
    });
});
