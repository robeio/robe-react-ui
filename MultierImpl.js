const multer = require("multer"); // Grabs Multer

module.exports = (app, requestPath, tempFolder) => {
    const storage = multer.diskStorage({
        destination: tempFolder, // Specifies upload location...

        filename: function (req, file, cb) {
            /*
            switch (file.mimetype) { // *Mimetype stores the file type, set extensions according to filetype
                case "image/jpeg":
                    ext = ".jpeg";
                    break;
                case "image/png":
                    ext = ".png";
                    break;
                case "image/gif":
                    ext = ".gif";
                    break;
            }
             */
            cb(null, file.originalname);
        }
    });
    const upload = multer({ storage: storage });
    app.post(requestPath, upload.single("file"), (req, res, next) => {
        res.sendStatus(200);
        // res.send({ responseText: req.file.path }); // You can send any response to the user here
    });
}