import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TimePicker from "robe-react-ui/lib/inputs/timepicker/TimePicker";
import {ShallowComponentStore, LocalEndPoint} from "robe-react-commons";

import {Grid, Row, Col} from "react-bootstrap";


export default class TimePickerSample extends ShallowComponent {


    constructor(props:Object) {
        super(props);
        this.state = {
            TimePicker: new Date()
        };
    }


    render():Object {
        return (
            <div>
                <TimePicker
                    onChange={this.__handleChange}
                    name="TimePicker"
                    locale="en"
                    value={this.state.TimePicker}/>
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

