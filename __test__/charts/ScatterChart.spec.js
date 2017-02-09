import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import {mount} from "enzyme";// eslint-disable-line
import TestUtils from "../TestUtils";
import ScatterChart from "charts/ScatterChart";// eslint-disable-line


const dataA = [
    {x: 1, y: 3, z: 6},
    {x: 2, y: 5, z: 9}
];

const dataB = [
    {x: 20, y: 26, z: 24},
    {x: 24, y: 29, z: 22}
];
const dataC = [
    {x: 59, y: 70, z: 34},
    {x: 80, y: 78, z: 67}
];
const dataD = [
    {x: 200, y: 260, z: 240},
    {x: 240, y: 290, z: 220}
];

const dataE = [
    {x: 2000, y: 2600, z: 2400},
    {x: 2400, y: 2900, z: 2200}
];

const data = [
    {name: "A", data: dataA},
    {name: "B", data: dataB},
    {name: "C", data: dataC},
    {name: "D", data: dataD},
    {name: "E", data: dataE}
];

let meta = [
    {dataKey: "y", unit: "cm"},
    {dataKey: "z", name: "Z"}
];

describe("charts/ScatterChart", () => {
    const getComponent = (props:Object):Object => {
        return (
            <ScatterChart {...props} />// eslint-disable-line
        );
    };

    it("render", () => {
        let props = {data: data, width: 400, height: 250, meta: meta};
        let wrapper = mount(getComponent(props));
        chai.assert.equal(wrapper.find(ScatterChart).length, 1);
    });
});
