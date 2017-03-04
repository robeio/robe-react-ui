import { Maps } from "robe-react-commons";

export default class Style {
    /**
     * add new styles to the dom element
     * @param domNode
     * @param style
     */
    static add(domNode, style): any {
        if(!domNode) return false;
        if(style) {
            if(!domNode.style) {
                domNode.style = {};
            }
            Maps.forEach(style, (value, key: any) => {
                domNode.style[key] = value;
            });
            return domNode.style;
        }
        return false;
    }

    /**
     * remove new style to the dom element
     * @param domNode
     * @param style
     * @return { Object | false }
     */
    static remove(domNode, style): any {
        if(style) {
            if(!domNode.style) {
                return ;
            }
            Maps.forEach(style, (value, key: any) => {
                delete domNode.style[key];
            });
        }
        if(domNode) {
            return domNode.style;
        }
    }
}