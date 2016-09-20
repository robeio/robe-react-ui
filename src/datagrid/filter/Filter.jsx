import React from "react";
import { ShallowComponent, Strings } from "robe-react-commons";
import Popover from "react-bootstrap/lib/Popover";
import Overlay from "react-bootstrap/lib/Overlay";
import * as Input from "../../inputs/index";

export default class Filter extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * Fields Configurations to show style on view.
         */
        fields: React.PropTypes.array
    };

    /**
     * static props
     * @type {object}
     */
    static defaultProps = {
        /**
         * Fields Configurations to show style on view.
         */
        fields: []
    };

    static booleanData = [
        { text: "All", value: "all" },
        { text: "Yes", value: "true" },
        { text: "No", value: "false" }
    ];

    constructor(props: Object) {
        super(props);
        this.state = { filters: {} };
    }

    render(): Object {
        let filterFields = this.__renderFilters(this.props.fields, this.props.visiblePopups);
        if (filterFields === undefined) {
            return <span />;
        }
        return (<span>{filterFields}</span>);
    }

    /**
     *
     * @param {Array} fields
     * @param visiblePopups
     * @returns {*}
     * @private
     */
    __renderFilters(fields: Array, visiblePopups: Object): Array {
        let filterFields = [];
        let hasAtLeast1Filter = false;
        for (let i = 0; i < fields.length; i++) {
            let column = fields[i];
            /* eslint-disable no-continue */
            if (column.visible === false) {
                continue;
            }
            let filterField = <span />;
            if (column.filter === true) {
                let colId = `tableColumn-${column.name}`;
                let show = visiblePopups[column.name] === true;
                filterField = (
                    <Overlay
                        show={show}
                        placement="top"
                        target={this.__getColID(colId)}
                    >
                        <Popover id={i} placement="top">
                            {this.__decideFilterField(column)}
                        </Popover>
                    </Overlay>
                );
                hasAtLeast1Filter = true;
            }
            filterFields.push(
                <span
                    key={column.name}
                    style={{ verticalAlign: "bottom", border: "0px" }}
                >
                    {filterField}
                </span>
            );
        }
        if (!hasAtLeast1Filter) {
            return undefined;
        }
        return filterFields;
    }

    __getColID = (id: string): string => {
        return document.getElementById(id);
    }

    __decideFilterField = (column: Object): Object => {
        let min = null;
        let max = null;
        let onChange;
        let maxOnChange;
        switch (column.type) {
            case "bool":
                onChange = this.__handleChange.bind(undefined, column.name, column.type);
                return (<Input.RadioInput
                    data={Filter.booleanData}
                    value={this.state[column.name]}
                    dataValueField="value"
                    dataTextField="text"
                    onChange={onChange}
                />
                );
            case "number":
                min = `${column.codecolumn.code}-max-`;
                max = `${column.codecolumn.code}-min-`;
                onChange = this.__handleChange.bind(undefined, min, column.type);
                maxOnChange = this.__handleChange.bind(undefined, max, column.type);
                return (
                    <span>
                        <Input.NumericInput
                            label="Başlangıç"
                            type="text"
                            key={min}
                            value={this.state[min]}
                            ref={min}
                            onChange={onChange}
                        />
                        <Input.NumericInput
                            label="Bitiş"
                            type="text"
                            key={max}
                            value={this.state[max]}
                            ref={max}
                            onChange={maxOnChange}
                        />
                    </span>);

            case "string":
                onChange = this.__handleChange.bind(undefined, column.name, column.type);
                return (
                    <Input.BaseInput
                        label="Değer"
                        type="text"
                        key={column.name}
                        ref={column.name}
                        value={this.state[column.name]}
                        onChange={onChange}
                    />
                );
            case "date":
                min = `${column.name}-max-`;
                max = `${column.name}-min-`;
                onChange = this.__handleChange.bind(undefined, min, column.type);
                maxOnChange = this.__handleChange.bind(undefined, max, column.type);
                return (
                    <span>
                        <Input.DateInput
                            label="Başlangıç"
                            key={min}
                            ref={min}
                            value={this.state[min]}
                            onChange={onChange}
                        />
                        <Input.DateInput
                            label="Bitiş"
                            key={max}
                            ref={max}
                            value={this.state[max]}
                            onChange={maxOnChange}
                        />
                    </span>
                );
            default :
                throw new Error("Unknown Component ! ");
        }
    }

    __handleChange = (name: string, type: string, e: Object) => {
        let state = this.state;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let filter = "";
        if (value !== undefined) {
            switch (type) {
                case "bool":
                    if (value !== "all") {
                        filter += (`${name}=${value}`);
                    }
                    break;
                case "number":
                    if (Strings.endsWith(name, "-min-")) {
                        filter += (`${name.substring(0, name.length - 5)}>=${value}`);
                    } else if (Strings.endsWith(name, "-max-")) {
                        filter += (`${name.substring(0, name.length - 5)}<=${value}`);
                    }
                    break;
                case "string":
                    filter += (`${name}~=${value}`);
                    break;
                case "date":
                    if (Strings.endsWith(name, "-min-")) {
                        filter += (`${name.substring(0, name.length - 5)}>=${value}`);
                    } else if (Strings.endsWith(name, "-max-")) {
                        filter += (`${name.substring(0, name.length - 5)}<=${value}`);
                    }
                    break;
                default :

            }
        }

        state[name] = value;
        state.filters[name] = filter;
        this.setState(state);
        if (this.props.onChange) {
            this.props.onChange(state);
        }
        this.forceUpdate();
    }
}
