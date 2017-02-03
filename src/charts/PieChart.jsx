import React from "react";
import {ShallowComponent, Generator, Class, Arrays, Maps} from "robe-react-commons";
import "./PieChart.css"
import Legend from "./Legend";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";

export default class PieChart extends ShallowComponent {

    static propTypes = {
        data: React.PropTypes.array,
        size: React.PropTypes.number
    };

    static defaultProps = {
        size: 400,
        data: []
    };

    legends = [];

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            clicked: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data})
    }

    render() {
        let data = this.state.data;
        let depth = this.__depthTree(data);
        this.legends = [];

        return (
            <div className="rb-pie-chart" style={{width:this.props.size,height:this.props.size}}>
                <div className="rb-pie-chart-back-tool" style={{display:this.state.clicked?"inherit":"none"}}>
                    <FaIcon code="fa-undo" onClick={this.__onClickReset}/>
                </div>
                <svg className="rb-pie-chart-svg">
                    {this.__renderPies(data, 360, 0, depth, depth - 1)}
                </svg>
                <div className="tooltip" id="tooltip"></div>
                <Legend data={this.legends} width={this.props.size}/>
            </div>
        )
    }

    __renderPies(data, percentage, rotation, depth, depthIndex) {
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

    __createPath(data, radius, percentage, rotaion, depth, depthIndex) {
        let sectors = [],
            mRadius = radius,
            origin = this.props.size / 2,
            mRotation = rotaion,
            max = this.__sumValues(data),
            circle = false;

        if (data.length <= 1)
            circle = true;

        data.map(function (item, key) {
            let value = item.value,
                mPercentage = (percentage * value) / max,
                aCalc = ( mPercentage > 180 ) ? 360 - mPercentage : mPercentage,
                aRad = aCalc * Math.PI / 180,
                z = Math.sqrt(2 * mRadius * mRadius - ( 2 * mRadius * mRadius * Math.cos(aRad) )),
                x = aCalc <= 90 ? mRadius * Math.sin(aRad) : mRadius * Math.sin((180 - aCalc) * Math.PI / 180),
                y = Math.sqrt(z * z - x * x),
                Y = (origin - mRadius) + y,
                X = mPercentage <= 180 ? origin + x : origin - x,
                arcSweep = mPercentage <= 180 ? 0 : 1,
                V = origin - mRadius,
                fill = item.fill || this.__randColor(mRotation),
                tooltip = item.label + "  " + value + " " + (item.unit || "") + "\n";

            item.fill = fill;
            if (depthIndex === (depth - 1)) {
                this.legends[item.key || item.label] = {fill: fill, label: item.label};
            }
            if (circle)
                sectors.push(
                    <circle
                        key={item.key+key+mPercentage}
                        id={item.key}
                        fill={fill}
                        cx={origin}
                        cy={origin}
                        r={radius}
                        data={tooltip}
                        onMouseOver={this.__showTooltip}
                        onMouseOut={this.__hideTooltip}
                        onMouseMove={this.__moveTooltip}
                        onClick={this.__onClick.bind(undefined,item)}/>);

            else {
                sectors.push(
                    <path
                        key={item.key+key+mPercentage}
                        id={item.key}
                        transform={'rotate(' + mRotation + ', ' + origin + ', ' + origin + ')'}
                        d={'M ' + origin + ' ' + origin + ' V ' + V + ' A ' + mRadius + ' ' + mRadius + ' 1 ' + arcSweep + ' 1 ' + X + '  ' + Y +" z"}
                        fill={fill}
                        data={tooltip}
                        onMouseOver={this.__showTooltip}
                        onMouseOut={this.__hideTooltip}
                        onMouseMove={this.__moveTooltip}
                        onClick={this.__onClick.bind(undefined,item)}>
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

    __onClick(data) {
        let arr = [];
        arr.push(data);
        this.setState({data: arr, clicked: true})
    }

    __onClickReset() {
        this.setState({data: this.props.data, clicked: false})
    }

    __depthTree(data) {
        if (!data || data.length <= 0)
            return 0;

        let count = 1;
        let childCount = 0;
        for (let i = 0; i < data.length; i++) {
            childCount = Math.max(childCount, this.__depthTree(data[i].children));
        }
        return count + childCount;
    }

    __sumValues(data) {
        let max = 0;
        data.map(function (item, key) {
            let value = item.value;
            max += value;
        });
        return max;
    }

    __showTooltip(evt) {
        if (this.tooltip === undefined) {
            this.tooltip = document.getElementById("tooltip");
        }
        this.tooltip.style.visibility = "visible";

        let tooltipText = evt.target.getAttribute("data");
        let fill = evt.target.getAttribute("fill");

        this.tooltip.innerHTML = tooltipText;
        this.tooltip.style.backgroundColor = fill;
    }

    __hideTooltip(evt) {
        if (this.tooltip === undefined)
            this.tooltip = document.getElementById("tooltip");
        this.tooltip.style.visibility = "hidden";
    }

    __moveTooltip(evt) {
        if (this.tooltip === undefined)
            this.tooltip = document.getElementById("tooltip");

        this.tooltip.style.left = (evt.clientX + 10) + "px";
        this.tooltip.style.top = (evt.clientY + 10) + "px";
    }

    __randColor(index) {
        let colors = ["#009688", "#4CAF50", "#3F51B5", "#FF9800", "#F44336", "#9C27B0", "#673AB7", "#FFC107", "#2196F3", "#FF5722", "#00796B"];
        if (index !== undefined) {
            return colors[parseInt(Math.abs(index)) % (colors.length)];
        }
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }
}