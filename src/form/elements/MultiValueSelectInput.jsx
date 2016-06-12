import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Select from "react-select";
import Col from "react-bootstrap/lib/Col";


require("react-select/dist/react-select.css");

// read more https://github.com/JedWatson/react-select

export default class MultiValueSelectInput extends ShallowComponent {

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        let placeholder = this.props.placeholder === undefined ? "<Lütfen Seçiniz>" : this.props.placeholder;

        return (
            <Col className="form-group">
                <Select
                    {...this.props}
                    multi={true}
                    noResultsText="Sonuç bulunamadı."
                    placeholder={placeholder}
                />
            </Col>
        );
    }
}
