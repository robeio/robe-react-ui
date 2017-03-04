/**
 * Created by cagdasbekar on 09/02/17.
 */
import chai from "chai";
import TestUtils from "../TestUtils";
import SidePanel from "sidepanel/SidePanel";

describe("SidePanel", () => {
    it("render", () => {
        let props = {
            visible:false,
            position:"left",
            width:300
        }
        let sidePanel = TestUtils.mount(props, SidePanel, props);

        chai.assert.equal(sidePanel.find(SidePanel).length, 1, "Component not mounted properly");

        chai.assert.equal(sidePanel.find("div").first().node.style.left, "-310px", "Left position is wrong when component is on left");

        props.position = "right";
        sidePanel.instance().componentWillReceiveProps(props);

        chai.assert.equal(sidePanel.find("div").first().node.style.right, "-310px", "Right position is wrong when component is on right");

        sidePanel.unmount();
    });
});