import React, { PropTypes } from "react";
import { AreaChart as Chart, Area } from "recharts";
import BaseChart from "./BaseChart";

export default class AreaChart extends BaseChart {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...BaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#AreaChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Area}
         */
        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Area.PropTypes,
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
                {this.__renderAreas()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
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
