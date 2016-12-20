import React from "react"; // eslint-disable-line
import chai from "chai";// eslint-disable-line
import { RadarChart, Radar } from "recharts";
import { mount } from "enzyme";// eslint-disable-line
import RobeRadarChart from "chart/RobeRadarChart";// eslint-disable-line

let data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400, fill: "#8884d8" },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210, fill: "#83a6ed" },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290, fill: "#8dd1e1" },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000, fill: "#82ca9d" },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181, fill: "#a4de6c" },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500, fill: "#d0ed57" },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100, fill: "#ffc658" },
];

describe("chart/RobeRadarChart", () => {
    const getComponent = (props: Object): Object => {
        return (
            <RobeRadarChart {...props} />// eslint-disable-line
        );
    };

    it("render", () => {
        let props = { propsOfChart: { width: 600, height: 400, data: data },
            propsOfChildrens: [{ dataKey: "uv", stroke: "red", fill: "red", fillOpacity: 0.6 }, { dataKey: "pv", stroke: "blue", fill: "blue", fillOpacity: 0.6 }],
            propsOfPolarAngleAxis: { dataKey: "name" }
        };
        let wrapper = mount(getComponent(props));
        chai.assert.equal(wrapper.find(RobeRadarChart).length, 1);
        chai.assert.equal(wrapper.find(RadarChart).length, 1);
        chai.assert.equal(wrapper.find(Radar).length, 2);
    });
});
