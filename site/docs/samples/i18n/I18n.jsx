import React from "react";
import {
    Well
} from "react-bootstrap";
import {
    Application,
    ShallowComponent
} from "robe-react-commons";
import Highlight from "react-highlight";
import ex1 from "./Snippet1.txt";
import jsonI18n from "./Snippet_i18n.txt";
import ex2 from "./Snippet2.txt";


export default class I18n extends ShallowComponent {

    render(): Object {
        let parameter = "${minValue}"; //eslint-disable-line
        return (
            <div>
                <p>
                    {Application.i18n(I18n,"i18n.I18n","mainDesc")}
                </p>

                <Highlight className="javascript">{jsonI18n}</Highlight>

                <h4> {Application.i18n(I18n,"i18n.I18n","headerOne")}</h4>
                <p> {Application.i18n(I18n,"i18n.I18n","descOne")}</p>
                <Highlight className="javascript">{ex1}</Highlight>
                <p> {Application.i18n(I18n,"i18n.I18n","descOnePlus")}</p>
                <Well>
                    <p> {Application.i18n(I18n,"i18n.I18n","descOnePlusSub")}</p>
                    <p> {Application.i18n(I18n,"i18n.I18n","descOnePlusSubSub")}</p>
                </Well>

                <h4> {Application.i18n(I18n,"i18n.I18n","headerTwo")}</h4>
                <p> {Application.i18n(I18n,"i18n.I18n","descTwo")}</p>
                <ol>
                    <li> {Application.i18n(I18n,"i18n.I18n","descTwoListOne")}</li>
                    <li> {Application.i18n(I18n,"i18n.I18n","descTwoListTwo")}</li>
                    <li> {Application.i18n(I18n,"i18n.I18n","descTwoListThree")}</li>
                    <li> {Application.i18n(I18n,"i18n.I18n","descTwoListFour")}</li>
                </ol>
                <p> {Application.i18n(I18n,"i18n.I18n","descTwoPlus")}</p>
                <Highlight className="javascript">{ex2}</Highlight>
            </div >
        );
    }
}

