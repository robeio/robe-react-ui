import React, { PropTypes } from "react";
import { ShallowComponent } from "robe-react-commons";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default class RobeBaseChart extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static DEFAULT_PROP_OF_TYPES_AXIS: Map = {

        /**
         * {@link http://recharts.org/api/#YAxis}
         */
        propsOfXAxis: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...XAxis.PropTypes
            }),
            PropTypes.bool
        ]),

        /**
         * {@link http://recharts.org/api/#YAxis}
         */
        propsOfYAxis: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...YAxis.PropTypes
            }),
            PropTypes.bool
        ])
    };

    static DEFAULT_PROP_OF_GENERAL_COMPONENTS: Map = {
        /**
         * {@link http://recharts.org/api/#Tooltip}
         */
        propsOfToolTip: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...Tooltip.PropTypes
            }),
            PropTypes.bool
        ]),
        /**
         * {@link http://recharts.org/api/#CartesianGrid}
         */
        propsOfCartesianGrid: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...CartesianGrid.PropTypes
            }),
            PropTypes.bool
        ]),

        /**
         * {@link http://recharts.org/api/#Legend}
         */
        propsOfLegend: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...Legend.PropTypes
            }),
            PropTypes.bool
        ])
    };

    static DEFAULT_PROP_TYPES_OF_CHART: Map= {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        data: PropTypes.arrayOf(PropTypes.object)
    };

    static DEFAULT_PROP_TYPES_OF_CHILDREN: Map= {
        dataKey: PropTypes.string.isRequired
    };


    static DEFAULT_PROPS_VALUE_OF_AXIS = {
        propsOfXAxis: false,
        propsOfYAxis: false
    };

    static DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS = {
        propsToolTip: false,
        propsOfCartesianGrid: false,
        propsOfLegend: false
    };

    render(): Object {
        return new Error("override render() method");
    }
    __renderXAxis(): Object {
        if (this.props.propsOfXAxis) {
            if (this.props.propsOfXAxis === true) {
                return <XAxis />;
            }
            return (<XAxis {...this.props.propsOfXAxis} />);
        }
        return null;
    }
    __renderYAxis(): Object {
        if (this.props.propsOfYAxis) {
            if (this.props.propsOfYAxis === true) {
                return <YAxis />;
            }
            return (<YAxis {...this.props.propsOfYAxis} />);
        }
        return null;
    }

    __renderToolTip(): Object {
        if (this.props.propsOfToolTip) {
            if (this.props.propsOfToolTip === true) {
                return <Tooltip />;
            }
            return (<Tooltip {...this.props.propsOfToolTip} />);
        }
        return null;
    }
    __renderCartesianGrid(): Object {
        if (this.props.propsOfCartesianGrid) {
            if (this.props.propsOfCartesianGrid === true) {
                return <CartesianGrid />;
            }
            return (<CartesianGrid {...this.props.propsOfCartesianGrid} />);
        }
        return null;
    }

    __renderLegend(): Object {
        if (this.props.propsOfLegend) {
            if (this.props.propsOfLegend === true) {
                return <Legend />;
            }
            return (<Legend {...this.props.propsOfLegend} />);
        }
        return null;
    }
}
