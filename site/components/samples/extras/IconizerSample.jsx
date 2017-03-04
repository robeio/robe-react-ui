import React from "react";
import {ShallowComponent, Application} from "robe-react-commons";
import Iconizer from "robe-react-ui/lib/extras/Iconizer";

export default class IconizerSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
    }

    links = [
        "http://www.facebook.com/turkishairlines",
        "https://twitter.com/turkishairlines",
        "https://www.linkedin.com/company/turkish-airlines?trk=ppro_cprof",
        "https://plus.google.com/110917299073396811011",
        "https://www.youtube.com/user/TURKISHAIRLINES?sub_confirmation=1",
        "http://instagram.com/turkishairlines"
    ];

    render(): Object {
        return (
            <div>
                <p>
                    <Iconizer links={this.links}/>
                </p>
                <p>
                    <Iconizer links={this.links} size="lg"/>
                </p>
                <p>
                    <Iconizer links={this.links} size="2x"/>
                </p>
                <p>
                    <Iconizer links={this.links} size="3x"/>
                </p>
                <p>
                    <Iconizer links={this.links} size="4x"/>
                </p>
                <strong>{Application.i18n(IconizerSample,"extras.Iconizer", "supports")}: </strong>
                facebook, twitter, linkedin, google+, youtube, instagram, tumblr,
                snapchat, flickr, git, github, hacker-news, jsfiddle, paypal, snapchat,
                pinterest, quora, reddit, skype, slideshare, soundcloud,
                stack-overflow, stack-exchange, stumbleupon, vimeo, trello
            </div>
        );
    }
}
