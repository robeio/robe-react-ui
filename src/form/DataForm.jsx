import React from "react";
import {
    ShallowComponent,
    Maps
} from "robe-react-commons";
import {
    Form, Row, Col
} from "react-bootstrap";
import ComponentManager from "./ComponentManager";

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
        defaultExpanded: React.PropTypes.bool,
        /**
         * Form side by side input columns size
        */
        columnsSize: React.PropTypes.oneOf([1, 2, 3, 4, 6, 12]),
        /**
         * Map of the default values for the component.
         */
        defaultValues: React.PropTypes.object,
        /**
       *Defines the display style of the Validation message.
       */
        validationDisplay: React.PropTypes.oneOf(['overlay', 'block'])
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        label: null,
        collapsible: false,
        defaultExpanded: true,
        columnsSize: 1,
        defaultValues: {},
        validationDisplay: "block"
    };

    /**
     *
     * @type {{}}
     * @private
     */
    __props = {};

    /**
     *
     * @type {{}}
     * @private
     */
    __onChanges = {};

    constructor(props: Object) {
        super(props);
        this.state = {};
        this.componentWillReceiveProps(this.props);
    }

    __init(fields: Array, config: Object) {
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.name) {
                throw new Error("Field name must be defined ! ");
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
        if (!this.__onChanges[name] && props !== undefined) {
            this.__onChanges[name] = props.onChange;
        }
        props = props ? Maps.mergeDeep(props, field) : field;

        props.onChange = this.onChange;

        let newProps = {};
        Maps.mergeDeep(props, newProps);

        delete newProps.sort;
        delete newProps.range;

        this.__props[name] = newProps;
        this.state[name] = this.state[name] || this.props.defaultValues[name] || newProps.value;
    }

    render(): Object {
        let form = (
            <Form>
                <Row>
                    {this.__createForm(this.props.fields, this.props.components)}
                </Row>
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
        let Component = ComponentManager.getComponent(field.type);

        let columnsSize = 12 / this.props.columnsSize;

        return (<Col key={`${name}_key`} md={columnsSize}><Component ref={`${name}Ref`} {...props} value={this.state[name]} validationDisplay={this.props.validationDisplay} /></Col>);
    }

    /**
     * Checks validations of all components in form data
     * @returns {boolean}
     */
    isValid = (): boolean => {
        let hasIsValidObjects = Maps.getObjectsWhichHasKeyInMap(this.refs, "isValid", "function");
        for (let i = 0; i < hasIsValidObjects.length; i++) {
            if (hasIsValidObjects[i].isValid() !== true) {
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
    onChange(e: Object): boolean {
        let name = e.target.name;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;

        let state = {};
        state[name] = value
        let props = this.__props[name];

        let changeState = true;
        if (this.props.onChange) {
            if (this.props.onChange(name, e) === false) {
                changeState = false;
            }
        }
        if (changeState) {
            this.setState(state);
        }
        if (this.__onChanges[name]) {
            this.__onChanges[name](name, e);
        }
        return changeState;
    }

    /**
     * Checks validation of data and return valid data. If data is not valid then return false
     * @returns {boolean}
     */
    submit(): any {
        let valid = this.isValid();
        return valid ? this.state : false;
    }

    componentWillReceiveProps(nextProps: Object) {
        this.__init(nextProps.fields, nextProps.propsOfFields);
    }
}
