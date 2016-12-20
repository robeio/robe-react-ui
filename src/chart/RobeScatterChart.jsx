import React, { PropTypes } from "react";
import { ScatterChart, Scatter, ZAxis } from "recharts";
import RobeBaseChart from "./RobeBaseChart";

export default class RobeScatterChart extends RobeBaseChart {

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
            ...ScatterChart.PropTypes
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Area}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Scatter.PropTypes,
            ...RobeBaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired,

        /**
         * {@link http://recharts.org/api/#YAxis}
         */
        propsOfZAxis: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...ZAxis.PropTypes
            }),
            PropTypes.bool
        ])
    };

    static defaultProps = {
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...RobeBaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <ScatterChart {...this.props.propsOfChart}>
                {this.__renderScatters()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderZAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </ScatterChart>
        );
    }
    __renderScatters(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let scatterArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            scatterArr.push(<Scatter key={`area-${i}`} {...propsOfChildren} />);
        }
        return scatterArr;
    }
    __renderZAxis(): Object {
        if (this.props.propsOfZAxis) {
            if (this.props.propsOfZAxis === true) {
                return <ZAxis />;
            }
            return (<ZAxis {...this.props.propsOfZAxis} />);
        }
        return null;
    }

}
