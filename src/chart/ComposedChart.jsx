import React, { PropTypes } from "react";
import Chart from "recharts/lib/chart/ComposedChart";
import Area from "recharts/lib/cartesian/Area";
import Bar from "recharts/lib/cartesian/Bar";
import Line from "recharts/lib/cartesian/Line";
import BaseChart from "./BaseChart";

export default class ComposedChart extends BaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {


        ...BaseChart.DEFAULT_PROP_OF_TYPES_AXIS,
        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#ComposedChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

        /**
        * {@link http://recharts.org/api/#Area}
        */

        propsOfAreas: PropTypes.arrayOf(PropTypes.shape({
            ...Area.PropTypes,
            dataKey: PropTypes.string.isRequired
        })),

        /**
       * {@link http://recharts.org/api/#Bar}
       */

        propsOfBars: PropTypes.arrayOf(PropTypes.shape({
            ...Bar.PropTypes,
            dataKey: PropTypes.string.isRequired
        })),

        /**
       * {@link http://recharts.org/api/#Line}
       */

        propsOfLines: PropTypes.arrayOf(PropTypes.shape({
            ...Line.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHILDREN
        }))
    };

    static defaultProps = {
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_AXIS,
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS
    };

    render(): Object {
        return (
            <Chart {...this.props.propsOfChart}>
                {this.__renderAreas()}
                {this.__renderBars()}
                {this.__renderLines()}
                {this.__renderXAxis()}
                {this.__renderYAxis()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
        );
    }
    __renderAreas(): Object {
        let propsOfAreas = this.props.propsOfAreas;

        if (!propsOfAreas) {
            return null;
        }

        let areaArr = [];
        for (let i = 0; i < propsOfAreas.length; i++) {
            let propsOfArea = propsOfAreas[i];
            areaArr.push(<Area key={`area-${i}`} {...propsOfArea} />);
        }
        return areaArr;
    }
    __renderBars(): Object {
        let propsOfBars = this.props.propsOfBars;
        if (!propsOfBars) {
            return null;
        }

        let barArr = [];
        for (let i = 0; i < propsOfBars.length; i++) {
            let propsOfBar = propsOfBars[i];
            barArr.push(<Bar key={`bar-${i}`} {...propsOfBar} />);
        }
        return barArr;
    }

    __renderLines(): Object {
        let propsOfLines = this.props.propsOfLines;

        if (!propsOfLines) {
            return null;
        }

        let lineArr = [];
        for (let i = 0; i < propsOfLines.length; i++) {
            let propsOfLine = propsOfLines[i];
            lineArr.push(<Line key={`line-${i}`} {...propsOfLine} />);
        }
        return lineArr;
    }

}
