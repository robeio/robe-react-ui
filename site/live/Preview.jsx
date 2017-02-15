import React, { Component, PropTypes } from "react";
import _ from "lodash";
import * as Babel from "babel-standalone";


class Preview extends Component {

    static propTypes = {
        code: PropTypes.string.isRequired
    };

    state = {
        error: null
    };

    _compileCode = (): Object => {
        let { code } = this.props;


        const imports = _.get(/(^import[\s\S]*from[\s\S]*['"]\n)/.exec(code), "[1]", "")
            .replace(/[\s\n]+/g, " ")         // normalize spaces and make one line
            .replace(/ import/g, "\nimport")  // one import per line
            .split("\n")                      // split lines
            .filter(Boolean)                  // remove empty lines
            .map((l) => {                       // rewrite imports to const statements
                const [
                    defaultImport,
                    destructuredImports,
                    _module,
                ] = _.tail(/import\s+([\w]+)?(?:\s*,\s*)?({[\s\w,]+})?\s+from\s+['"](?:.*\/)?([\w\-_]+)['"]/.exec(l));
                const module = _.snakeCase(_module).toUpperCase();
                const constStatements = [];

                if (defaultImport) constStatements.push(`const ${defaultImport} = ${module}`);
                if (destructuredImports) constStatements.push(`const ${destructuredImports} = ${module}`);
                // constStatements.push(";");

                return constStatements.join(";");
            })
            .join(";\n");

        // capture the default export so we can return it from the IIFE
        const defaultExport = _.get(/export\s+default\s+(?:class|function)?(?:\s+)?(\w+)/.exec(code), "[1]");

        // consider everything after the imports to be the body
        // remove `export` statements except `export default class|function`
        const body = _.get(/import[\s\S]*from.*\n([\s\S]*)/.exec(code), "[1]", "")
            .replace(/export\s+default\s+(?!class|function)\w+([\s\n]+)?/, "")  // remove `export default Foo` statements
            .replace(/export\s+default\s+/, "");                                 // remove `export default ...`

        const IIFE = `(function() {\n${imports}${body}return ${defaultExport}\n}())`;
        const babelConfig = {
            presets: ["es2015", "react", "stage-0"]
        };

        const REACT = require("react");
        const ROBE_REACT_COMMONS = require("robe-react-commons");
        const ROBE_REACT_UI = require("robe-react-ui");
        const REACT_BOOTSTRAP = require("react-bootstrap");

        let { Button } = ROBE_REACT_UI;
        console.log(ROBE_REACT_UI);
        console.log({ Button });
        
        try {
            const { code } = Babel.transform(IIFE, babelConfig);
            const Example = eval(code); // eslint-disable-line no-eval
            const exampleElement = _.isFunction(Example) ? <Example /> : Example;
            return exampleElement;
        } catch (error) {
            console.log({ error });
            this.setState({ error });
            throw error;
        }
    };

    _setTimeout = (...args) => {
        clearTimeout(this.timeoutID); // eslint-disable-line no-undef
        this.timeoutID = setTimeout(...args); // eslint-disable-line no-undef
    };

    _executeCode = () => {
        try {
            const compiledCode = this._compileCode();
            /* eslint-enable no-eval, max-len */
            this.setState({ error: null, compiledCode });
        } catch (err) {
            console.log({ err });
            this._setTimeout(() => {
                this.setState({ error: err.toString() });
            }, 500);
        }
    };

    componentDidMount = () => {
        this._executeCode();
    };

    componentDidUpdate = (prevProps) => {
        clearTimeout(this.timeoutID); //eslint-disable-line
        if (this.props.code !== prevProps.code) {
            this._executeCode();
        }
    };

    render(): Object {
        const { error, compiledCode } = this.state;
        return (
            <div>
                {compiledCode}
                {error !== null ?
                    <div className="playgroundError">{error}</div> :
                    null}
            </div>
        );
    }

}

export default Preview;
