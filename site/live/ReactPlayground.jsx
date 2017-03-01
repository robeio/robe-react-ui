/* eslint no-unused-vars:0 */
import "babel-polyfill";
import React, { Component, PropTypes, isValidElement } from "react";
import { Panel } from "react-bootstrap";
import FaIcon from "faicon/FaIcon";
import _ from "lodash";
import * as Babel from "babel-standalone";
import Toast from "toast/Toast";
import Editor from "./Editor";

class ReactPlayground extends Component {

    static defaultProps = {
        theme: "monokai",
        noRender: true,
        context: {},
        initiallyExpanded: false
    };

    static propTypes = {
        codeText: PropTypes.string.isRequired,
        scope: PropTypes.object.isRequired,
        collapsableCode: PropTypes.bool,
        theme: PropTypes.string,
        selectedLines: PropTypes.array,
        noRender: PropTypes.bool,
        initiallyExpanded: PropTypes.bool,
        previewComponent: PropTypes.node
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            codeText: this.props.codeText,
            expandedCode: !this.props.initiallyExpanded,
            exampleElement: null,
            external: true,
            error: null
        };
        this._resetCode = this._resetCode.bind(this);
        this._copyToClipboard = this._copyToClipboard.bind(this);
        this._toggleCode = this._toggleCode.bind(this);
    }

    render(): Object {
        const { codeText, external, expandedCode, exampleElement, error } = this.state;
        const { collapsableCode, noRender, previewComponent, scope, selectedLines, theme } = this.props;

        let backgroundColor = (error == null ? "transparent" : "#ebccd1");
        return (
            <Panel style={{ borderRadius: "0px", borderColor: "transparent", backgroundColor }}>
                <div className={`playground${collapsableCode ? " collapsableCode" : ""}`}>
                    <div className="playgroundPreview">
                        {exampleElement}
                    </div>
                    <div className={`playgroundCode${expandedCode ? " expandedCode" : ""}`}>
                        <Editor
                            className="playgroundStage"
                            codeText={codeText}
                            external={external}
                            onChange={this._handleCodeChange}
                            selectedLines={selectedLines}
                            theme={theme}
                        />
                    </div>
                    {
                        collapsableCode ?
                            <div className="playgroundToggleCodeBar">
                                <span className="playgroundToggleCodeLink" onClick={this._toggleCode}>
                                    {expandedCode ? "Show Code" : "Hide Code"}
                                </span>
                                {
                                    !expandedCode ? <span className="playgroundToggleCodeLink" style={{ marginRight: 10 }} onClick={this._copyToClipboard}> <FaIcon code="fa-clipboard" />
                                    </span> : null
                                }{
                                    !expandedCode ? <span className="playgroundToggleCodeLink" style={{ marginRight: 10 }} onClick={this._resetCode}> <FaIcon code="fa-refresh" />
                                    </span> : null
                                }
                            </div> : null
                    }
                    {error !== null ?
                        <div className="playgroundError">{error}</div> :
                        null}

                </div>
            </Panel>
        );
    }

    _compileCode = _.debounce(() => {
        let { codeText } = this.state;

        const imports = _.get(/(^import[\s\S]*from[\s\S]*['"];)/.exec(codeText), "[1]", "")
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

                if (defaultImport) constStatements.push(`const ${defaultImport} = ${module};`);
                if (destructuredImports) constStatements.push(`const ${destructuredImports} = ${module};`);
                // constStatements.push(";");

                return constStatements.join(";");
            })
            .join("\n");

        // capture the default export so we can return it from the IIFE
        const defaultExport = _.get(/export\s+default\s+(?:class|function)?(?:\s+)?(\w+)/.exec(codeText), "[1]");

        // consider everything after the imports to be the body
        // remove `export` statements except `export default class|function`
        const body = _.get(/import[\s\S]*from.*\n([\s\S]*)/.exec(codeText), "[1]", "")
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

        try {
            const { code } = Babel.transform(IIFE, babelConfig);
            const Example = eval(code); // eslint-disable-line no-eval
            const exampleElement = _.isFunction(Example) ? <Example /> : Example;

            if (!isValidElement(exampleElement)) {
                this.renderError(`Default export is not a valid element. Type:${{}.toString.call(exampleElement)}`);
            } else {
                // immediately render a null error
                // but also ensure the last debounced error call is a null error
                const error = null;
                this.renderError(error);
                this.setState({
                    error,
                    exampleElement
                });
            }
        } catch (err) {
            this.renderError(err.message);
        }
    }, 500);

    renderError = _.debounce((error) => {
        this.setState({ error });
    }, 800)

    _handleCodeChange = (codeText) => {
        this.setState({
            codeText,
            external: false
        }, this._compileCode());
    };

    _toggleCode() {
        this.setState({
            expandedCode: !this.state.expandedCode
        });
    }

    _copyToClipboard() {
        let textField = document.createElement("textarea");
        textField.innerHTML = this.state.code;

        document.body.appendChild(textField);

        let range = document.createRange();
        range.selectNode(textField);
        textField.select();

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        try {
            document.execCommand("copy");
            Toast.success("Copy successful.");
        } catch (err) {
            console.log("Oops, unable to copy");
        }
        document.body.removeChild(textField);
    }


    _resetCode() {
        this.setState({
            codeText: this.props.codeText,
            external: true
        }, this._compileCode());
    }

    componentDidUpdate(prevProps) {
        if (this.props.codeText !== prevProps.codeText) {
            this._compileCode();
        }
    }
    componentDidMount() {
        // console.log("componentDidMount");.
        // this._compileCode();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            codeText: nextProps.codeText,
            external: true
        }, this._compileCode());
    }
}

export default ReactPlayground;
