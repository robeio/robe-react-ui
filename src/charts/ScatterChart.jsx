import React from "react";
import {ShallowComponent, Generator, Class, Arrays, Maps} from "robe-react-commons";
import "./ScatterChart.css";
import Legend from "./Legend";

export default class ScatterChart extends ShallowComponent {

    static propTypes: Map = {
        /**
         * Width for chart as px
         */
        width: React.PropTypes.number,
        /**
         * Height for chart as px
         */
        height: React.PropTypes.number,
        /**
         * Data to be plotted on the chart
         */
        data: React.PropTypes.array,
        /**
         * Change to be made for the given data
         */
        meta: React.PropTypes.array,
        /**
         * width the Legend
         */
        legendWidth: React.PropTypes.number
    };

    static defaultProps = {
        width: 500,
        height: 300,
        data: [],
        meta: []
    };

    legends = [];

    constructor(props: Object) {
        super(props)
    }

    render() {
        return (
            <div id="scatter" style={{marginLeft: 40}}>
                <div className="rb-scatter-chart" style={{width: this.props.width, height: this.props.height}}>
                    <svg className="rb-scatter-chart-svg">
                        {this.__renderScatters(this.props.data, this.props.meta)}
                    </svg>
                    <div className="tooltip" id="tooltip"></div>
                    <div className="rb-scatter-chart-axis">
                        {this.__renderYAxis()}
                    </div>
                    <div className="rb-scatter-chart-axis">
                        {this.__renderXAxis()}
                    </div>
                </div>
                <Legend data={this.legends} width={this.props.legendWidth || this.props.width}/>
            </div>
        )
    }

    __renderScatters(data: Array, meta: Array) {
        let metaArr = [];
        for (let i in data) {
            let item = data[i];
            for (let j in item.data) {
                let child = item.data[j],
                    cx = this.__pointX(child.x),
                    cy = this.__pointY(child.y),
                    fill = item.fill || this.__randColor(i),
                    tooltip = item.name + "\n",
                    fields = this.__getFields(item.data[j]);

                for (let f in fields) {
                    let key = fields[f].key,
                        value = fields[f].value,
                        properties = Arrays.getValueByKey(meta, "dataKey", key);

                    properties = properties === undefined ? {} : properties;
                    tooltip += (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n";
                }
                this.legends[i] = {fill: fill, label: item.name};
                metaArr.push(
                    <circle
                        key={i + " " + j}
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill={fill}
                        data={tooltip}
                        onMouseOver={this.__showTooltip}
                        onMouseOut={this.__hideTooltip}
                        onMouseMove={this.__moveTooltip}/>);

            }
        }
        return metaArr;
    }


    __renderYAxis() {
        let max = this.__maxAxis();
        let height = this.props.height / 4;
        let axisArr = [];
        for (let i = 0; i < 4; i++) {
            axisArr.push(
                <div key={i}
                     id={parseInt((max.y / 4) * (4 - i))}
                     className="rb-scatter-y-axis"
                     style={{height: height}}>
                </div>);
        }
        return axisArr;
    }

    __renderXAxis() {
        let max = this.__maxAxis();
        let width = (this.props.width - 1) / 5;
        let axisArr = [];
        for (let i = 0; i < 5; i++) {
            axisArr.push(
                <div key={i}
                     id={parseInt((max.x / 5) * (i + 1))}
                     className="rb-scatter-x-axis"
                     style={{width: width}}>
                </div>);
        }
        return axisArr;
    }


    __maxAxis() {
        let data = this.props.data;
        let maxYAxis = 0;
        let maxXAxis = 0;
        for (let i in data) {
            let item = data[i];
            for (let j in item.data) {
                let fields = this.__getFields(item.data[j]);
                for (let f in fields) {
                    if (fields[f].key === "x" && fields[f].value > maxXAxis)
                        maxXAxis = fields[f].value;
                    if (fields[f].key === "y" && fields[f].value > maxYAxis)
                        maxYAxis = fields[f].value;
                }
            }
        }
        let x = maxXAxis > 1000 ? 1000 : maxXAxis > 100 ? 100 : maxXAxis > 40 ? 40 : maxXAxis > 10 ? 10 : 1;
        let y = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

        let max = {
            x: (~~((maxXAxis + x - 1) / x) * x),
            y: (~~((maxYAxis + y - 1) / y) * y)
        };

        return max;
    }

    __pointY(value: Number) {
        let max = this.__maxAxis();
        return this.props.height - ((this.props.height * ((value * 100) / max.y)) / 100);
    }

    __pointX(value: Number) {
        let max = this.__maxAxis();
        return ((this.props.width * ((value * 100) / max.x)) / 100);
    }

    __getFields(data: Object) {
        let arr = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === "name" || key === "fill" || key === "unit") {
                    continue;
                }
                arr.push({
                    value: data[key],
                    key: key
                });
            }
        }
        return arr;
    }

    __showTooltip(e: Object) {
        if (this.tooltip === undefined) {
            this.tooltip = document.getElementById("tooltip");
        }
        this.tooltip.style.visibility = "visible";

        let tooltipText = e.target.getAttribute("data");
        let fill = e.target.getAttribute("fill");

        this.tooltip.innerHTML = tooltipText;
        this.tooltip.style.backgroundColor = fill;
    }

    __hideTooltip(e: Object) {
        if (this.tooltip === undefined)
            this.tooltip = document.getElementById("tooltip");
        this.tooltip.style.visibility = "hidden";
    }

    __moveTooltip(e: Object) {
        if (this.tooltip === undefined)
            this.tooltip = document.getElementById("tooltip");

        this.tooltip.style.left = (e.clientX + 10) + "px";
        this.tooltip.style.top = (e.clientY + 10) + "px";
    }

    __randColor(index: Number) {
        let colors = ["#F44336", "#FF9800", "#FF5722", "#9C27B0", "#673AB7", "#2196F3", "#FFC107", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
        if (index !== undefined) {
            return colors[index % colors.length];
        }
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }
}