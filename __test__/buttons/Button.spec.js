import chai from "chai";
import TestUtils from "../TestUtils";
import Button from "buttons/Button";
import FaIcon from "faicon/FaIcon";
import ComponentManager from "buttons/Button";

describe("buttons/Button", () => {

    it("render", () => {
        let wrapper = TestUtils.mount({}, Button, {});
        chai.assert.equal(wrapper.find(Button).length, 1);
    });
    it("onClick", (done) => {
        let wrapper = TestUtils.mount({}, Button, {
            onClick: () => {
                done();
            }
        });
        wrapper.simulate("click", {});
    });
    it("onClickAsync", (done) => {
        let finished = () => {
            chai.assert.equal(wrapper.find(FaIcon).length, 0);
            done();
        };
        let response = (finish) => {
            chai.assert.equal(wrapper.find(FaIcon).length, 1);
            finish();
            finished();
        };

        let wrapper = TestUtils.mount({}, Button, {
            onClickAsync: (e, finish) => {
                setTimeout(() => {
                    response(finish);
                }, 500);
            }
        });
        wrapper.simulate("click", {});
        wrapper.simulate("click", {});
    });
});
