import React from "react";
import { ShallowComponent } from "robe-react-commons";
import FileUploadInput from "inputs/upload/FileUploadInput";
import { Button } from "react-bootstrap";

const dataId = "3ae7baac-4e1c-6b63-4c07-b28d5b80821f";

const filesUrl = "http://localhost:3000/files";

let props = {
    url: filesUrl,
    upload: {
        type: "PUT"
    },
    info: {
        type: "POST"
    },
    delete: {
        type: "DELETE"
    }
};

export default class FileUploadInputSample extends ShallowComponent {

    __onSubmitNew;
    constructor(props) {
        super(props);
        this.__onSubmitNew = this.onSubmit.bind(this, "fileUpload");
    }
    render() {
        return (
            <div>

                <Button onClick={this.__onSubmitNew}>Gönder</Button>
            </div>
        );
    }
    onSubmit = (code) => {
        this.refs[code].onSubmitted(this.onSuccess, this.onError);
    }
    onSuccess = (data) => {
        console.log(data);
    }

    onError = (error) => {
        console.log(error);
    }

    onChange = (e) => {
        console.log(e);
    }
}
