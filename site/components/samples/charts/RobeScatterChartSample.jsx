import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { RobeScatterChart } from "robe-react-ui/lib/chart";

const data01 = [{ x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
                  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
                  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 }];
const data02 = [{ x: 200, y: 260, z: 240 }, { x: 240, y: 290, z: 220 },
                  { x: 190, y: 290, z: 250 }, { x: 198, y: 250, z: 210 },
                  { x: 180, y: 280, z: 260 }, { x: 210, y: 220, z: 230 }];
export default class RobeScatterChartSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <div className="form-group">
                    <RobeScatterChart
                        name="scatter-chart"
                        propsOfChart={{ width: 600, height: 400 }}
                        propsOfChildrens={[
                            { dataKey: "x", data: data01, fill: "red", shape: "star", name: "X" },
                            { dataKey: "y", data: data02, fill: "blue", shape: "triangle", name: "Y" }
                        ]}
                        propsOfToolTip
                        propsOfXAxis={{ dataKey: "x", unit: "cm", name: "X" }}
                        propsOfYAxis={{ dataKey: "y", unit: "cm", name: "Y" }}
                        propsOfZAxis={{ dataKey: "z", unit: "cm", range: [60, 400], name: "Z" }}
                        propsOfLegend
                        propsOfCartesianGrid
                    />
                </div>
                <a rel="noopener noreferrer" target="_blank" href="http://recharts.org/api/#ScatterChart">Read More About ScatterChart</a>
            </div>
        );
    }
}
