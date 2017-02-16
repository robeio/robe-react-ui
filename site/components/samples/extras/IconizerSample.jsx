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
                <Iconizer key="1" links={this.links}/>
                <br/>
                <br/>
                <Iconizer key="2" links={this.links} size="lg"/>
                <br/>
                <br/>
                <Iconizer key="3" links={this.links} size="2x"/>
                <br/>
                <br/>
                <Iconizer key="4" links={this.links} size="3x"/>
                <br/>
                <br/>
                <Iconizer key="5" links={this.links} size="4x"/>
                <br/>
                <br/>
                <strong>{Application.i18n(IconizerSample,"extras.Iconizer", "supports")}: </strong>
                facebook, twitter, linkedin, google+, youtube, instagram, tumblr,
                snapchat, flickr, git, github, hacker-news, jsfiddle, paypal, snapchat,
                pinterest, quora, reddit, skype, slideshare, soundcloud,
                stack-overflow, stack-exchange, stumbleupon, vimeo, trello
            </div>
        );
    }
}
