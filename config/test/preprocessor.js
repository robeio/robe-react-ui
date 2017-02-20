const babel = require('babel-core');

const patterns = [
    /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    /\.s?css$/,
    /\.(png|jpe?g|gif)(\?\S*)?$/,
    /\.txt$/
];

module.exports = {
    process(src, filename) {
        for(let i = 0 ; i < patterns.length; i++) {
            if(patterns[i].test(filename)) {
                return '';
            }
        }
        if (babel.util.canCompile(filename)) {
            return babel.transform(src, {
                "presets": [
                    "react",
                    "es2015",
                    "stage-0",
                    "jest"
                ]
            }).code;
        }
        return src;
    },
};
