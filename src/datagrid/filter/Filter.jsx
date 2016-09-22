import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { Popover, Overlay } from "react-bootstrap";
import * as Input from "../../inputs";

export default class Filter extends ShallowComponent {
    static booleanData = [
        { text: "Hepsi", value: "all" },
        { text: "Evet", value: "true" },
        { text: "Hayır", value: "false" }
    ];

    constructor() {
        super();
        this.state = { filters: {} };
    }

    render() {
        let filterFields = this.__renderFilters(this.props.fields, this.props.visiblePopups);
        if (filterFields === undefined) {
            return (<span />);
        }
        return (<span>{filterFields}</span>);
    }

    __renderFilters = (fields: Array<Map>, visiblePopups: Map) => {
        let filterFields = [];
        let hasAtLeast1Filter = false;
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field.visible === false) {
                /* eslint-disable no-continue */
                continue;
            }
            let filterField = <span />;

            if (field.filter === true) {
                let colId = `tableColumn-${field.name}`;
                let show = visiblePopups[field.name] === true;
                let getColID = document.getElementById(colId);
                filterField = (
                    <Overlay
                        show={show} placement="top"
                        target={getColID}
                    >
                        <Popover
                            id="popover"
                            placement="top"
                        >
                            {this.__decideFilterField(field) }
                        </Popover>
                    </Overlay>);
                hasAtLeast1Filter = true;
            }
            filterFields.push(
                <span
                    key={field.name}
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
    };

    __decideFilterField(field) {
        let firstHandleChange;
        let secondHandleChange;
        switch (field.type) {
            case "bool":
                firstHandleChange = this.__handleChange.bind(undefined, field.name, field.type);
                return (<Input.RadioInput
                    id="popover"
                    data={Filter.booleanData}
                    value={this.state[field.name]}
                    dataValueField="value"
                    dataTextField="text"
                    showAlert={false}
                    onChange={firstHandleChange}
                />);
            case "number":
                firstHandleChange = this.__handleChange.bind(undefined, `${field.name}-min-`, field.type);
                secondHandleChange = this.__handleChange.bind(undefined, `${field.name}-max-`, field.type);
                return (<span id="popover">
                    <Input.DecimalInput
                        id="popover"
                        label="Başlangıç"
                        type="text"
                        key={field.name + "-min-"}
                        value={this.state[field.name + "-min-"]}
                        ref={field.name + "-min-"}
                        showAlert={false}
                        onChange={firstHandleChange}
                    />
                    <Input.DecimalInput
                        id="popover"
                        label="Bitiş"
                        type="text"
                        key={field.name + "-max-"}
                        value={this.state[`${field.name}-max-`]}
                        ref={field.name + "-max-"}
                        showAlert={false}
                        onChange={secondHandleChange}
                    />
                </span>);
            case "string":
                firstHandleChange = this.__handleChange.bind(undefined, field.name, field.type);
                return (
                    <Input.TextOnput
                        id="popover"
                        label="Değer"
                        type="text"
                        key={field.name}
                        ref={field.name}
                        value={this.state[field.name]}
                        showAlert={false}
                        onChange={firstHandleChange}
                    />
                );
            case "date":
                firstHandleChange = this.__handleChange.bind(undefined, `${field.name}-min-`, field.type);
                secondHandleChange = this.__handleChange.bind(undefined, `${field.name}-max-`, field.type);
                return (
                    <span id="popover">
                        <Input.DateInput
                            id="popover"
                            label="Başlangıç"
                            key={`${field.name} + "-min-`}
                            ref={`${field.name} + "-min-`}
                            value={this.state[`${field.name}-min-`]}
                            showAlert={false}
                            onChange={firstHandleChange}
                        />
                        <Input.DateInput
                            id="popover"
                            label="Bitiş"
                            key={`${field.name}-max-`}
                            ref={`${field.name}-max-`}
                            value={this.state[`${field.name}-max-`]}
                            showAlert={false}
                            onChange={secondHandleChange}
                        />
                    </span>
                );
            case "list":
                let dataTextField = field.dataTextField || "name";
                let dataValueField = field.dataValueField || "oid";
                let optionLabel = field.optionLabel || "<Lütfen Seçiniz>";
                firstHandleChange = this.__handleChange.bind(undefined, field.name, field.type);
                return (
                    <Input.SelectInput
                        id="popover"
                        label="Değer"
                        key={field.name}
                        ref={field.name}
                        value={this.state[field.name]}
                        dataTextField={dataTextField}
                        dataValueField={dataValueField}
                        optionLabel={optionLabel}
                        data={this.props.resources[field.name]}
                        showAlert={false}
                        onChange={firstHandleChange}
                    />
                );
            default:
                throw new Error("Unknown fields type !");
        }
    }

    __handleChange = (name, type, e) => {
        let state = this.state;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let filter = "";
        if (value !== undefined && value !== "") {
            switch (type) {
                case "bool":
                    if (value !== "all") {
                        filter += `${name}=${value}`;
                    }
                    break;
                case "number":
                    if (name.endsWith("-min-")) {
                        filter += `${name.substring(0, name.length - 5)}>=${value}`;
                    } else if (name.endsWith("-max-")) {
                        filter += `${name.substring(0, name.length - 5)}<=${value}`;
                    }
                    break;
                case "string":
                    if (name === "merchantOidRegistrationNumber" || name === "registrationNumber") {
                        filter += `${name}=${value}`;
                    } else {
                        filter += `${name}~=${value}`;
                    }
                    break;
                case "textarea":
                    filter += `${name}~=${value}`;
                    break;
                case "date":
                    if (name.endsWith("-min-")) {
                        filter += `${name.substring(0, name.length - 5)}>=${value}`;
                    } else if (name.endsWith("-max-")) {
                        filter += `${name.substring(0, name.length - 5)}<=${value}`;
                    }
                    break;
                case "list":
                    filter += `${name}=${value}`;
                    break;
                default:
                    throw new Error(`Unknown field type ! name: ${name} type:${type}`);
            }
        }

        state[name] = value;
        state.filters[name] = filter;
        this.setState(state);
        if (this.props.onChange) {
            this.props.onChange(state);
        }
        this.forceUpdate();
    };

    __handleClick(e) {
        let data = e.path;
        for (let i in data) {
            let item = data[i];
            if (item.id && item.id === "popover") {
                return;
            }
        }
        if (e.target.id === ("popover")) {
            return;
        }

        if (e.target.id.startsWith("tableColumn-")) {
            return;
        }

        if (this.props.hideFilters) {
            this.props.hideFilters();
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.__handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__handleClick, false);
    }
}
