import React from "react";
import { ShallowComponent, Strings } from "robe-react-commons";
import Popover from "react-bootstrap/lib/Popover";
import Overlay from "react-bootstrap/lib/Overlay";
import { Input } from "../../inputs/index";

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
        { text: "Hepsi", value: "all" },
        { text: "Evet", value: "true" },
        { text: "Hayır", value: "false" }
    ];

    constructor(props: Object) {
        super(props);
        this.state = { filters: {} };
    }

    render() {
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
    __renderFilters(fields: Array, visiblePopups): Array{
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
                let colId = `tableColumn-${column.code}`;
                let show = visiblePopups[column.code] === true;
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
                key={column.code}
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

    __getColID = (id: string) => {
        return document.getElementById(id);
    }

    __decideFilterField = (column) => {
        let min = null;
        let max = null;
        let onChange;
        let maxOnChange;
        switch (column.type) {
            case "bool":
                onChange = this.__handleChange.bind(undefined,column.code,column.type);
                return (<Input.RadioInput
                    data={Filter.booleanData}
                    value={this.state[column.code]}
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
                onChange = this.__handleChange.bind(undefined, column.code, column.type);
                return (
                    <Input.BaseInput
                        label="Değer"
                        type="text"
                        key={column.code}
                        ref={column.code}
                        value={this.state[column.code]}
                        onChange={onChange}
                    />
                );
            case "date":
                min = `${column.code}-max-`;
                max = `${column.code}-min-`;
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

    __handleChange = (code, type, e) => {
        let state = this.state;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let filter = "";
        if (value !== undefined) {
            switch (type) {
                case "bool":
                    if (value !== "all") {
                        filter += (`${code}=${value}`);
                    }
                    break;
                case "number":
                    if (Strings.endsWith(code, "-min-")) {
                        filter += (`${code.substring(0, code.length - 5)}>=${value}`);
                    } else if (Strings.endsWith(code, "-max-")) {
                        filter += (`${code.substring(0, code.length - 5)}<=${value}`);
                    }
                    break;
                case "string":
                    filter += (`${code}~=${value}`);
                    break;
                case "date":
                    if (Strings.endsWith(code, "-min-")) {
                        filter += (`${code.substring(0, code.length - 5)}>=${value}`);
                    } else if (Strings.endsWith(code, "-max-")) {
                        filter += (`${code.substring(0, code.length - 5)}<=${value}`);
                    }
                    break;
                default :

            }
        }

        state[code] = value;
        state.filters[code] = filter;
        this.setState(state);
        if (this.props.onChange) {
            this.props.onChange(state);
        }
        this.forceUpdate();
    }
}
