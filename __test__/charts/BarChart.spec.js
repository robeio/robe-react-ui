import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import TestUtils from "../TestUtils";
import {mount} from "enzyme";// eslint-disable-line
import BarChart from "charts/BarChart";// eslint-disable-line

let data1 = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 3000, private: 1398, protected: 2210},
    {name: "D", public: 3000, private: 1398, protected: 2210},
    {name: "E", public: 3000, private: 1398, protected: 2210},
    {name: "F", public: 3000, private: 1398, protected: 2210}
];

let data2 = [
    {name: "A", public: 400, private: 240, protected: 240},
    {name: "B", public: 300, private: 139, protected: 220}
];

let data3 = [
    {name: "A", public: 50, private: 24, protected: 24},
    {name: "B", public: 30, private: 80, protected: 99}
];

let data4 = [
    {name: "A", public: 40, private: 24, protected: 24},
    {name: "B", public: 30, private: 13, protected: 22}
];

let data5 = [
    {name: "A", public: 4, private: 2, protected: 2, none: 0},
    {name: "B", public: 3, private: 1, protected: 2, none: 0}
];

let meta = [
    {dataKey: "public", unit: "piece"},
    {dataKey: "private", name: "Private"},
    {dataKey: "protected", fill: "#fff"}

];
describe("charts/BarChart", () => {
    const getComponent = (props:Object):Object => {
        return (
            <BarChart {...props} />
        );
    };

    it("render", () => {
        let wrapper1 = mount(getComponent({width: 500, height: 300, data: data1, meta: meta}));
        chai.assert.equal(wrapper1.find(BarChart).length, 1);

        let wrapper2 = mount(getComponent({width: 500, height: 300, data: data2, meta: meta}));
        chai.assert.equal(wrapper2.find(BarChart).length, 1);

        let wrapper3 = mount(getComponent({width: 500, height: 300, data: data3, meta: meta}));
        chai.assert.equal(wrapper3.find(BarChart).length, 1);

        let wrapper4 = mount(getComponent({width: 500, height: 300, data: data4, meta: meta}));
        chai.assert.equal(wrapper4.find(BarChart).length, 1);

        let wrapper5 = mount(getComponent({width: 500, height: 300, data: data5, meta: meta}));
        chai.assert.equal(wrapper5.find(BarChart).length, 1);

    });
});
