import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import {mount} from "enzyme";// eslint-disable-line
import TestUtils from "../TestUtils";
import PieChart from "charts/PieChart";// eslint-disable-line

let data = [
    {
        value: 1500,
        label: "A",
        key: "0",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "A1",
                key: "01"
            },
            {
                value: 2000,
                label: "A2",
                key: "02",
                unit: "ms"
            }
        ]
    },
    {
        value: 2500,
        label: "B",
        key: "1",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "B1",
                key: "11"
            },
            {
                value: 4000,
                label: "B2",
                key: "12",
                unit: "ms"
            },
            {
                value: 2000,
                label: "B3",
                key: "13"
            }
        ]
    },
    {
        value: 3000,
        label: "C",
        key: "3",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "C1",
                key: "31",
                unit: "ms"
            },
            {
                value: 2000,
                label: "C2",
                key: "32",
                unit: "ms"
            },
            {
                value: 1000,
                label: "C3",
                key: "33",
                unit: "ms"
            },
            {
                value: 2000,
                label: "C4",
                key: "34",
                unit: "ms"
            }
        ]
    }
];

describe("charts/PieChart", () => {
    const getComponent = (props:Object):Object => {
        return (
            <PieChart {...props} />// eslint-disable-line
        );
    };

    it("render", () => {
        let props = {
            size: 250,
            data: data
        };
        let wrapper = mount(getComponent(props));
        chai.assert.equal(wrapper.find(PieChart).length, 1);
    });
});
