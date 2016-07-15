import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import ReactDOM  from "react-dom";

import TextInput from "inputs/TextInput";
import MoneyInput from "inputs/MoneyInput";
import CheckInput from "inputs/CheckInput";
import RadioInput from "inputs/RadioInput";
import SelectInput from "inputs/SelectInput";
import PasswordInput from "inputs/PasswordInput";
import NumericInput from "inputs/NumericInput";
import DecimalInput from "inputs/DecimalInput";
import DateInput from "inputs/DateInput";
import { CheckboxList } from "inputs/checklist";
import SelectInputSingle from "inputs/SelectInputSingle";
import SelectInputMulti from "inputs/SelectInputMulti";
import HtmlEditor from "inputs/htmleditor/HtmlEditor";
import DataForm from "form/DataForm";
import ModalDataForm from "form/ModalDataForm";
import { Button, Modal, Grid, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import DataFormValue from "../data/data-form.json";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import NotificationManager from "react-notifications/lib/NotificationManager";
import ComponentList from "./ComponentList";


// /* ******************
//  * Money Input    *
//  * ******************/

// components.push({
//     header: "Money Input",
//     component: [
//         {
//             header: "TextInput",
//             component: <MoneyInput type="text" />
//         }
//     ]
// });

// /* ******************
//  * Check Input    *
//  * ******************/
// components.push({
//     header: "Check Input",
//     component: <CheckInput label="Check Input" />
// });

// /* ******************
//  * Decimal Input    *
//  * ******************/
// components.push({
//     header: "DecimalInput",
//     component: <DecimalInput label="Decimal Input" />
// });

// /* ******************
//  * Decimal Input    *
//  * ******************/
// components.push({
//     header: "NumericInput",
//     component: <NumericInput label="Numeric Input" />
// });


// /* ******************
//  * Decimal Input    *
//  * ******************/
// components.push({
//     header: "PasswordInput",
//     component: <PasswordInput label="Password Input" />
// });

// /* ******************
//  * Radio Input    *
//  * ******************/

// components.push({
//     header: "RadioInput",
//     component: <RadioInput label="Radio Input" data={["1", "2", "3"]} />
// });


// /* ******************
//  * Select Input    *
//  * ******************/
// const selectInputArray = [
//     {
//         key: "MALE",
//         value: "Bay"
//     }
// ];

// components.push({
//     header: "Select Input",
//     component: [
//         {
//             header: "default props",
//             component: (
//                 <SelectInput
//                     data={selectInputArray}
//                     dataTextField="key"
//                     dataValueField="value"
//                     />
//             )
//         },
//         {
//             header: "optionalLabel",
//             component: (
//                 <SelectInput
//                     data={selectInputArray}
//                     dataTextField="key"
//                     dataValueField="value"
//                     optionLabel="Lütfen seçim yapınız..."
//                     />
//             )
//         }
//     ]
// });

// /* *************
//  * Date Input
//  * *************/

// components.push({
//     header: "Select Input",
//     component: [
//         {
//             header: "DateInput",
//             component:
//             <DateInput
//                 label="Date"
//                 />
//         },
//         {
//             header: "DateInput",
//             component:
//             <DateInput
//                 label="Date"
//                 value={new Date().getTime() }
//                 />
//         }
//     ]
// });

// /* ******************
//  *  CheckList Input *
//  * ******************/

// const checkBoxListArray = [
//     {
//         key: "Turkey",
//         value: "Türkiye"
//     },
//     {
//         key: "Germany",
//         value: "Almanya"
//     },
//     {
//         key: "England",
//         value: "İngiltere"
//     }
// ];

// components.push({
//     header: "CheckBoxList",
//     component: (
//         <CheckboxList
//             data={checkBoxListArray}
//             dataTextField="value"
//             dataValueField="key"
//             style={{ height: "240px" }}
//             />
//     )
// });

// /* ******************
//  *  SelectInputSingle Input *
//  * ******************/

// const SelectInputSingleArray = [
//     {
//         value: "Turkey",
//         label: "Türkiye"
//     },
//     {
//         value: "Germany",
//         label: "Almanya"
//     },
//     {
//         value: "England",
//         label: "İngiltere"
//     }
// ];

// components.push({
//     header: "Select Input Single",
//     component: (
//         <SelectInputSingle
//             data={SelectInputSingleArray}
//             value="Turkey"
//             placeholder="Seçiminizi yapınız"
//             labelKey="label"
//             valueKey="value"
//             style={{ height: "240px" }}
//             />
//     )
// });


// /* ******************
//  *  SelectInputMulti Input *
//  * ******************/

// const SelectInputMultiArray = [
//     {
//         value: "Turkey",
//         label: "Türkiye"
//     },
//     {
//         value: "Germany",
//         label: "Almanya"
//     },
//     {
//         value: "England",
//         label: "İngiltere"
//     }
// ];

// components.push({
//     header: "Select Input Single",
//     component: (
//         <SelectInputMulti
//             data={SelectInputMultiArray}
//             value="Turkey"
//             placeholder="Seçiminizi yapınız"
//             labelKey="label"
//             valueKey="value"
//             style={{ height: "240px" }}
//             />
//     )
// });


// /* ******************
//  *  HtmlEditor Input *
//  * ******************/
// const htmlText = "<h1>Başlık 1 </h1><div><b>İçerikte böylece devam ediyor...</b></div>";
// components.push({
//     header: "Html Editor",
//     component: (
//         <HtmlEditor
//             disabled={false}
//             label="Giriş Yazısı"
//             value={htmlText}
//             height={400}
//             width={200}
//             />
//     )
// });

// /* ******************
//  *  DataForm *
//  * ******************/

// components.push({
//     header: "Data Form",
//     component: (
//         <DataForm
//             model={DataFormValue.model.columns}
//             data={DataFormValue.data}
//             />
//     )
// });


// /* ******************
//  *  Modal *
//  * ******************/


// class ModalExample extends ShallowComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             show: props.show
//         };
//     }

//     render() {
//         return (
//             <div>
//                 <Button onClick={this.__onClick} >
//                     Open Modal
//                 </Button>
//                 <Modal ref="modalPanel" show={this.state.show}>
//                     <Modal.Header>
//                         <Modal.Title>Kayıt İşlemi</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button>
//                             Kaydet
//                         </Button>
//                         <Button>
//                             Vazgeç
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
//     __onClick = () => {
//         this.setState({
//             show: true
//         });
//     }
// }
// components.push({
//     header: "Modal Panel",
//     component: (
//         <ModalExample show={false} />
//     )
// });

// /* ******************
//  *  ModalDataForm *
//  * ******************/

// class ModalDataFormShower extends ShallowComponent {
//     render() {
//         return (<div>
//             <Button
//                 ref="modalDataFormShowButton"
//                 onClick={this.__onClick}
//                 >
//                 Open Dialog
//             </Button>
//             <ModalDataForm
//                 ref="modalDataFormRef"
//                 show={false}
//                 model={DataFormValue.model.columns}
//                 onCancel={this.__onCancel}
//                 onSave={this.__onSave}
//                 />
//         </div>
//         );
//     }
//     __onClick = () => {
//         this.refs.modalDataFormRef.setState({ showModal: true, formData: DataFormValue.data });
//     }

//     __onCancel = () => {
//         this.refs.modalDataFormRef.setState({ showModal: false });
//     };
//     __onSave = () => {
//         NotificationManager.info("Kaydedildi");
//         this.refs.modalDataFormRef.setState({ showModal: false });
//     }

// }

// components.push({
//     header: "Modal Data Form",
//     component: (
//         <ModalDataFormShower />
//     )
// });


export default class Showcase extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {
            text: "initial"
        };
    }

    render() {
        let componentArray = [];
        let componentMenu = [];
        let components = ComponentList.getComponentList(this.state, this.__handleChange);

        for (let i = 0; i < components.length; i++) {
            let item = components[i];
            componentMenu.push(
                <ListGroupItem href={"#" + item.header}
                    onClick={this.__onComponenListClick}
                    active={this.state.componentSelection === item.header}>
                    {item.header}
                </ListGroupItem>);
            componentArray.push(
                <Renderer
                    header={item.header}
                    desc={item.desc}
                    alternatives={item.alternatives}
                    />);
        }
        return (
            <Grid>
                <NotificationContainer />
                <h2>Components</h2>
                <h5>Here you can find the samples and usages of the components.</h5>
                <Col xs={12} sm={3}><ListGroup>{componentMenu}</ListGroup></Col>
                <Col xs={12} sm={9} style={{ height: "80vh", overflow: "scroll" }} ref="componentView">
                    {componentArray}
                </Col>
            </Grid>
        );
    }

    __onComponenListClick = (e: Object) => {
        this.setState({
            componentSelection: e.target.text
        });
    };

    __handleChange = (code: any, e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
    };
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0;
    }
}
