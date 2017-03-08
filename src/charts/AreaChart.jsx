import React from "react";
import {ShallowComponent, Generator, Class, Arrays, Maps} from "robe-react-commons";
import "./AreaChart.css";
import Legend from "./Legend";

export default class AreaChart extends ShallowComponent {

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
            <div style={{marginLeft: 40}}>
                <div className="rb-area-chart" style={{width: this.props.width, height: this.props.height}}>
                    <svg className="rb-area-chart-svg">
                        {this.__renderAreas(this.props.data, this.props.meta)}
                    </svg>
                    <div className="tooltip" id="tooltip">Tooltip</div>
                    <div className="rb-area-chart-axis">
                        {this.__renderYAxis()}
                    </div>
                    <div className="rb-area-chart-axis">
                        {this.__renderXAxis()}
                    </div>
                </div>
                <Legend data={this.legends} width={this.props.legendWidth || this.props.width}/>
            </div>
        )
    }

    __renderAreas(data: Array, meta: Array) {
        let metaArr = [];
        let xAxisWidth = this.__xAxisWidth();
        let sumXAxisWidth = 0;

        for (let i = 0; i < data.length - 1; i++) {
            let item = data[i];
            let itemArr = [];
            let nexItem;

            if (data[i + 1]) {
                nexItem = data[i + 1];
            }

            let fields = this.__getFields(item);

            for (let j in fields) {

                let key = fields[j].key,
                    value = fields[j].value,
                    nextValue = value;

                if (nexItem) {
                    nextValue = nexItem[key];
                }

                let properties = Arrays.getValueByKey(meta, "dataKey", key);
                properties = properties === undefined ? {} : properties;
                let fill = properties.fill || this.__randColor(j);
                this.legends[properties.name || key] = {fill: fill, label: properties.name || key};

                let tooltip = item.name + "\n" + (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n",
                    tooltipNext = nexItem.name + "\n" + (properties.name || key) + " : " + nextValue + " " + (properties.unit || "") + "\n";

                let pointY = this.__pointY(value),
                    nextPointY = this.__pointY(nextValue);

                let points = sumXAxisWidth + " " + "0," + (sumXAxisWidth + xAxisWidth) + " " + "0," + (sumXAxisWidth + xAxisWidth) + " " + nextPointY + "," + sumXAxisWidth + " " + pointY;

                itemArr.push(
                    <polygon
                        key={key}
                        id={key}
                        fill={fill}
                        points={points}
                        data={tooltip + tooltipNext}
                        onMouseOver={this.__showTooltip}
                        onMouseOut={this.__hideTooltip}
                        onMouseMove={this.__moveTooltip}/>
                );
            }
            sumXAxisWidth += xAxisWidth;

            metaArr.push(
                <g key={i}>
                    {itemArr}
                </g>)
        }
        return metaArr;
    }


    __renderYAxis() {
        let maxYAxis = this.__maxYAxis();
        let height = this.props.height / 4;
        let axisArr = [];
        for (let i = 0; i < 4; i++) {
            axisArr.push(
                <div key={i}
                     id={parseInt((maxYAxis / 4) * (4 - i))}
                     className="rb-area-y-axis"
                     style={{height: height}}>
                </div>);
        }
        return axisArr;
    }

    __renderXAxis() {
        let data = this.props.data;
        let width = this.__xAxisWidth();
        let axisArr = [];
        for (let i = 0; i < data.length - 1; i++) {
            let item = data[i],
                nextItem = data[i + 1] || {};
            axisArr.push(
                <div key={i}
                     className="rb-area-x-axis"
                     data={item.name}
                     name={nextItem.name}
                     style={{width: width}}>
                </div>);
        }
        return axisArr;
    }

    __maxYAxis() {
        let data = this.props.data;
        let maxYAxis = 0;
        for (let i in data) {
            let fields = this.__getFields(data[i]);
            for (let j in fields) {
                if (fields[j].value > maxYAxis)
                    maxYAxis = fields[j].value;
            }
        }
        let a = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

        return (~~((maxYAxis + a - 1) / a) * a);
    }

    __xAxisWidth() {
        return (this.props.width - 1) / (this.props.data.length - 1);
    }

    __pointY(value: Number) {
        let maxYAxis = this.__maxYAxis();
        return ((this.props.height * ((value * 100) / maxYAxis)) / 100);
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
        let colors = ["#F44336", "#673AB7", "#2196F3", "#FF5722", "#9C27B0", "#FFC107", "#FF9800", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
        if (index !== undefined) {
            return colors[index % colors.length];
        }
        else {
            return colors[Math.floor(Math.random() * (colors.length - 1))];
        }
    }

}