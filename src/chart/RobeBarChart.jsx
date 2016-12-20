import React, { PropTypes } from "react";
import { BarChart, Bar } from "recharts";
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
            ...BarChart.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Bar}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Bar.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired
    };

    static defaultProps = {
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <BarChart {...this.props.propsOfChart}>
                {this.__renderBars()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </BarChart>
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
