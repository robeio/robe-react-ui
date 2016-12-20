import React, { PropTypes } from "react";
import { AreaChart, Area } from "recharts";
import RobeBaseChart from "./RobeBaseChart";

export default class RobeAreaChart extends RobeBaseChart {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...RobeBaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...RobeBaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#AreaChart}
         */
        propsOfChart: PropTypes.shape({
            ...AreaChart.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Area}
         */
        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Area.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired
    };

    static defaultProps = {
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };
    render(): Object {
        return (
            <AreaChart {...this.props.propsOfChart}>
                {this.__renderAreas()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </AreaChart>
        );
    }
    __renderAreas(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let areaArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            areaArr.push(<Area key={`area-${i}`} {...propsOfChildren} />);
        }
        return areaArr;
    }

}
