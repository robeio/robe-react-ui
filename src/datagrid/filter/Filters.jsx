import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { Popover, Overlay, Button, ButtonGroup } from "react-bootstrap";
import Filter from "./Filter";

export default class Filters extends ShallowComponent {
    static booleanData = [
        { text: "All", value: "all" },
        { text: "Yes", value: "true" },
        { text: "No", value: "false" }
    ];

    static propTypes: Map = {
        /**
         * Fields Configurations to show style on view.
         */
        fields: React.PropTypes.array.isRequired,

        /**
         * A map which contains names of the visible popups.
         */
        visiblePopups: React.PropTypes.object.isRequired,

        /**
         * Unique Id for the table.
         * It helps to open popups at the correct position in case of multiple table at one screen
         */
        idCount: React.PropTypes.number.isRequired,

        /**
         *The event to trigger on every filter value update.
         */
        onChange: React.PropTypes.func.isRequired
    }


    constructor() {
        super();
        this.state = {
            filters: {},
            visiblePopups: {}
        };
    }

    render(): Object {
        let filterFields = this.__renderFilters(this.props.fields, this.state.visiblePopups);
        if (filterFields === undefined) {
            return (<span />);
        }
        return (<span>{filterFields}</span>);
    }

    __renderFilters(fields: Array<Map>, visiblePopups: Map): Array {
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
                let colId = `tableColumn${this.props.idCount}-${field.name}`;
                let show = visiblePopups[field.name] === true;
                let getColID = document.getElementById(colId);
                let onClear = this.__onClear.bind(undefined, field.name);
                filterField = (
                    <Overlay show={show} placement="top" target={getColID} >
                        <Popover id="popover" placement="top" >
                            <Filter field={field} value={this.state[field.name]} onChange={this.__onChange} />
                            <ButtonGroup bsSize="xsmall" className="pull-right" style={{ marginBottom: "15px" }}>
                                <Button bsStyle="danger" onClick={onClear}>{this.props.clearButtonText}</Button>
                                <Button bsStyle="danger" onClick={this.__onClearAll}>{this.props.clearAllButtonText}</Button>
                            </ButtonGroup>
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
    }

    __onChange(name: string, value: any, filter: string) {
        let state = this.state;
        state[name] = value;
        state.filters[name] = filter;
        this.setState(state);
        this.forceUpdate();
        this.props.onChange();
    }

    __onClear(name: string) {
        this.__onChange(name, undefined);
    }

    __onClearAll() {
        let state = this.state;
        for (let key in state) {
            if (state.hasOwnProperty(key)) { // eslint-disable-line
                state[key] = undefined;
            }
        }
        state.filters = {};
        state.visiblePopups = {};
        this.setState(undefined);
        this.__hideFilters();
        this.props.onChange(true);
        this.forceUpdate();
    }

    __handleClick(e: Object) {
        let data = e.path;
        for (let i in data) { // eslint-disable-line
            let item = data[i];
            if (item.id && item.id === "popover") {
                return;
            }
        }
        let target = e.target;
        if (target.id === ("popover") ||
            target.id.indexOf("tableColumn") === 0 ||
            target.className.indexOf("react-datepicker") === 0) {
            return;
        }

        this.__hideFilters();
    }

    __hasOpenPopup(obj: Map): boolean {
        for (let prop in obj) {
            if (obj[prop] !== false) {
                return true;
            }
        }
        return false;
    }

    __hideFilters() {
        if (this.__hasOpenPopup(this.state.visiblePopups)) {
            this.setState({
                visiblePopups: {}
            });
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.__handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__handleClick, false);
    }
}
