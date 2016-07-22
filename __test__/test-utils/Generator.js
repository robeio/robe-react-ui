import React from "react";
import Maps from "robe-react-commons/lib/utils/Maps";

class Generator {
    getComponent = (props: Object, ClassComponent , defaultProps): Object => {
        if (defaultProps) {
            props = Maps.mergeDeep(props, defaultProps);
        }
        return (
            <ClassComponent
                {...props}
            />
        );
    };

}

export default new Generator();
