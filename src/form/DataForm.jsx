import React from "react";
import {
    ShallowComponent,
    Maps,
    Objects,
    Assertions
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
        propsOfFields: {},
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

    __columnSize;
    constructor(props) {
        super(props);
        this.state = props.defaultValues;
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.__columnSize = 12 / nextProps.columnsSize;
        let fields = nextProps.fields;
        let props = nextProps.propsOfFields;
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            let name = field.name;
            if (!name) {
                throw new Error("Field name must be defined ! ");
            }
            let prop = Objects.clone(field, [Array]);
            let config = Objects.mergeClone(props[name], prop, [Array]);
            this.__setPropsOfField(name, config, this.state);
        }
    }

    render():Object {
        let form = (
            <Form>
                <Row>
                    {this.__createForm(this.props.fields)}
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
    __createForm = (fields:Array<Map>):Array => {
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
    __createElement = (field:Map):Object => {
        if (field.visible === false) {
            return null;
        }
        let name = field.name;
        let props = this.__props[name];
        let Component = ComponentManager.getComponent(field.type);

        return (
            <Col key={`${name}_key`} md={this.__columnSize}>
                <Component
                    ref={`${name}Ref`}
                    {...props}
                    onChange={this.onChange}
                    value={this.state[name]}
                    validationDisplay={this.props.validationDisplay}
                />
            </Col>
        );
    }

    /**
     * Checks validations of all components in form data
     * @returns {boolean}
     */
    isValid = ():boolean => {
        let hasIsValidObjects = Maps.getObjectsWhichHasKeyInMap(this.refs, "isValid", "function");
        for (let i = 0; i < hasIsValidObjects.length; i++) {
            if (hasIsValidObjects[i].isValid() !== true) {
                return false;
            }
        }
        return true;
    };

    /**
     * @param name
     * @param props
     * @param state
     * @private
     */
    __setPropsOfFields(propsOfFields:Object, state:Object) {
        if (Assertions.isObject(propsOfFields)) {
            for (let targetName in propsOfFields) {
                if (Objects.hasProperty(propsOfFields, targetName)) {
                    this.__setPropsOfField(targetName, propsOfFields[targetName], state);
                }
            }
        }
    }

    /**
     * @param name
     * @param props
     * @param state
     * @private
     */
    __setPropsOfField(name:string, props:Object, state:Object) {
        if (!this.__props[name]) this.__props[name] = {};
        if (props) {
            for (let targetName in props) {
                if (Objects.hasProperty(props, targetName)) {
                    switch (targetName) {
                        case "value":
                            state[name] = props[targetName];
                            this.__props[name][targetName] = props[targetName];
                            break;
                        case "onChange":
                            this.__onChanges[name] = props[targetName];
                            break;
                        default:
                            this.__props[name][targetName] = props[targetName];
                    }
                }
            }
        }
    }

    /**
     * Called when any component changed.
     * @param name
     * @param e
     * @returns {boolean}
     */
    onChange(e: Object): boolean {
        let me = this;
        let name = e.target.name;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let state = {};
        state[name] = value;

        if (this.props.onChange) {
            if (this.props.onChange(e) === false) {
                return false;
            }
        }

        if (this.__onChanges[name]) {
            let result = this.__onChanges[name](e, (result) => {
                me.__setPropsOfFields(result, state);
                me.setState(state);
                return false;
            });
            if(result) {
                this.__setPropsOfFields(result, state);
            }
            if(result != false) {
                this.setState(state);
            }
        } else {
            this.setState(state);
        }
        return true;
    }

    /**
     * Checks validation of data and return valid data. If data is not valid then return false
     * @returns {boolean}
     */
    submit():any {
        let valid = this.isValid();
        return valid ? this.state : false;
    }
}
