import React from "react";
import {ShallowComponent, Generator, Class, Arrays, Maps} from "robe-react-commons";
import "./PieChart.css";
import Legend from "./Legend";

export default class PieChart extends ShallowComponent {

    static propTypes: Map = {
        /**
         * Data to be plotted on the chart
         */
        data: React.PropTypes.array,
        /**
         * Size of chart as px
         */
        size: React.PropTypes.number,
        /**
         * width the Legend
         */
        legendWidth: React.PropTypes.number
    };

    static defaultProps = {
        size: 400,
        data: []
    };

    legends = [];

    constructor(props: Object) {
        super(props);
        this.state = {
            data: this.props.data,
            clicked: false
        }
    }

    componentWillReceiveProps(nextProps: Object) {
        this.setState({data: nextProps.data})
    }

    render() {
        let data = this.state.data;
        let depth = this.__depthTree(data);
        this.legends = [];

        let c = 2 * depth + 1;
        let mRadius = (((this.props.size - 1) / 2) / c) * ( c - depth - 1);

        let root = depth > 1 ?
            (<circle
                fill="white"
                cx={this.props.size / 2}
                cy={this.props.size / 2}
                r={mRadius}/>) :
            undefined;

        return (
            <div className="rb-pie-chart" style={{width: this.props.size, height: this.props.size}}>
                <svg className="rb-pie-chart-svg">
                    {this.__renderPies(data, 360, 0, depth, depth - 1)}
                    {root}
                </svg>
                <div className="tooltip" id="tooltip"></div>
                <div className="rb-pie-chart-back-tool" style={{display: this.state.clicked ? "inherit" : "none"}}>
                    <a onClick={this.__onClickReset}>reset</a>
                </div>
                <Legend data={this.legends} width={this.props.legendWidth || this.props.size}/>
            </div>
        )
    }

    __renderPies(data: Array, percentage: Number, rotation: Number, depth: Number, depthIndex: Number) {
        if (!data || data.length <= 0)
            return [];

        let piesArr = [],
            sumValues = this.__sumValues(data),
            mRotation = rotation;

        let c = 2 * depth + 1;
        let mRadius = (((this.props.size - 1) / 2) / c) * ( c - depthIndex);

        data.map(function (item, key) {
            let mPercentage = (percentage * item.value) / sumValues;
            piesArr.push.apply(piesArr, this.__renderPies(item.children, mPercentage, mRotation, depth, depthIndex - 1));
            mRotation += mPercentage;
        }.bind(this));

        piesArr.push.apply(piesArr, this.__createPath(data, mRadius, percentage, rotation, depth, depthIndex));
        return piesArr;
    }

    __createPath(data: Array, radius: Number, percentage: Number, rotaion: Number, depth: Number, depthIndex: Number) {
        let sectors = [],
            mRadius = radius,
            origin = this.props.size / 2,
            mRotation = rotaion,
            max = this.__sumValues(data);

        data.map(function (item, key) {
            let value = item.value,
                mPercentage = (percentage * value) / max,
                isCircle = max === value,
                aCalc = ( mPercentage > 180 ) ? 360 - mPercentage : mPercentage,
                aRad = aCalc * Math.PI / 180,
                z = Math.sqrt(2 * mRadius * mRadius - ( 2 * mRadius * mRadius * Math.cos(aRad) )),
                x = aCalc <= 90 ? mRadius * Math.sin(aRad) : mRadius * Math.sin((180 - aCalc) * Math.PI / 180),
                y = Math.sqrt(z * z - x * x),
                Y = (origin - mRadius) + y,
                X = mPercentage <= 180 ? origin + x : origin - x,
                arcSweep = mPercentage <= 180 ? 0 : 1,
                V = origin - mRadius,
                fill = item.fill || this.__randColor(key + z),
                tooltip = item.label + "  " + value + " " + (item.unit || "") + "\n" + " " + (((mPercentage * 100) / 360).toFixed(2) + " %"),
                cursor = "default";

            item.fill = fill;
            if (depthIndex === (depth - 1)) {
                this.legends[item.key || item.label] = {fill: fill, label: item.label};
                cursor = "pointer";
            }
            if (isCircle)
                sectors.push(
                    <circle
                        key={item.key + key + mPercentage}
                        id={item.key}
                        fill={fill}
                        cx={origin}
                        cy={origin}
                        r={radius}
                        data={tooltip}
                        onMouseOver={this.__showTooltip}
                        onMouseOut={this.__hideTooltip}
                        onMouseMove={this.__moveTooltip}
                        onClick={this.__onClick.bind(undefined, item)}/>);

            else {
                sectors.push(
                    <path
                        key={item.key + key + mPercentage}
                        id={item.key}
                        transform={'rotate(' + mRotation + ', ' + origin + ', ' + origin + ')'}
                        d={'M ' + origin + ' ' + origin + ' V ' + V + ' A ' + mRadius + ' ' + mRadius + ' 1 ' + arcSweep + ' 1 ' + X + '  ' + Y + " z"}
                        fill={fill}
                        data={tooltip}
                        onMouseOver={this.__showTooltip}
                        onMouseOut={this.__hideTooltip}
                        onMouseMove={this.__moveTooltip}
                        style={{cursor: cursor}}
                        onClick={this.__onClick.bind(undefined, item)}>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={ 0 + ', ' + origin + ', ' + origin }
                            to={ mRotation + ', ' + origin + ', ' + origin }
                            dur="1s"
                            fill="freeze"
                        />
                    </path>);
            }
            mRotation = mRotation + mPercentage;
        }.bind(this));
        return sectors
    }

    __onClick(data: Object) {
        let arr = [];
        arr.push(data);
        let depth = this.__depthTree(arr);
        if (depth > 1) {
            this.setState({data: arr, clicked: true});
        }
    }

    __onClickReset() {
        this.setState({data: this.props.data, clicked: false})
    }

    __depthTree(data: Array) {
        if (!data || data.length <= 0) {
            return 0;
        }
        let depth = 0;
        for (let i = 0; i < data.length; i++) {
            depth = Math.max(depth, this.__depthTree(data[i].children));
        }
        return 1 + depth;
    }

    __sumValues(data: Array) {
        let max = 0;
        data.map(function (item, key) {
            let value = item.value;
            max += value;
        });
        return max;
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
        let colors = ["#F44336", "#2196F3", "#E91E63", "#00BCD4", "#673AB7", "#009688", "#3F51B5", "#4CAF50", "#FF9800", "#FF5722", "#FFC107"];
        if (index !== undefined) {
            return colors[parseInt(Math.abs(index % colors.length)) % (colors.length)];
        }
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }
}