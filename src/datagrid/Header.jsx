import React from "react";
import PropTypes from "prop-types";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
// import FaIcon from "../faicon/FaIcon";

export default class Header extends ShallowComponent {
    static filterStyle = { marginTop: "2px", color: "#bbbbbb" };
    static filterStyleSelected = { marginTop: "2px", color: "#85b1e0" };
    static sortStyle = { marginTop: "2px", color: "#bbbbbb" };
    static sortStyleSelected = { marginTop: "2px", color: "#85b1e0" };
    static propTypes: Map = {

        /**
         * Name of the column. Must be unique.
         */
        name: PropTypes.string.isRequired,
        /**
        * Field Configuration of the column.
        */
        field: PropTypes.object.isRequired,

        /**
         * OnClick event for the filter button.
         * */
        onFilterClick: PropTypes.func.isRequired,

        /**
         * Filterable or not
         * */
        filterable: PropTypes.bool

    }

    constructor(props: Object) {
        super();
        this.onFilterClick = props.onFilterClick.bind(undefined, props.field.name);
        this.onSortClick = props.onSortClick.bind(undefined, props.field.name);
    }

    render(): Object {
        let field = this.props.field;
        let filterStyle = Header.filterStyle;
        let sortStyle = Header.sortStyle;
        let sortIcon = "fa-sort";

        if (this.props.filter !== undefined && this.props.filter !== "") {
            filterStyle = Header.filterStyleSelected;
        }
        if (this.props.sort !== undefined && this.props.sort !== "") {
            switch (this.props.sort) {
                case "ASC":
                    sortIcon = "fa-sort-asc";
                    sortStyle = Header.sortStyleSelected;
                    break;
                case "DESC":
                    sortIcon = "fa-sort-desc";
                    sortStyle = Header.sortStyleSelected;
                    break;
                default:
                    sortIcon = "fa-sort";
            }
        }
        let sortBtn = field.sort !== undefined ? (
            <i
                id={this.props.name}
                className={`fa  ${sortIcon} pull-right`}
                aria-hidden="true"
                onClick={this.onSortClick}
                style={sortStyle}
                />
        ) : null;
        let filterBtn = field.filter === true && this.props.filterable === true ? (
            <i
                id={this.props.name}
                className="fa fa-filter pull-right"
                aria-hidden="true"
                onClick={this.onFilterClick}
                style={filterStyle}
                />
        ) : null;

        return (
            <th style={{fontWeight:"bold"}} key={field.name} >
                {field.label}
                {filterBtn}
                {sortBtn}
            </th>);
    }
}
