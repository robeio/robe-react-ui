import React, { PropTypes } from "react";
import { RadialBarChart as Chart, RadialBar } from "recharts";
import RadarChart from "./RadarChart";

export default class RadialBarChart extends RadarChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...RadarChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#RadialBarChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            ...RadarChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#RadialBar}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...RadialBar.PropTypes,
            ...RadarChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired
    };

    static defaultProps = {
        ...RadarChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <Chart {...this.props.propsOfChart}>
                {this.__renderRadialBars()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
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
