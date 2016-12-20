import React, { PropTypes } from "react";
import { LineChart as Chart, Line } from "recharts";
import BaseChart from "./BaseChart";

export default class LineChart extends BaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...BaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#LineChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

        /**
        * {@link http://recharts.org/api/#Line}
        */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Line.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired
    };

    static defaultProps = {
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <Chart {...this.props.propsOfChart}>
                {this.__renderLines()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
        );
    }
    __renderLines(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let lineArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            lineArr.push(<Line key={`line-${i}`} {...propsOfChildren} />);
        }
        return lineArr;
    }
}
