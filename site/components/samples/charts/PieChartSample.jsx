import React from "react";
import {ShallowComponent} from "robe-react-commons";
import PieChart from "robe-react-ui/lib/charts/PieChart";

let data = [
    {
        value: 1000,
        label: "A",
        key: "0",
        unit: "ms"
    },
    {
        value: 2000,
        label: "B",
        key: "1",
        unit: "ms"
    },
    {
        value: 5000,
        label: "C",
        key: "3",
        unit: "ms"
    },
    {
        value: 2000,
        label: "D",
        key: "4",
        unit: "ms"
    },
    {
        value: 2000,
        label: "E",
        key: "5",
        unit: "ms"
    }
];


export default class PieChartSample extends ShallowComponent {

    render():Object {
        return (
            <div>
                <div className="form-group">
                    <PieChart size={250} data={data}/>
                </div>
            </div>
        );
    }
}

