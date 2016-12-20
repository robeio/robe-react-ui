import React, { PropTypes } from "react";
import { RadialBarChart, RadialBar } from "recharts";
import RobeBaseChart from "./RobeBaseChart";

export default class RobeRadialBarChart extends RobeBaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...RobeBaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#AreaChart}
         */
        propsOfChart: PropTypes.shape({
            ...RadialBarChart.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Area}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...RadialBar.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired
    };

    static defaultProps = {
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <RadialBarChart {...this.props.propsOfChart}>
                {this.__renderRadialBars()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </RadialBarChart>
        );
    }
    __renderRadialBars(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let radialBarArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            radialBarArr.push(<RadialBar key={`radial-bar-${i}`} {...propsOfChildren} />);
        }
        return radialBarArr;
    }

}
