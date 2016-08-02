import React from "react";
import { ShallowComponent } from "robe-react-commons";
import FileUploadInput from "upload/FileUploadInput";
import { Panel, Button } from "react-bootstrap";


const items = [
    "0ad7a59a-4727-6a51-e861-7cedbbc46896"
]

const dataId = "3ae7baac-4e1c-6b63-4c07-b28d5b80821f";

const request = {
    requestId: dataId,
    url: "http://localhost:3000/files",
    upload: {
        type: "PUT"

    },
    load: {
        type: "POST"
    },
    preview: {
        type: "GET"
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
                <FileUploadInput
                    ref="dropZoneUploadNew"
                    name="files"
                    id={dataId}
                    display="thumbnail"
                    request={request}
                    items={items}
                    onChange={this.onChange}
                />
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
