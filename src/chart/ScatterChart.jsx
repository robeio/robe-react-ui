import React, { PropTypes } from "react";
import { ScatterChart as Chart, Scatter, ZAxis } from "recharts";
import BaseChart from "./BaseChart";

export default class ScatterChart extends BaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...BaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#ScatterChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Scatter}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Scatter.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        })).isRequired,

        /**
         * {@link http://recharts.org/api/#ZAxis}
         */
        propsOfZAxis: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...ZAxis.PropTypes
            }),
            PropTypes.bool
        ])
    };

    static defaultProps = {
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <Chart {...this.props.propsOfChart}>
                {this.__renderScatters()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderZAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
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
