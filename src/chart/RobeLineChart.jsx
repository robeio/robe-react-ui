import React, { PropTypes } from "react";
import { LineChart, Line } from "recharts";
import RobeBaseChart from "./RobeBaseChart";

export default class RobeBarChart extends RobeBaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...RobeBaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...RobeBaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#BarChart}
         */
        propsOfChart: PropTypes.shape({
            ...LineChart.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

        /**
        * {@link http://recharts.org/api/#Bar}
        */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Line.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired
    };

    static defaultProps = {
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <LineChart {...this.props.propsOfChart}>
                {this.__renderLines()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </LineChart>
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
