import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import SideMenuItem from "sidemenu/SideMenuItem";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import TestUtils from "../TestUtils";

describe("sidemenu/SideMenuItem", () => {
    const props = {
        item: {
            text: "Manager",
            path: "app/modules/Manager",
            module: "Manager",
            icon: "fa-cogs",
            items: [
                {
                    text: "Parameters",
                    path: "app/modules/Parameters",
                    module: "Parameters",
                    icon: "fa-tachometer"
                }, {
                    text: "Parameters2",
                    path: "app/modules/Parameters2",
                    module: "Parameters2",
                    icon: "fa-tachometer"
                }]
        },
        onChange: () => { }
    };
    const item = TestUtils.mount(props, SideMenuItem, props);

    it("render", () => {
        let li = item.find(".SideMenu-item");
        chai.assert.isTrue(li.hasClass("SideMenu-item"), "initial class must be SideMenu-item");
        chai.assert.isTrue(li.find("i").hasClass(props.item.icon),
            "fa icon class must be same with the 'props.item.icon'.");

        chai.assert.equal(li.text(), props.item.text, "li text must be same with the 'props.item.text'");

        let ul = item.find(".out");

        chai.assert.equal(ul.find(".SideMenu-subitem").length, props.item.items.length,
            "It must be same child count with 'props.item.items.length'");
    });

    it("onClick", () => {
        let li = item.find(".SideMenu-item");
        chai.assert.isTrue(li.hasClass("SideMenu-item"), "initial class must be SideMenu-item");
        chai.assert.isDefined(item.find(".out").node, "Pre-click out must be defined");

        li.simulate("click");
        chai.assert.isTrue(li.hasClass("SideMenu-item-active"),
            "Post-click class must be SideMenu-item-active");
        chai.assert.isUndefined(item.find(".out").node, "Post-click out must be undefined");
        chai.assert.isDefined(item.find(".in").node, "Post-click in must be defined");

        let ul = item.find(".in");
        chai.assert.equal(ul.find(".SideMenu-subitem").length, props.item.items.length,
            "It must be same child count with 'props.item.items.length'");
    });

    it("componentDidMount", () => {
        props.selectedItem = props.item.path;
        const itemSelected = TestUtils.mount(props, SideMenuItem, props);

        chai.assert.isTrue(itemSelected.find(".SideMenu-item").hasClass("SideMenu-item-active"),
            "If 'props.selectedItem' is ending with 'props.item.module' class must be SideMenu-item-active");
        itemSelected.find(".SideMenu-item").simulate("click");
        chai.assert.isTrue(itemSelected.find(".SideMenu-item").hasClass("SideMenu-item-active"),
            "After Second click class must be SideMenu-item-active");
    });

    it("onChange", () => {
        props.selectedItem = props.item.path;
        const itemSelected = TestUtils.mount(props, SideMenuItem, props);

        chai.assert.equal(itemSelected.find(".SideMenu-subitem").length, props.item.items.length);
        itemSelected.find(".SideMenu-item").simulate("click");
        itemSelected.find(".SideMenu-subitem").first().find("div").simulate("click");
        chai.assert.equal(itemSelected.find(".SideMenu-subitem").length, props.item.items.length - 1, "Post-Click Non active Subitem lengthmust be 1 less than 'props.item.items.length'");
        chai.assert.equal(itemSelected.find(".SideMenu-subitem-active").length, 1);
        chai.assert.equal(itemSelected.find(".SideMenu-subitem-active").find("div").text(), "Parameters");


        itemSelected.find(".SideMenu-subitem").last().find("div").simulate("click");
        chai.assert.equal(itemSelected.find(".SideMenu-subitem").length, props.item.items.length - 1, "Post-Click Non active Subitem lengthmust be 1 less than 'props.item.items.length'");
        chai.assert.equal(itemSelected.find(".SideMenu-subitem-active").length, 1);
        chai.assert.equal(itemSelected.find(".SideMenu-subitem-active").find("div").text(), "Parameters2");
    });
});
