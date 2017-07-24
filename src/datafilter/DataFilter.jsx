import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {ShallowComponent, Application} from "robe-react-commons";
import {Nav, NavItem, InputGroup, Overlay, Popover} from "react-bootstrap";
import DatePicker from "../inputs/datepicker/DatePicker"
import FaIcon from "../faicon/FaIcon"
import momentjs from "moment";
import "./DataFilter.css";

export default class DataFilter extends ShallowComponent {

    static propTypes = {
        /**
         * placeholder text
         */
        placeholder: PropTypes.string,

        /**
         * Is component visible or not
         */
        visible: PropTypes.bool,

        /**
         * Fired when filter is changed
         */
        onChange: PropTypes.func,

        /**
         * Fields to populate selection list
         */
        fields: PropTypes.array
    };

    static defaultProps = {
        placeholder: "Filter",
        visible: true
    };

    operators = [
        "= " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", "="),
        "!= " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", "!="),
        "< " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", "<"),
        "<= " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", "<="),
        "> " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", ">"),
        ">= " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", ">="),
        "~= " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", "~="),
        "|= " + Application.i18n(DataFilter, "datafilter.DataFilter", "operators", "|=")
    ];
    phase = 0;
    filters = [];
    filter = {};
    inputRef;
    keyReset = false;

    constructor(props) {
        super(props);
        this.state = {
            displayValue: "",
            showSelect: false,
            showDatePicker: false,
            selectOffset: 10,
            nav: [],
            activeKey: 1
        };
    }

    render() {
        if (this.props.visible) {
            return (
                <div className="data-filter-multiple-select"
                     onClick={()=>{if(!this.state.showDatePicker) this.inputRef.focus()}}>
                    <span className="data-filter-close-all" onClick={this.__removeAllFilters}>
                        {this.state.displayValue || this.filters.length > 0 ?
                            <FaIcon code="fa-close" size="fa-sm" className="data-filter-close-all-fa"/> : ""}
                    </span>
                    {this.__renderFilters()}

                    <div className="data-filter-input-container">
                        <input
                            ref={(component) => { this.inputRef = component } }
                            onChange={this.__onChange}
                            value={this.state.displayValue}
                            placeholder={this.props.placeholder}
                            onFocus={this.__onFocus}
                            onKeyDown={this.__onKeyDown}
                            className="data-filter-input"
                        />
                        <div
                            ref="dataFilterMirror"
                            id="dataFilterMirror"
                            style={{position:"absolute",display:"block",zIndex:"-5000",opacity: 0,fontSize:"12px"}}
                        >
                        </div>
                        <Nav
                            ref="dataFilterSelect"
                            style={{marginLeft: this.state.selectOffset, display:this.state.showSelect?"block":"none"}}
                            role="tablist"
                            onSelect={this.__onSelectKey}
                            activeKey={this.state.activeKey}
                            className="data-filter-nav"
                        >
                            {this.state.nav}
                        </Nav>
                        <div className="data-filter-datepicker"
                             style={{marginLeft: this.state.selectOffset-20, display:this.state.showDatePicker?"block":"none"}}>
                            <DatePicker
                                onChange={this.__dateChange}
                                name="DatePicker"
                                maxWidth="200px"
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return <span />;
    }

    __renderFilters = () => {
        let valueList = [];
        for (let i = 0; i < this.filters.length; i++) {
            let filter = this.filters[i];
            if (filter !== undefined) {
                valueList.push(
                    <div key={i} className="data-filter-select-item">
                        <span
                            className="data-filter-select-label"> {filter.subject.label + " " + filter.operator + " " + filter.filter}</span>
                        <span className="data-filter-select-icon"
                              onClick={this.__removeFilter.bind(undefined,i)}>x</span>
                    </div>
                );
            }
        }
        return valueList;
    }

    __dateChange(e) {
        this.filter.filter = momentjs(e.target.parsedValue).format("YYYY-MM-DD");
        this.setState({
            displayValue: this.__generateFilterValue() + this.filter.filter
        });
    }

    __onChange(e) {
        if (!e.target.value.match("^"+this.__generateFilterValue())) return false;
        if (this.phase == 0) {
            this.setState({
                displayValue: e.target.value
            });
            this.__makeSelect(e.target.value);
        } else if (this.phase == 1) {
            this.setState({
                displayValue: e.target.value
            });
            this.__makeSelect(e.target.value.replace(this.__generateFilterValue(), ""));
        } else if (this.phase == 2) {
            this.setState({
                displayValue: e.target.value
            });
            this.__makeSelect(e.target.value.replace(this.__generateFilterValue(), ""));
        }
        return false;
    }

    __onKeyDown = (e) => {
        let code = e.keyCode || e.which;
        //console.log(code)
        if (code == 8) { //backspace
            if (this.phase == 0) {
                if (this.filters.length > 0 && this.state.displayValue.replace(this.__generateFilterValue(), "") == "") {
                    this.filter = {};
                    this.filter = this.filters[this.filters.length - 1];
                    this.filters.pop();
                    this.__filterChange();
                    this.phase = 2;
                    this.__makeSelect();
                    if(this.filter.subject.items)
                        this.__setValue(this.__generateFilterValue());
                    else
                        this.__setValue(this.__generateFilterValue() + this.filter.filter);
                    e.preventDefault();
                }
            }
            else if (this.phase == 1) {
                if (this.state.displayValue.replace(this.__generateFilterValue(), "") == "") {
                    this.phase = 0;
                    this.filter.subject = undefined;
                    this.__makeSelect();
                    this.__setValue(this.__generateFilterValue());
                    e.preventDefault();
                }
            }
            else if (this.phase == 2) {
                if (this.state.displayValue.replace(this.__generateFilterValue(), "") == "") {
                    this.phase = 1;
                    this.filter.operator = undefined;
                    this.__makeSelect();
                    this.__setValue(this.__generateFilterValue());
                    e.preventDefault();
                }
            }
        }
        else if (code == 38 || code == 40) { //up-down
            this.refs.dataFilterSelect.handleTabKeyDown(this.__onSelectKey, e);
        }
        else if (code == 13 || code == 222 || code == 32) {
            if (this.phase == 0 || this.phase == 1) {
                if (this.state.nav.length == 1) {
                    this.state.nav[0].props.onClick();
                    e.preventDefault();
                }
            }
            else if (this.phase == 2 && (code != 32 || this.filter.subject.type == "number" || this.filter.subject.items)) {
                if (this.state.showSelect && this.state.nav.length == 1) {
                    this.state.nav[0].props.onClick();
                    e.preventDefault();
                }
                else if (!this.state.showSelect) this.__onDecideKey();
            }
        }
        else if (code == 9) this.setState({showSelect: false});
        return false;
    }

    __removeFilter = (e) => {
        this.filters.splice(e, 1);
        this.__filterChange();
    }

    __removeAllFilters = () => {
        this.filters.length = 0;
        this.filter = {};
        this.phase = 0;
        this.__setValue(this.__generateFilterValue());
        this.__makeSelect();
        this.__filterChange();
    }

    __setValue = (value) => {
        this.setState({
            displayValue: value
        });
        this.inputRef.focus();
        this.__setMirror(value);
    }

    __setMirror = (value) => {
        let mirror = this.refs.dataFilterMirror;
        mirror.innerHTML = value.replace(/\s/g, "\u00a0");
        this.setState({
            selectOffset: mirror.offsetWidth + 10
        });
    }

    __onFocus() {
        this.__makeSelect();
    }

    __makeSelect = (filter) => {
        if (this.phase == 0) {
            let nav = [];
            let fields = this.props.fields;
            let item = {};
            for (let i = 0; i < fields.length; i++) {
                item = fields[i];
                if (item.filter == false) continue;
                if (item.type == "string" || item.type == "number" || item.type == "date" || item.type == "select" || item.type == "radio") {
                    if (!filter || filter == "" || item.label.toLowerCase().match("^"+filter.toLowerCase())) {
                        nav.push(<NavItem key={i+1} eventKey={i+1}
                                          onClick={this.__onDecideKey.bind(undefined,i)}>{item.label}</NavItem>);
                    }
                }
            }
            this.setState({
                nav: nav,
                showSelect: true,
                showDatePicker: false
            });
        }
        else if (this.phase == 1) {
            let nav = [];
            for (let i = 0; i < this.operators.length; i++) {
                if (!filter || filter == "" || this.operators[i].toLowerCase().match("^"+filter.toLowerCase())) {
                    nav.push(<NavItem key={i+1} eventKey={i+1}
                                      onClick={this.__onDecideKey.bind(undefined,i)}>{this.operators[i]}</NavItem>);
                }
            }
            this.setState({
                nav: nav,
                showSelect: true,
                showDatePicker: false
            });
        }
        else {
            if (this.filter.subject.type == "date") {
                this.setState({
                    showDatePicker: true,
                    showSelect: false
                });
            }
            else if (this.filter.subject.items) {
                let nav = [];
                let items = this.filter.subject.items;
                for (let i = 0; i < items.length; i++) {
                    if (!filter || filter == "" || items[i].text.toLowerCase().match("^"+filter.toLowerCase())) {
                        nav.push(<NavItem key={i+1} eventKey={i+1}
                                          onClick={this.__onDecideKey.bind(undefined,i)}>{items[i].text}</NavItem>);
                    }
                }
                this.setState({
                    nav: nav,
                    showSelect: true
                });
            }
            else {
                this.setState({
                    showSelect: false
                });
            }
        }
    }

    __onSelectKey = (e) => {
        if (this.keyReset) {
            e = 0;
            this.keyReset = false;
        }
        this.setState({
            activeKey: e
        });
    }

    __onDecideKey = (e) => {
        let key = (e == undefined ? this.state.activeKey - 1 : e);
        if (this.phase == 0) {
            this.filter["subject"] = this.props.fields[key];
            this.phase = 1;
            this.keyReset = true;
        } else if (this.phase == 1) {
            this.filter["operator"] = this.operators[key].split(" ")[0];
            this.phase = 2;
            this.keyReset = true;
        } else if (this.phase == 2) {
            if (this.filter.subject.items) {
                this.filter.filter = this.filter.subject.items[key].text;
                this.filter.filterValue = this.filter.subject.items[key].value;
            }
            else this.filter.filter = this.state.displayValue.replace(this.__generateFilterValue(), "");
            this.filters.push(this.filter);
            this.filter = {};
            this.phase = 0;
            this.__filterChange();
        }
        this.__makeSelect();
        this.__setValue(this.__generateFilterValue());
    }

    __filterChange = () => {
        let filters = [];
        for (let i = 0; i < this.filters.length; i++) {
            let filter = [];
            filter.push(this.filters[i].subject.name);
            filter.push(this.filters[i].operator);
            filter.push(this.filters[i].filterValue || this.filters[i].filter);
            filters.push(filter);
        }
        if (this.props.onChange !== undefined) this.props.onChange(filters);
    }

    __generateFilterValue() {
        let displayValue = "";
        if (this.filter.subject) displayValue += this.filter.subject.label + " ";
        if (this.filter.operator) displayValue += this.filter.operator + " " + (this.filter.subject.items || this.filter.subject.type == "number" ? "" : "\"");
        return displayValue;
    }

    __hideIfOut = (e) => {
        if (( document.activeElement !== ReactDOM.findDOMNode(this.inputRef) ) && (this.state.showSelect || this.state.showDatePicker)) {
            if (this.state.showDatePicker) {
                if(e != undefined && e.target.tagName.toLowerCase() == "select") return;
                this.setState({showSelect: false, showDatePicker: false});
                this.__onDecideKey();
                this.inputRef.focus();
            } else {
                this.setState({showSelect: false});
            }
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.__hideIfOut);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__hideIfOut);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }
}
