import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import { PieChart as Chart, Pie } from "recharts";
import { mount } from "enzyme";// eslint-disable-line
import PieChart from "chart/PieChart";// eslint-disable-line

let data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400, fill: "#8884d8" },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210, fill: "#83a6ed" },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290, fill: "#8dd1e1" },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000, fill: "#82ca9d" },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181, fill: "#a4de6c" },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500, fill: "#d0ed57" },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100, fill: "#ffc658" },
];

describe("chart/PieChart", () => {
    const getComponent = (props: Object): Object => {
        return (
            <PieChart {...props} />// eslint-disable-line
        );
    };

    it("render", () => {
        let props = { propsOfChart: { width: 600, height: 400 },
            propsOfChildrens: [
                { valueKey: "uv", cx: 200, cy: 200, outerRadius: 20, stroke: "red", fill: "red", data: data, label: true },
                { valueKey: "pv", cx: 200, cy: 200, innerRadius: 100, outerRadius: 120, stroke: "blue", fill: "blue", data: data, label: true }
            ]
        };
        let wrapper = mount(getComponent(props));
        chai.assert.equal(wrapper.find(PieChart).length, 1);
        chai.assert.equal(wrapper.find(Chart).length, 1);
        chai.assert.equal(wrapper.find(Pie).length, 2);
    });
});
