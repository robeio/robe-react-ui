import React from "react";
import { ShallowComponent, Maps, Assertions } from "robe-react-commons";
import { Form, Panel } from "react-bootstrap";
import ComponentManager from "../app/ComponentManager";

export default class DataForm extends ShallowComponent {

    /**
     * propTypes
     * @static
     */
    static propTypes = {
        /**
         * Style map for the component.
         */
        style: React.PropTypes.object,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Hold data in a map
         */
        item: React.PropTypes.object,
        /**
         * Holds field properties like `code`, `label`, `type`, `visible`, `editable`, `readable`, `label`
         */
        fields: React.PropTypes.array.isRequired,
        /**
         * Holds Component props and component if need.
         */
        components: React.PropTypes.object.isRequired,
        /**
         * Form is collapsible or not
         */
        collapsible: React.PropTypes.bool,
        /**
         * Form is defaultExpanded or not
         */
        defaultExpanded: React.PropTypes.bool,
        /**
         * On Generator
         */
        onItemRenderer: React.PropTypes.func

    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        item: {},
        label: null,
        collapsible: false,
        defaultExpanded: true
    };

    /**
     * Holds initial state
     * @type {{}}
     * @private
     */
    __fieldProps = {};

    constructor(props) {
        super(props);
        this.state = props.item;
        this.init(this.props.fields, this.props.config);
    }

    init(fields, config) {
        let items = [];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.code) {
                throw new Error("Column code must define ! ");
            }
            let props;
            if (config) {
                props = config[field.code];
            }

            if (!props) {
                props = {};
            }
            this.initComponent(field, props);
        }
        return items;
    }

    initComponent(field, props) {
        let code = field.code;
        console.log(code);
        console.log(field);
        console.log(props);
        props = Maps.mergeDeep(field, props);
        props.handleChange = this.handleChange.bind(this, code);
        this.__fieldProps[code] = props;
        if (!this.state[code]) {
            this.state[code] = null;
        }
    }

    render() {
        let form = (
            <Form>
                {this.__createForm(this.props.fields, this.props.components)}
            </Form>
        );
        if (this.props.label) {
            return (
                <Panel collapsible={this.props.collapsible} defaultExpanded={this.props.defaultExpanded} header={this.props.label}>
                    {form}
                </Panel>
            );
        }
        return form;
    }

    /**
     * @param {Array<Map>} fields
     * @param {Object} components
     * @returns {Array}
     * @private
     */
    __createForm = (fields: Array<Map>, components: Object): Array => {
        let items = [];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.code) {
                throw new Error("Column code must define ! ");
            }
            let component;
            if (components) {
                component = components[field.code];
            }
            items.push(this.__createElement(field, component));
        }
        return items;
    }

    /* eslint react/prop-types: 0*/
    /**
     *
     * @param {Map} field
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    __createElement = (field: Map, props: Object): Object => {
        let code = field.code;
        props = this.__fieldProps[code];

        let Component = this.onItemRenderer(field, props);

        return <Component {...props} value={this.state[code]} />;
    }

    onItemRenderer(field, config) {
        let component = null;
        if (this.props.onItemRenderer) {
            component = this.props.onItemRenderer(field, config);
        }
        if (!component) {
            component = ComponentManager.findComponentByType(field.type);
        }
        return component;
    }

    /**
     *
     * @param code
     * @param e
     * @returns {boolean}
     */
    handleChange(code: any, e: Object): boolean {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let state = {};
        state[code] = value;
        this.setState(state);
        return true;
    }
}