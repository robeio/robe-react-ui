import chai from "chai";
import TestUtils from "../TestUtils";
import Countdown from "countdown/Countdown";

describe("countdown/Countdown", () => {
    const props = {};

    it("props - days, hours, minutes, seconds", () => {
        let node = TestUtils.mount(props, Countdown, props);
        chai.assert.equal(node.find("label").length, 4, "All sections must be visible.");

        node.setProps({days: {visible: false}});
        chai.assert.equal(node.find("label").length, 3, "Hours, Minutes, Seconds sections must be visible.");

        node.setProps({days: {visible: false}, hours: {visible: false}});
        chai.assert.equal(node.find("label").length, 2, "Minutes, Seconds sections must be visible.");

        node.setProps({days: {visible: false}, hours: {visible: false}, minutes: {visible: false}});
        chai.assert.equal(node.find("label").length, 1, "Seconds sections must be visible.");

        node.setProps({
            days: {visible: false},
            hours: {visible: false},
            minutes: {visible: false},
            seconds: {visible: false}
        });
        chai.assert.equal(node.find("label").length, 0, "All sections must be invisible.");

        node.unmount();
    });

    it("props - onChange", (done) => {
        let node = TestUtils.mount({
            value: 2000, onChange: () => {
                done();
                node.unmount();
            }
        }, Countdown, props);
        node.instance().start();
    });
    it("props - onComplete", (done) => {
        let node = TestUtils.mount({
            value: 1000, onComplete: () => {
                done();
                node.unmount();
            }
        }, Countdown, props);
        node.instance().start();

    });

    it("__parseLong", () => {
        let node = TestUtils.mount({value: 90061000}, Countdown, props);
        let values = node.instance().__parseLong(90061000);
        chai.assert.deepEqual(values, {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1
        }, "Days, Hours, Minutes, Seconds must be 1s.");
        let valueNodes = node.find(".countdown");
        chai.assert.equal(valueNodes.length, 4, "All sections must be visible.");
        for (let i = 0; i < valueNodes.length; i++) {
            let text = valueNodes.get(i).innerText;
            text = text.substring(text.length - 2);
            chai.assert.equal(text, "01", "Day, Hour, Minute, Second divs inner texts must be 1s.");
        }
        node.unmount();
    });

});
