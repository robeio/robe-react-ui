import InputValidations from "validation/InputValidations";

class DocList {

    minValue = InputValidations.minValue.bind(undefined, 2);
    maxValue = InputValidations.maxValue.bind(undefined, 3);

    getList(): Array {
        let components = [];
        /* eslint-disable global-require */
        components.push({
            header: "Validation",
            desc: " is a built-in utility which can be used directly or via DataForm model.",
            sample: require("./samples/validation/ValidationSample")
        });

        components.push({
            header: "Model (for DataForm & DataGrid)",
            desc: " is a built-in mechanism which is used by DataGrid and Dataform.",
            sample: require("./samples/model/ModelSample")
        });
        return components;
    }


}

export default new DocList();
