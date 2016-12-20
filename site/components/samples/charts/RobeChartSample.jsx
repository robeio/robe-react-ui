import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { RobeAreaChart, RobeBarChart, RobeLineChart,
    RobeComposedChart, RobePieChart, RobeRadarChart,
    RobeRadialBarChart, RobeScatterChart } from "robe-react-ui/lib/chart";

let data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400, fill: "#8884d8" },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210, fill: "#83a6ed" },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290, fill: "#8dd1e1" },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000, fill: "#82ca9d" },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181, fill: "#a4de6c" },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500, fill: "#d0ed57" },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100, fill: "#ffc658" },
];
export default class RobeChartSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="area-chart" className="control-label">Area Chart</label>
                    <RobeAreaChart
                        name="area-chart"
                        propsOfChart={{ width: 600, height: 400, data: data }}
                        propsOfChildrens={[{ dataKey: "uv", stroke: "red", fill: "red" }, { dataKey: "pv", stroke: "blue", fill: "blue" }]}
                        propsOfXAxis={{ dataKey: "name" }}
                        propsOfYAxis propsOfToolTip propsOfCartesianGrid propsOfLegend
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bar-chart" className="control-label">Bar Chart</label>
                    <RobeBarChart
                        name="bar-chart"
                        propsOfChart={{ width: 600, height: 400, data: data }}
                        propsOfChildrens={[{ dataKey: "uv", stroke: "red", fill: "red" }, { dataKey: "pv", stroke: "blue", fill: "blue" }]}
                        propsOfXAxis={{ dataKey: "name" }}
                        propsOfYAxis propsOfToolTip propsOfCartesianGrid propsOfLegend
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="line-chart" className="control-label">Line Chart</label>
                    <RobeLineChart
                        name="line-chart"
                        propsOfChart={{ width: 600, height: 400, data: data }}
                        propsOfChildrens={[{ dataKey: "uv", stroke: "red", fill: "red" }, { dataKey: "pv", stroke: "blue", fill: "blue" }]}
                        propsOfXAxis={{ dataKey: "name" }}
                        propsOfYAxis propsOfToolTip propsOfCartesianGrid propsOfLegend
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="composed-chart" className="control-label">Composed Chart</label>
                    <RobeComposedChart
                        name="composed-chart"
                        propsOfChart={{ width: 600, height: 400, data: data }}
                        propsOfAreas={[{ dataKey: "uv", stroke: "red", fill: "red" }]}
                        propsOfBars={[{ dataKey: "pv", stroke: "blue", fill: "blue" }]}
                        propsOfLines={[{ dataKey: "amt", stroke: "yellow", fill: "yellow" }]}
                        propsOfXAxis={{ dataKey: "amt" }}
                        propsOfYAxis propsOfToolTip propsOfCartesianGrid propsOfLegend
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pie-chart" className="control-label">Pie Chart</label>
                    <RobePieChart
                        name="pie-chart"
                        propsOfChart={{ width: 600, height: 400 }}
                        propsOfChildrens={[
                            { valueKey: "uv", cx: 200, cy: 200, outerRadius: 20, stroke: "red", fill: "red", data: data, label: true },
                            { valueKey: "pv", cx: 200, cy: 200, innerRadius: 100, outerRadius: 120, stroke: "blue", fill: "blue", data: data, label: true }
                        ]}
                        propsOfToolTip
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="radar-chart" className="control-label">Radar Chart</label>
                    <RobeRadarChart
                        name="radar-chart"
                        propsOfChart={{ width: 600, height: 400, data: data }}
                        propsOfChildrens={[{ name: "UV", dataKey: "uv", stroke: "red", fill: "red", fillOpacity: 0.6 }, { dataKey: "pv", stroke: "blue", fill: "blue", fillOpacity: 0.6 }]}
                        propsOfToolTip propsOfPolarGrid propsOfPolarRadiusAxis propsOfPolarAngleAxis={{ dataKey: "name" }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="radar-chart" className="control-label">RadialBarChart Chart</label>
                    <RobeRadialBarChart
                        name="radar-chart"
                        propsOfChart={{ width: 600, height: 400, data: data, cx: 150, cy: 150, innerRadius: 20, outerRadius: 140, barSize: 10 }}
                        propsOfChildrens={[
                            { dataKey: "uv", startAngle: 90, endAngle: -270, minAngle: 15, label: true, background: true, clockWise: true },
                            { dataKey: "pv", startAngle: 90, endAngle: 270, minAngle: 15, label: true, background: true, clockWise: true }
                        ]}
                        propsOfToolTip
                        propsOfLegend={{ iconSize: 10, width: 120, height: 140, layout: "vertical", verticalAlign: "middle", align: "right" }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="scatter-chart" className="control-label">Scatter Chart</label>
                    <RobeScatterChart
                        name="scatter-chart"
                        propsOfChart={{ width: 600, height: 400 }}
                        propsOfChildrens={[
                            { dataKey: "uv", data: data, fill: "red", shape: "star", name: "UV" },
                            { dataKey: "pv", data: data, fill: "blue", shape: "triangle", name: "PV" },
                            { dataKey: "amt", data: data, fill: "green", shape: "triangle", name: "AMT" }
                        ]}
                        propsOfToolTip
                        propsOfXAxis={{ dataKey: "uv", unit: "cm", name: "UV" }}
                        propsOfYAxis={{ dataKey: "pv", unit: "cm", name: "PV" }}
                        propsOfZAxis={{ dataKey: "amt", unit: "cm", range: [60, 400], name: "AMT" }}
                        propsOfLegend
                        propsOfCartesianGrid
                    />
                </div>
            </div>
        );
    }
}
