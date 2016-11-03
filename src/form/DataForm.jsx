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
         * Holds field properties like `name`, `label`, `type`, `visible`, `editable`, `readable`, `label`
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

    constructor(props: Object) {
        super(props);
        if (props.item) {
            this.__isNew = false;
            this.__item = Object.assign({}, props.item);
        }
        this.state = {};
        this.__init(this.props.fields, this.props.propsOfFields);
    }

    __init(fields: Array, config: Object) {
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.name) {
                throw new Error("Field name must define ! ");
            }
            let props;
            if (config) {
                props = config[field.name];
            }

            this.__initComponent(field, props);
        }
    }

    __initComponent(field: Object, props: Object) {
        let name = field.name;

        props = props ? Maps.mergeDeep(field, props) : field;

        props.onChange = this.onChange.bind(this, name);


        this.state[name] = this.__filterUndefined(this.state[name]);
        if (this.__isNew) {
            if (props.items) {
                this.state[`$$_items_${name}`] = props.items;
            }
            this.__item[name] = this.__filterUndefined(props.value);
        } else {
            this.__item[name] = this.__filterUndefined(this.__item[name]);
        }

        this.__props[name] = props;
        this.state[name] = this.__filterUndefined(this.__item[name]);
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
            if (!field.name) {
                throw new Error("Field name must define !");
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

        let name = field.name;
        let props = this.__props[name];
        let Component = ComponentManager.findComponentByType(field.type);

        return <Component key={`${name}_key`} ref={`${name}Ref`} {...props} value={this.state[name]} />;
    }

    /**
     * Checks validations of all components in form data
     * @returns {boolean}
     */
    isValid = (): boolean => {
        let hasIsValidObjects = Maps.getObjectsWhichHasKeyInMap(this.refs, "isValid", "function");
        for (let i = 0; i < hasIsValidObjects.length; i++) {
            if (hasIsValidObjects[i].isValid() != true) {
                return false;
            }
        }
        return true;
    };

    /**
     * Called when any component changed.
     * @param name
     * @param e
     * @returns {boolean}
     */
    onChange(name: any, e: Object): boolean {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        this.__item[name] = value;
        let state = {};
        state[name] = this.__item[name];
        let props = this.__props[name];
        if (props) {
            if (props.items) {
                state[`$$_items_${name}`] = props.items;
            }
        }
        let changeState = true;
        if (this.props.onChange) {
            if (this.props.onChange(name, e) === false) {
                changeState = false;
            }
        }
        if (changeState) {
            this.setState(state);
        }
        return changeState;
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
