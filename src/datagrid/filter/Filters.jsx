import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { Popover, Overlay } from "react-bootstrap";
import * as Input from "../../inputs";
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
                filterField = (
                    <Overlay show={show} placement="top" target={getColID} >
                        <Popover id="popover" placement="top" >
                            <Filter field={field} value={this.state[field.name]} onChange={this.__onChange} />
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

    __handleClick(e: Object) {
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

        if (e.target.id.startsWith("tableColumn")) {
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
