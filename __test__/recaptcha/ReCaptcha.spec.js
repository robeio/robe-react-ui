import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import { mount } from "enzyme";// eslint-disable-line
import ReCaptcha from "recaptcha/ReCaptcha";// eslint-disable-line
import Recaptcha from "react-recaptcha/dist/react-recaptcha";

describe("recaptcha/ReCaptcha", () => {
    const getComponent = (props: Object): Object => {
        return (
            <ReCaptcha {...props} />// eslint-disable-line
        );
    };

    it("render", () => {
        // let props = { sitekey: "6LckQA8TAAAAAKf4TxLtciRBYphKF5Uq4jRrImJD",
        //     render: "explicit",
        //     lang: "en" };
        // let wrapper = mount(getComponent(props));
        // chai.assert.equal(wrapper.find(ReCaptcha).length, 1);
        // chai.assert.equal(wrapper.find(Recaptcha).length, 1);
    });
});
