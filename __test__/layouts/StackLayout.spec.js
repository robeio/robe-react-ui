import chai from "chai";
import TestUtils from "../TestUtils";
import StackLayout from "layouts/StackLayout";
import React from "react";


describe("layouts/StackLayout", () => {
    const items = [
        {
            key: "1",
            value: "Item 1"
        },
        {
            key: "2",
            value: "Item 2"
        },
        {
            key: "3",
            value: "Item 3"
        }
    ];
    const props = {
        onClick: () => { },
        onDragStart: () => { },
        onDragEnter: () => { },
        onDragLeave: () => { },
        onDragOver: () => { },
        onDrop: () => { },
        onClickDisplayList: () => { },
        onClickDisplayThumbnail: () => { },
        toolbar: (<span>toolbar</span>),
        items: items
    };
    let stack = TestUtils.mount({}, StackLayout, props);

    it("render", () => {
        // List view test
        chai.assert.equal(stack.find(".Stacklayout-list").length, items.length, "List row count must be equal with 'items.length'");
        chai.assert.equal(stack.find(".Stacklayout-thumbnail").length, 0, "Thumbnail row count must be 0");

        // Thumbnail view test
        stack.setState({ display: "thumbnail" });
        chai.assert.equal(stack.find(".Stacklayout-thumbnail").length, items.length, "Thumbnail row count must be equal with 'items.length'");
        chai.assert.equal(stack.find(".Stacklayout-list").length, 0, "List row count must be 0");
    });

    it("render - toolbarPosition", () => {
        // TODO : Check toolbar div position.

        stack = TestUtils.mount({ toolbarPosition: "top" }, StackLayout, props);
        stack.unmount();


        stack = TestUtils.mount({ toolbarPosition: "left" }, StackLayout, props);
        stack.unmount();


        stack = TestUtils.mount({ toolbarPosition: "right" }, StackLayout, props);
        stack.unmount();
    });

    it("onItemClick", (done) => {
        let newProps = {
            onItemClick: (item) => {
                chai.assert.deepEqual(item, items[0], "Item must be equal to clicked items data");
                done();
            }
        };
        stack = TestUtils.mount(newProps, StackLayout, props);
        stack.find(".Stacklayout-list").first().simulate("click");
    });

});
