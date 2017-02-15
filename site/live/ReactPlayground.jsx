/* eslint no-unused-vars:0 */
import "babel-polyfill";
import React, { Component, PropTypes } from "react";
import Toast from "toast/Toast";
import Editor from "./Editor";
import Preview from "./Preview";

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
        es6Console: PropTypes.bool,
        context: PropTypes.object,
        initiallyExpanded: PropTypes.bool,
        previewComponent: PropTypes.node
    };

    state = {
        code: this.props.codeText,
        expandedCode: this.props.initiallyExpanded,
        external: true
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            code: nextProps.codeText,
            external: true
        });
    };

    _handleCodeChange = (code) => {
        this.setState({
            code,
            external: false
        });
    };

    _toggleCode = () => {
        this.setState({
            expandedCode: !this.state.expandedCode
        });
    };

    _copyToClipboard = () => {
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

    render(): Object {
        const { code, external, expandedCode } = this.state;
        const {
      collapsableCode,
      context,
      es6Console,
      noRender,
      previewComponent,
      scope,
      selectedLines,
      theme } = this.props;

        return (
            <div className={`playground${collapsableCode ? " collapsableCode" : ""}`}>
                <div className="playgroundPreview">
                    <Preview
                        context={context}
                        code={code}
                        scope={scope}
                        noRender={noRender}
                        previewComponent={previewComponent}
                    />
                </div>
                <div className={`playgroundCode${expandedCode ? " expandedCode" : ""}`}>
                    <Editor
                        className="playgroundStage"
                        codeText={code}
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
                !expandedCode ? <span className="playgroundToggleCodeLink" style={{ marginRight: 10 }} onClick={this._copyToClipboard}>
                    {"Copy"}
                </span> : null
              }
              </div> : null
        }

            </div>
        );
    }

}

export default ReactPlayground;
