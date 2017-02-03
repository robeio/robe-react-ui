import React from "react";
import {ShallowComponent} from "robe-react-commons";
import AreaChart from "robe-react-ui/lib/charts/AreaChart";

let data = [
    {name: "A", pb: 4000, pv: 2400, pr: 2400},
    {name: "B", pb: 3000, pv: 1398, pr: 2210},
    {name: "C", pb: 2000, pv: 9800, pr: 2290},
    {name: "D", pb: 2780, pv: 3908, pr: 2000},
    {name: "E", pb: 1890, pv: 4800, pr: 2181},
    {name: "F", pb: 2390, pv: 3800, pr: 2500},
    {name: "G", pb: 3490, pv: 4300, pr: 2100}
];
let areas = [
    {dataKey: "pb", name: "Public", unit: "piece"},
    {dataKey: "pr", name: "Protected", unit: "piece"},
    {dataKey: "pv", name: "Private", unit: "piece"}
];

export default class AreaChartSample extends ShallowComponent {

    render():Object {
        return (
            <div>
                <div className="form-group">
                    <AreaChart data={data} width={400} height={250} areas={areas}/>
                </div>
            </div>
        );
    }
}
