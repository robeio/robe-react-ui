import React from "react";
import {ShallowComponent} from "robe-react-commons";
import BarChart from "robe-react-ui/lib/charts/BarChart";

let data = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 2000, private: 7000, protected: 2290},
    {name: "D", public: 2780, private: 3908, protected: 2000}
];
let meta = [
    {dataKey: "public", name: "Public", unit: "piece"},
    {dataKey: "private", name: "Private", unit: "piece"},
    {dataKey: "protected", name: "Protected", unit: "piece"}
];

export default class BarChartSample extends ShallowComponent {

    render():Object {
        return (
            <div>
                <div className="form-group">
                    <BarChart data={data} width={400} height={250} meta={meta}/>
                </div>
            </div>
        );
    }
}
