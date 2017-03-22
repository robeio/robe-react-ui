import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import TestUtils from "../TestUtils";
import SearchBox from "googlemap/SearchBox";// eslint-disable-line

let apiKey = "AIzaSyAY1o0OVVUKBFoVX84PQW5FuAkolw6kNeU";
let defaultZoom = 10;
let language = "tr";
let center = { lat: 41.017224, lng: 28.949146 };

describe("googlemap/SearchBox", () => {
    it("render - without SearchBox", () => {
        let props = {};
        let wrapper = TestUtils.mount(props, SearchBox, props);
        chai.assert.equal(wrapper.find(SearchBox).length, 1);
    });
    it("handleChange", (done) => {
        let props = {
            onChange: () => { done(); },
        };
        let wrapper = TestUtils.mount(props, SearchBox, props);
        wrapper.instance().__handleChange({ target: { value: "123" } });
        wrapper.unmount();
        props.onChange = undefined;
        wrapper = TestUtils.mount(props, SearchBox, props);
        wrapper.instance().__handleChange({ target: { value: "123" } });
        wrapper.unmount();

    });
    it("onPlacesChanged", () => {
        let props = {
            apiParams: { places: {} }
        };
        try {
            let wrapper = TestUtils.mount(props, SearchBox, props);
            wrapper.instance().onPlacesChanged();
            wrapper.unmount();
        } catch (error) {
            chai.assert.equal(error.message, "Cannot read property 'places' of undefined");
        }
    });

});
