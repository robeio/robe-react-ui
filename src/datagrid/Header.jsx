import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
// import FaIcon from "../faicon/FaIcon";

export default class Header extends ShallowComponent {
    static propTypes: Map = {

        /**
         * Name of the column. Must be unique.
         */
        name: React.PropTypes.string.isRequired,
        /**
        * Field Configuration of the column.
        */
        field: React.PropTypes.object.isRequired,

        /**
         * OnClick event for the filter button.
         * */
        onFilterClick: React.PropTypes.func.isRequired


    }

    constructor(props: Object) {
        super();
        this.onFilterClick = props.onFilterClick.bind(undefined, props.field.name);
    }

    render(): Object {
        let field = this.props.field;
        let filterStyle = { marginTop: "2px", color: "#bbbbbb" };
        if (this.props.filter !== undefined && this.props.filter !== "") {
            filterStyle.color = "#85b1e0";
        }
        let filterBtn = field.filter === true ? (
            <i
                id={this.props.name}
                className="fa fa-filter pull-right"
                aria-hidden="true"
                onClick={this.onFilterClick}
                style={filterStyle}
            />
        ) : null;

        return (
            <th key={field.name} >
                {field.label}
                {filterBtn}
            </th>);
    }
}