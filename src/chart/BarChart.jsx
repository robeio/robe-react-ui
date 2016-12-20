import React, { PropTypes } from "react";
import { BarChart as Chart, Bar } from "recharts";
import BaseChart from "./BaseChart";

export default class BarChart extends BaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...BaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#BarChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Bar}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Bar.PropTypes,
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
                {this.__renderBars()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
        );
    }
    __renderBars(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let barArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            barArr.push(<Bar key={`bar-${i}`} {...propsOfChildren} />);
        }
        return barArr;
    }
}
