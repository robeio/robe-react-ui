import React from "react";
import { ShallowComponent } from "robe-react-commons";
import FileUploadInput from "robe-react-ui/lib/inputs/upload/FileUploadInput";
import { Button } from "react-bootstrap";

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
                <FileUploadInput
                    ref="dropZoneUploadNew"
                    name="files"
                    display="thumbnail"
                    label="Dosya Seçimi"
                    remote={props}
                    value={["info_test.png"]}
                    onChange={this.onChange}
                    placeHolder="Upload Files"
                    browseButtonText="Browse..."
                    multiple={true}
                />
                <br />
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
