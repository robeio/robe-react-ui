import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DatePicker from "robe-react-ui/lib/inputs/datepicker/DatePicker";
import {Grid, Row, Col} from "react-bootstrap";


export default class DatePickerSample extends ShallowComponent {

    constructor(props:Object) {
        super(props);
        this.state = {
            DatePicker1: new Date().getTime(),
            DatePicker2: new Date().getTime()
        };
    }


    render():Object {
        return (
            <div>
                <div>
                    <DatePicker
                        onChange={this.__handleChange}
                        label="Locale-EN"
                        name="DatePicker1"
                        locale="en"
                        value={this.state.DatePicker1}
                        maxWidth="200px"
                    />
                    <div className="text-center">{new Date(this.state.DatePicker1).toLocaleDateString("en")}</div>
                </div>
                <div>
                    <DatePicker
                        onChange={this.__handleChange}
                        label="Locale-TR"
                        name="DatePicker2"
                        locale="tr"
                        value={this.state.DatePicker2}
                        maxWidth="200px"
                    />
                    <div
                        className="text-center">{new Date(this.state.DatePicker2).toLocaleDateString("tr")}</div>
                </div>
            </div>
        );
    }

    __handleChange(e:Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    }

}

