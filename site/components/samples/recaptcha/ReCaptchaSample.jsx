import React from "react";
import { ShallowComponent } from "robe-react-commons";
import ReCaptcha from "robe-react-ui/lib/recaptcha/ReCaptcha";

export default class ReCaptchaSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <div className="form-group">
                    <ReCaptcha
                        sitekey="6LckQA8TAAAAAKf4TxLtciRBYphKF5Uq4jRrImJD"
                        render="explicit"
                        language="en"
                        onloadCallback={() => {
                            console.log("loaded.");
                        }}
                        verifyCallback={(verify: Object) => {
                            console.log({ verify });
                        }}
                    />
                </div>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/appleboy/react-recaptcha">Read More About Recaptcha ( React.js wrapper )</a><br />
                <a rel="noopener noreferrer" target="_blank" href="https://www.google.com/recaptcha/intro/index.html">Read More About reCAPTCHA</a>
            </div>
        );
    }
}
