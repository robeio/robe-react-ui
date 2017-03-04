import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import TestUtils from "../TestUtils";
import GoogleMap from "googlemap/GoogleMap";// eslint-disable-line
import SearchBox from "googlemap/SearchBox";// eslint-disable-line

let apiKey = "AIzaSyAY1o0OVVUKBFoVX84PQW5FuAkolw6kNeU";
let defaultZoom = 10;
let language = "tr";
let center = { lat: 41.017224, lng: 28.949146 };

describe("googlemap/GoogleMap", () => {
    it("render - without SearchBox", () => {
        let props = {
            bootstrapURLKeys: { apiKey: apiKey, language: language, libraries: "places" },
            defaultZoom: defaultZoom,
            center: center
        };
        let wrapper = TestUtils.mount(props, GoogleMap, props);
        chai.assert.equal(wrapper.find(GoogleMap).length, 1);
        chai.assert.equal(wrapper.find(SearchBox).length, 0);
        wrapper.unmount();
        props = {
            bootstrapURLKeys: { apiKey: apiKey, libraries: "places" },
            defaultZoom: defaultZoom,
            center: center
        };
        wrapper = TestUtils.mount(props, GoogleMap, props);
        chai.assert.equal(wrapper.find(GoogleMap).length, 1);
        chai.assert.equal(wrapper.find(SearchBox).length, 0);
        wrapper.unmount();
    });

    it("render - with SearchBox", () => {
        let props = {
            bootstrapURLKeys: { apiKey: apiKey, language: language, libraries: "places" },
            defaultZoom: defaultZoom,
            center: center,
            searchBox: {
            }
        };

        let wrapper = TestUtils.mount(props, GoogleMap, props);
        chai.assert.equal(wrapper.find(GoogleMap).length, 1);
        chai.assert.equal(wrapper.find(SearchBox).length, 0);
        wrapper.unmount();

        props = {
            bootstrapURLKeys: { apiKey: apiKey, language: language },
            defaultZoom: defaultZoom,
            center: center,
            searchBox: {
                apiParams: { places: {} }
            }
        };

        wrapper = TestUtils.mount(props, GoogleMap, props);
        chai.assert.equal(wrapper.find(SearchBox).length, 0, "SearchBox must be rendered.");
        wrapper.unmount();

        props = {
            bootstrapURLKeys: { apiKey: apiKey, language: language, libraries: "places" },
            defaultZoom: defaultZoom,
            center: center,
            searchBox: {
                apiParams: { places: {} }
            }
        };
        try {
            wrapper = TestUtils.mount(props, GoogleMap, props);
            chai.assert.equal(wrapper.find(SearchBox).length, 1, "SearchBox must be rendered.");
            wrapper.unmount();
        } catch (error) {
            chai.assert.equal("Cannot read property 'places' of undefined", error.message, "Must render searchBox and throw type error.");
        }
    });
});
