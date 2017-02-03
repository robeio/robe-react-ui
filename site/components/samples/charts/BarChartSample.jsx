import React from "react";
import {ShallowComponent} from "robe-react-commons";
import BarChart from "robe-react-ui/lib/charts/BarChart";

let data = [
    {name: "Page A", pb: 4900, pr: 1398, pv: 2210},
    {name: "Page B", pb: 3000, pr: 1398, pv: 2210},
    {name: "Page C", pb: 2000, pr: 4500, pv: 2290},
    {name: "Page D", pb: 2780, pr: 3908, pv: 2000},
];

let bars = [
    {dataKey: "pb", name: "Public", unit: "piece"},
    {dataKey: "pr", name: "Protected", unit: "piece"},
    {dataKey: "pv", name: "Private", unit: "piece"}
];

export default class BarChartSample extends ShallowComponent {

    render():Object {
        return (
            <div>
                <div className="form-group">
                    <BarChart data={data} width={400} height={250} bars={bars}/>
                </div>
            </div>
        );
    }
}
