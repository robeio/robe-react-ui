import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import ReactDOMServer from "react-dom/server";
import { transform } from "babel-standalone";
import _ from "lodash";
import * as Babel from "babel-standalone";


class Preview extends Component {

    static defaultProps = {
        previewComponent: "div"
    };
    static propTypes = {
        code: PropTypes.string.isRequired,
        scope: PropTypes.object.isRequired,
        previewComponent: PropTypes.node,
        noRender: PropTypes.bool,
        context: PropTypes.object
    };

    state = {
        error: null
    };

    _compileCode = () => {
        let { code, context, noRender, scope } = this.props;
        const generateContextTypes = (c) => {
            return `{ ${Object.keys(c).map((val) => { return `${val}: React.PropTypes.any.isRequired`; }).join(", ")} }`;
        };

        if (noRender) {
            return transform(`
        ((${Object.keys(scope).join(", ")}, mountNode) => {
          class Comp extends React.Component {

            getChildContext() {
              return ${JSON.stringify(context)};
            }

            render() {
              return (
                ${code}
              );
            }
          }

          Comp.childContextTypes = ${generateContextTypes(context)};

          return Comp;
        });
      `, { presets: ["es2015", "react", "stage-1"] }).code;
        }


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
          constStatements.push("\n");

          return constStatements.join("\n");
      })
      .join("\n");

    // capture the default export so we can return it from the IIFE
        const defaultExport = _.get(/export\s+default\s+(?:class|function)?(?:\s+)?(\w+)/.exec(code), "[1]");

    // consider everything after the imports to be the body
    // remove `export` statements except `export default class|function`
        const body = _.get(/import[\s\S]*from.*\n([\s\S]*)/.exec(code), "[1]", "")
      .replace(/export\s+default\s+(?!class|function)\w+([\s\n]+)?/, "")  // remove `export default Foo` statements
      .replace(/export\s+default\s+/, "");                                 // remove `export default ...`

        return transform(`
        ((${Object.keys(scope).join(",")}, mountNode) => {
          ${body}
          ReactDOM.render(<${defaultExport}/>, mountNode);
        });
      `, { presets: ["es2015", "react", "stage-1"] }).code;
    };

    _setTimeout = (...args) => {
        clearTimeout(this.timeoutID); // eslint-disable-line no-undef
        this.timeoutID = setTimeout(...args); // eslint-disable-line no-undef
    };

    _executeCode = () => {
        const mountNode = this.refs.mount;
        const { scope, noRender, previewComponent } = this.props;
        const tempScope = [];

        try {
            Object.keys(scope).forEach((s) => { return tempScope.push(scope[s]); });
            tempScope.push(mountNode);
            const compiledCode = this._compileCode();
            if (noRender) {
        /* eslint-disable no-eval, max-len */
                const Comp = React.createElement(
          eval(compiledCode)(...tempScope)
        );
                ReactDOMServer.renderToString(React.createElement(previewComponent, {}, Comp));
                render(
          React.createElement(previewComponent, {}, Comp),
          mountNode
        );
            } else {
                eval(compiledCode)(...tempScope);
            }
      /* eslint-enable no-eval, max-len */

            this.setState({ error: null });
        } catch (err) {
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

    render() {
        const { error } = this.state;
        return (
            <div>
                <div ref="mount" className="previewArea" />
                {error !== null ?
                    <div className="playgroundError">{error}</div> :
          null}
            </div>
        );
    }

}

export default Preview;
