import React from "react";
import {
    ShallowComponent,
    Store,
    RemoteEndPoint,
    Assertions,
    Application,
    LocalEndPoint,
    Maps
} from "robe-react-commons";
import DataFilter from "robe-react-ui/lib/datafilter/DataFilter";
import DataFilterModel from "./DataFilterModel.json";
import { ControlLabel } from "react-bootstrap";
import Highlight from "react-highlight";

const propsOfFields = {
    job: {
        items: [
            {
                value: "sd",
                text: "Software Developer"
            },
            {
                value: "sa",
                text: "Software Architect"
            }
        ]
    },
    gender: {
        items: [
            {
                value: "male",
                text: "Male"
            },
            {
                value: "female",
                text: "Female"
            }
        ]
    }
};

export default class DataFilterSample extends ShallowComponent {

    static idField = "id";

    constructor(props: Object) {
        super(props);

        this.state = {
            filter: []
        };

        this.__init(DataFilterModel.fields,propsOfFields);
    }

    __fields = [];

    render(): Object {
        return (
            <span>
                <ControlLabel>DataFilter</ControlLabel>
                <DataFilter
                    fields={this.__fields}
                    onChange={this.__onChange}
                    ref="datafilter"
                />
                <br/>
                <ControlLabel>{Application.i18n(DataFilterSample,"datafilter.DataFilterSample", "output")}</ControlLabel>
                <Highlight className="json">
                    {JSON.stringify(this.state.filter)}
                </Highlight>
            </span>
        );
    }

    __init(fields, propsOfFields) {
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.name) {
                throw new Error("'name' field must be defined");
            }
            let props = propsOfFields[field.name];
            this.__fields[i] = props ? Maps.mergeDeep(field, props) : fields[i];
        }
    }

    __onChange(filter) {
        this.setState({filter:filter});
    }
}