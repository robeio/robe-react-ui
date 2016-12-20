import React, { PropTypes } from "react";
import { PieChart, Pie } from "recharts";
import RobeBaseChart from "./RobeBaseChart";

export default class RobePieChart extends RobeBaseChart {

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
            ...PieChart.PropTypes,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Area}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Pie.PropTypes,
            valueKey: PropTypes.string.isRequired
        })).isRequired
    };

    static defaultProps = {
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <PieChart {...this.props.propsOfChart}>
                {this.__renderPies()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </PieChart>
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
