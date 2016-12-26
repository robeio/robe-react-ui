import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import {mount} from "enzyme";// eslint-disable-line
import GoogleMap from "googlemap/GoogleMap";// eslint-disable-line

let apiKey = "AIzaSyAY1o0OVVUKBFoVX84PQW5FuAkolw6kNeU";
let defaultZoom = 10;
let language = "tr";
let center = {lat: 41.017224, lng: 28.949146};

describe("googlemap/GoogleMap", () => {
    const getComponent = (props:Object):Object => {
        return (
            <GoogleMap {...props} />// eslint-disable-line
        );
    };

    it("render", () => {
        let props = {
            bootstrapURLKeys: {apiKey: apiKey, language: language, libraries:"places"},
            defaultZoom: defaultZoom,
            center: center
        };
        let wrapper = mount(getComponent(props));
        chai.assert.equal(wrapper.find(GoogleMap).length, 1);
    });
});
