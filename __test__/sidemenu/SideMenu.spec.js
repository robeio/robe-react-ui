import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import SideMenu from "sidemenu/SideMenu";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import TestUtils from "../TestUtils";

describe("sidemenu/SideMenu", () => {
    const props = {
        items: {
            text: "Menu",
            path: "root",
            module: "Root",
            icon: null,
            items: [
                {
                    text: "Manager",
                    path: "Manager",
                    module: "Manager",
                    icon: "fa-cogs",
                    items: [
                        {
                            text: "Dashboard",
                            path: "app/modules/Dashboard",
                            module: "Dashboard",
                            icon: "fa-tachometer"
                        },
                        {
                            text: "Mail Templates",
                            path: "app/modules/MailTemplate",
                            module: "MailTemplate",
                            icon: "fa-envelope"
                        }
                    ],
                },
                {
                    text: "Guest",
                    path: "Guest",
                    index: 1,
                    module: "Guest",
                    icon: "fa-cogs"
                }]
        },
        onChange: () => { }
    };
    const menu = TestUtils.mount(props, SideMenu, props);

    it("render", () => {
        let contentUl = menu.find(".SideMenu-menu-content");
        chai.assert.equal(contentUl.find(".SideMenu-item").length, props.items.items.length,
            "SideMenuItem count must be equal to number of items with children");
        chai.assert.equal(contentUl.find(".SideMenu-subitem").length + contentUl.find(".SideMenu-subitem-active").length, 2,
            "SideMenuSubItem count must be equal to number of items without children");
    });


    it("onChange", () => {
        menu.find(".SideMenu-item").first().simulate("click");
        menu.find(".SideMenu-subitem").first().find("div").simulate("click");
        chai.assert.equal(menu.find(".SideMenu-subitem-active").length, 1);
        chai.assert.equal(menu.find(".SideMenu-subitem-active").find("div").text(), "Dashboard");
        menu.find(".SideMenu-item").first().simulate("click");
        menu.find(".SideMenu-subitem").last().find("div").simulate("click");
        chai.assert.equal(menu.find(".SideMenu-subitem-active").length, 1);
        chai.assert.equal(menu.find(".SideMenu-subitem-active").find("div").text(), "Mail Templates");


        // itemSelected.find(".SideMenu-subitem").last().find("div").simulate("click");
        // chai.assert.equal(itemSelected.find(".SideMenu-subitem").length, props.item.items.length - 1, "Post-Click Non active Subitem lengthmust be 1 less than 'props.item.items.length'");
        // chai.assert.equal(itemSelected.find(".SideMenu-subitem-active").length, 1);
        // chai.assert.equal(itemSelected.find(".SideMenu-subitem-active").find("div").text(), "Parameters2");
    });
});
