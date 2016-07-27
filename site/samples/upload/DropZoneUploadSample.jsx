import React from "react";
import { ShallowComponent } from "robe-react-commons";
import DropZoneUpload from "upload/DropZoneUpload";

export default class DropZoneUploadSample extends ShallowComponent {
    render() {
        return (
            <div>
                <DropZoneUpload
                    postUrl="http://localhost:3000/files"
                    rootPath="/"
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onChange = (e) => {
        console.log(e);
    }
}
