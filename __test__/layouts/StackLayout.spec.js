import chai from "chai";
import TestUtils from "../TestUtils";
import StackLayout from "layouts/StackLayout";


describe("layouts/StackLayout", () => {
    const props = {
        onClick: () => { },
        onDragStart: () => { },
        onDragEnter: () => { },
        onDragLeave: () => { },
        onDragOver: () => { },
        onDrop: () => { },
        onClickDisplayList: () => { },
        onClickDisplayThumbnail: () => { },
        items: [{ filename: "Sample" }];
    };
    const stack = TestUtils.mount(props, StackLayout, props);

    it("render", () => {
        chai.assert.isTrue(subitem.find("li").hasClass("SideMenu-subitem"), "initial class must be SideMenu-subitem");

        chai.assert.isTrue(subitem.find("i").hasClass(props.item.icon), "fa icon class must be same with the 'props.item.icon'.");

        chai.assert.equal(subitem.find("div[to=\"" + props.item.path + "\"]").text(), props.item.text, "Div text must be same with the 'props.item.text'");
    });

    // it("onClick", () => {
    //     chai.assert.isTrue(subitem.find("li").hasClass("SideMenu-subitem"), "initial class must be SideMenu-subitem");
    //     subitem.find("div").simulate("click");
    //     chai.assert.isTrue(subitem.find("li").hasClass("SideMenu-subitem-active"), "Post-click class must be SideMenu-subitem-active");
    //     subitem.find("div").simulate("click");
    //     chai.assert.isTrue(subitem.find("li").hasClass("SideMenu-subitem-active"), "After Second click class must be SideMenu-subitem-active");
    // });

    // it("componentDidMount", () => {
    //     props.selectedItem = props.item.module;
    //     const subitemSelected = TestUtils.mount(props, SideMenuSubItem, props);

    //     chai.assert.isTrue(subitemSelected.find("li").hasClass("SideMenu-subitem-active"), "If 'props.selectedItem' is ending with 'props.item.module' class must be SideMenu-subitem-active");
    //     subitemSelected.find("div").simulate("click");
    //     chai.assert.isTrue(subitemSelected.find("li").hasClass("SideMenu-subitem-active"), "After Second click class must be SideMenu-subitem-active");
    // });
});
