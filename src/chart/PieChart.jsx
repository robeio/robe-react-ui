import React, { PropTypes } from "react";
import { PieChart as Chart, Pie } from "recharts";
import BaseChart from "./BaseChart";

export default class PieChart extends BaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#PieChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Pie}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Pie.PropTypes,
            valueKey: PropTypes.string.isRequired
        })).isRequired
    };

    static defaultProps = {
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <Chart {...this.props.propsOfChart}>
                {this.__renderPies()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
        );
    }
    __renderPies(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let pieArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            pieArr.push(<Pie key={`pie-${i}`} {...propsOfChildren} />);
        }
        return pieArr;
    }

}
