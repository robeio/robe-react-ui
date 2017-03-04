import { Arrays, Strings } from "robe-react-commons";
/**
 * Provides some operations on classnames of the dom element.
 */
export default class ClassName {
    /**
     * Provides to merge the given classes and return them as a string.
     * @param {string[]} classNames  You can invoke method with string parameters or a string array.
     * @return {string} return classNames of the given element after the changes.
     * @public
     */
    static merge(...classNames: string[]): string {
        if(!classNames || classNames.length < 0 ) return "";
        classNames = Strings.stringsToArray(classNames);
        return classNames.join(" ");
    }

    /**
     * Sets the given classNames to the given `element` as new classNames and return them.
     * Note: Previous classNames of the given element removed.
     * @param {Element} element must be a dom element.
     * @param {string[]} classNames  You can invoke method with string parameters or a string array.
     * @return {string} return classNames of the given element after the changes.
     * @public
     */
    static set(element: Element, ...classNames: string[]): string {
        element.className = ClassName.merge.apply(undefined, classNames);
        return element.className;
    }

    /**
     * Adds the given classNames to the given `element` and return it's all classNames.
     * Note: Also previous classNames not deleted.
     * @param {Element} element must be a dom element.
     * @param {string[]} classNames  You can invoke method with string parameters or a string array.
     * @return {string} return classNames of the given element after the changes.
     * @public
     */
    static add(element: Element, ...classNames: string[]): string {
        let names = Strings.stringsToArray(classNames);
        if(element.className && element.className !== "") {
            let previousNames  =element.className.split(" ");
            names = Arrays.mergeArraysForNativeType(previousNames, names);
        }
        element.className = names.join(" ");
        return element.className;
    }

    /**
     * Removes the given classNames from the given `element` if exist and then return it's existed classNames.
     * @param {Element} element
     * @param {string[]} classNames classNames  You can invoke method with string parameters or a string array.
     * @return {string}
     * @public
     */
    static remove(element: Element, ...classNames: string[]): string {
        if(element.className && element.className !== ""){
            let names = Strings.stringsToArray(classNames);
            let from  =element.className.split(" ");
            names = Arrays.removeAllForNativeType(from, names);
            element.className = names.join(" ");
        }
        return element.className || "";
    }

    /**
     * Replace the given classNames from the given `element` if exist and then return it's existed classNames.
     * @param {Element} element
     * @param {string} remove className
     * @param {string} add classNames
     * @return {string}
     * @public
     */
    static replace(element: Element,removeName:string,addName:string): string {
        let removeNameArray=[];
        removeNameArray.push(removeName);
        let addNameArray=[];
        addNameArray.push(addName);
        if(element && element.className && element.className !== ""){
            let from  =element.className.split(" ");
            let names = Arrays.removeAllForNativeType(from, [removeName]);
            names = Arrays.mergeArraysForNativeType(names, [addName]);
            element.className = names.join(" ");
        }
        return element ? element.className || "": "";
    }
}