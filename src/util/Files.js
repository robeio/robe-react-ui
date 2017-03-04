import { Generator, Maps } from "robe-react-commons";
const MimeTypes = require("../assets/mime.json");

const SIZE_TYPES = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export default class Files {
    static getExtensionByMime(mime: string): string {
        if(!mime) return null;
        let mimes = mime.split("/");
        if(mimes.length !== 2) return null;
        let parentMime = MimeTypes[mimes[0]];
        return parentMime && parentMime[mimes[1]];
    }

    static getExtensionByPath(path:string): string {
        if(!path) return null;
        return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    static getFileName(path:string): string {
        if (path) {
            let startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
            let filename = path.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        }
        return path;
    }


    static presentSize(size){
        let text = [];
        if(size <= 0) {
            text[0] = "0 Bytes";
        } else {
            for(let i = 0 ; i < SIZE_TYPES.length && size > 0; i++) {
                let remaining = size % 1024; // remaning bytes
                if(remaining > 0) {
                    text[text.length] = remaining + " " + SIZE_TYPES[i];
                }
                if(text.length > 2) {
                    text.shift();
                }
                size = (size - remaining) / 1024; // data to size type
            }
        }
        return text.reverse().join(" ");
    }

    static getDroppedFiles(files: Array<File>) {
        if(!files) return files;
        let droppedFiles = [];
       for(let i = 0 ; i < files.length; i++) {
           droppedFiles[i] = Files.getDroppedFile(files[i]);
       }
       return droppedFiles;
    }

    static getDroppedFile(file: File) {
        let { name, filename, size, type } = file;
        let id = Generator.guid();
        let lastModified = file.lastModifiedDate ? file.lastModifiedDate.getTime(): file.lastModified;

        let uploadFile = {
            id,
            key: id,
            file,
            isUploaded: false,
            lastModified,
            name: name ? name: filename,
            size,
            type
        };
        return uploadFile;
    }
}
