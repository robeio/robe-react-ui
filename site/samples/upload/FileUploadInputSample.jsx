import React from "react";
import { ShallowComponent } from "robe-react-commons";
import FileUploadInput from "upload/FileUploadInput";
import { Panel, Button } from "react-bootstrap";


const files = [
    "3ae7baac-4e1c-6b63-4c07-b28d5b80821f"
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
    render() {
        let onSubmitNew = this.onSubmit.bind(this, "fileUpload");
        return (
            <div>
                <Panel header="FileUploadInput New">
                <FileUploadInput
                    ref="dropZoneUploadNew"
                    id={dataId}
                    display="list"
                    request={request}
                    files={files}
                    onChange={this.onChange}
                />
                </Panel>
                <Button onClick={onSubmitNew}>Gönder</Button>
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
