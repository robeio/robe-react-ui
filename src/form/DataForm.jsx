import React from "react";
import {
    ShallowComponent,
    Maps
} from "robe-react-commons";
import {
    Form
} from "react-bootstrap";
import ComponentManager from "./ComponentManager";
import InputValidations from "../validation/InputValidations";

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
         * Hold data in a map
         */
        item: React.PropTypes.object,
        /**
         * Holds field properties like `code`, `label`, `type`, `visible`, `editable`, `readable`, `label`
         */
        fields: React.PropTypes.array.isRequired,
        /**
         * Holds extra props of components if need.
         */
        propsOfFields: React.PropTypes.object,
        /**
         * Form is collapsible or not
         */
        collapsible: React.PropTypes.bool,
        /**
         * Form is defaultExpanded or not
         */
        defaultExpanded: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        label: null,
        collapsible: false,
        defaultExpanded: true
    };

    /**
     * Holds initial state
     * @type {{}}
     * @private
     */

    /**
     *
     * @type {{}}
     * @private
     */
    __item = {};
    /**
     *
     * @type {boolean}
     * @private
     */
    __isNew = true;
    /**
     *
     * @type {{}}
     * @private
     */
    __props = {};

    constructor(props) {
        super(props);
        if (props.item) {
            this.__isNew = false;
            this.__item = props.item;
        }
        this.state = {};
        this.__init(this.props.fields, this.props.propsOfFields);
    }

    __init(fields, config) {
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.code) {
                throw new Error("Field code must define ! ");
            }
            let props;
            if (config) {
                props = config[field.code];
            }

            this.__initComponent(field, props);
        }
    }

    __initComponent(field, props) {
        let code = field.code;

        props = props ? Maps.mergeDeep(field, props) : field;
        props.onChange = this.onChange.bind(this, code);

        this.state[code] = this.__filterUndefined(this.state[code]);
        if (this.__isNew) {
            if (props.items) {
                this.state[`$$_items_${code}`] = props.items;
            }
            this.__item[code] = this.__filterUndefined(props.value);
        } else {
            this.__item[code] = this.__filterUndefined(this.__item[code]);
        }

        this.__props[code] = props;
        this.state[code] = this.__filterUndefined(this.__item[code]);
        this.__setValidations(field);
    }

    render(): Object {
        let form = (
            <Form>
                {this.__createForm(this.props.fields, this.props.components)}
            </Form>
        );
        return form;
    }

    /**
     * Set default string validations
     * @param field
     * @private
     */
    __setValidations(field: Map) {
        let props = this.__props[field.code];
        if (!props.validations) {
            props.validations = {};
        }
        for (let key in InputValidations) {
            if (InputValidations.hasOwnProperty(key)) {
                if (!props.validations[key] && field[key]) {
                    let type = typeof field[key];
                    if (type !== "Function") {
                        props.validations[key] = type === "boolean" ? InputValidations[key] : InputValidations[key].bind(null, field[key]);
                    }
                }
            }
        }
    }
    /**
     * Creates components which will render in Form Data by own fields and field props
     * @param {Array<Map>} fields
     * @param {Object} components
     * @returns {Array}
     * @private
     */
    __createForm = (fields: Array<Map>): Array => {
        let items = [];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.code) {
                throw new Error("Column code must define ! ");
            }
            items.push(this.__createElement(field));
        }
        return items;
    }

    /**
     * Creates component which will render in Form Data by fields and field props
     * @param {Map} field
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    __createElement = (field: Map): Object => {
        if (field.visible === false) {
            return null;
        }

        let code = field.code;
        let props = this.__props[code];
        let Component = ComponentManager.findComponentByType(field.type);

        return <Component ref={`${code}Ref`} {...props} value={this.state[code]} />;
    }

    /**
     * Checks validations of all components in form data
     * @returns {boolean}
     */
    isValid = (): boolean => {
        let hasIsValidObjects = Maps.getObjectsWhichHasKeyInMap("isValid", this.refs, "function");
        for (let i = 0; i < hasIsValidObjects.length; i++) {
            if (!(hasIsValidObjects[i].isValid())) {
                return false;
            }
        }
        return true;
    };

    /**
     * Called when any component changed.
     * @param code
     * @param e
     * @returns {boolean}
     */
    onChange(code: any, e: Object): boolean {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        this.__item[code] = value;
        let state = {};
        state[code] = this.__item[code];
        let props = this.__props[code];
        if (props) {
            if (props.items) {
                state[`$$_items_${code}`] = props.items;
            }
        }
        this.setState(state);
        return true;
    }

    /**
     * Checks validation of data and return valid data. If data is not valid then return false
     * @returns {boolean}
     */
    submit(): any {
        let valid = this.isValid();
        return valid ? this.getItem() : false;
    }

    /**
     * return current data
     * @returns {boolean}
     */
    getItem = (): Map => {
        return this.__item;
    }

    /**
     * sets initial data if value is empty or null
     * @param value
     * @returns {*}
     * @private
     */
    __filterUndefined = (value: any): any => {
        if (value === 0) {
            return 0;
        } else if (!value) {
            return "";
        }
        return value;
    }
}
