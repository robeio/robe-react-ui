import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { Input } from "inputs";
import NumericInput from "inputs/NumericInput";
import RadioInput from "inputs/RadioInput";
import Popover from "react-bootstrap/lib/Popover";
import Overlay from "react-bootstrap/lib/Overlay";

export default class Filter extends ShallowComponent {

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
        let filterFields = this.__renderFilters(this.props.columns, this.props.visiblePopups);
        if (filterFields === undefined) {
            return (<span></span>);
        }
        return (<span>{filterFields}</span>);
    }

    __renderFilters = (columns, visiblePopups) => {
        let filterFields = [];
        let hasAtLeast1Filter = false;
        for (let i = 0; i < columns.length; i++) {
            let column = columns[i];
            if (column.visible === false) {
                continue;
            }
            let filterField = <span></span>;
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
        switch (column.type) {
            case "bool":
                return (<Input.RadioInput
                    data={Filter.booleanData}
                    value={this.state[column.code]}
                    dataValueField="value"
                    dataTextField="text"
                    onChange={this.__handleChange.bind(undefined,column.code,column.type)}
                />
                );
            case "number":
                min = `${column.codecolumn.code}-max-`;
                max = `${column.codecolumn.code}-min-`;
                return (
                    <span>
                        <Input.NumericInput
                            label="Başlangıç"
                            type="text"
                            key={min}
                            value={this.state[min]}
                            ref={min}
                            onChange={this.__handleChange.bind(undefined, min, column.type)}
                        />
                        <Input.NumericInput
                            label="Bitiş"
                            type="text"
                            key={max}
                            value={this.state[max]}
                            ref={max}
                            onChange={this.__handleChange.bind(undefined, max, column.type)}
                        />
                    </span>);

            case "string":
                return (
                    <Input.BaseInput
                        label="Değer"
                        type="text"
                        key={column.code}
                        ref={column.code}
                        value={this.state[column.code]}
                        onChange={this.__handleChange.bind(undefined, column.code, column.type)}
                    />
                );
            case "date":
                min = `${column.code}-max-`;
                max = `${column.code}-min-`;
                return (
                    <span>
                        <Input.DateInput
                            label="Başlangıç"
                            key={min}
                            ref={min}
                            value={this.state[min]}
                            onChange={this.__handleChange.bind(undefined, min, column.type)}
                        />
                        <Input.DateInput
                            label="Bitiş"
                            key={max}
                            ref={max}
                            value={this.state[max]}
                            onChange={this.__handleChange.bind(undefined, max, column.type)}
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
                    if (code.endsWith("-min-")) {
                        filter += (`${code.substring(0, code.length - 5)}>=${value}`);
                    } else if (code.endsWith("-max-")) {
                        filter += (`${code.substring(0, code.length - 5)}<=${value}`);
                    }
                    break;
                case "string":
                    filter += (`${code}~=${value}`);
                    break;
                case "date":
                    if (code.endsWith("-min-")) {
                        filter += (`${code.substring(0, code.length - 5)}>=${value}`);
                    } else if (code.endsWith("-max-")) {
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
