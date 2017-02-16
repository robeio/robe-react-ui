import React, { PropTypes } from "react";
import { ShallowComponent, Application } from "robe-react-commons";
import FaIcon from "../faicon/FaIcon";

export default class Iconizer extends ShallowComponent {

    static propTypes = {
        /**
         * Links array
         */
        links: React.PropTypes.array,
        /**
         * Icons size
         */
        size: React.PropTypes.oneOf(["sm", "lg", "2x", "3x", "4x", "5x"])
    };

    static defaultProps = {
        links: []
    };

    render(): Object {
        return (<span>
            {this.__renderLinks()}
        </span>);
    }

    __renderLinks() {
        let links = this.props.links;
        let linksFormatted = [];
        for(let i=0;i<links.length;i++) {
            linksFormatted.push(
                <a key={i+1} href={links[i]} target="_blank">
                    <FaIcon code={this.__getIconOfLink(links[i])} size={this.props.size ? "fa-"+this.props.size : undefined}/>
                </a>
            )
        }
        return linksFormatted;
    }

    __getIconOfLink(link) {
        if(link.toLowerCase().indexOf("facebook.com/") != -1) return "fa-facebook-official";
        if(link.toLowerCase().indexOf("twitter.com/") != -1) return "fa-twitter-square";
        if(link.toLowerCase().indexOf("linkedin.com/") != -1) return "fa-linkedin-square";
        if(link.toLowerCase().indexOf("plus.google.com/") != -1) return "fa-google-plus-official";
        if(link.toLowerCase().indexOf("youtube.com/") != -1) return "fa-youtube-square";
        if(link.toLowerCase().indexOf("instagram.com/") != -1) return "fa-instagram";
        if(link.toLowerCase().indexOf("tumblr.com/") != -1) return "fa-tumblr-square";
        if(link.toLowerCase().indexOf("snapchat.com/") != -1) return "fa-snapchat-square";
        if(link.toLowerCase().indexOf("flickr.com/") != -1) return "fa-flickr";
        if(link.toLowerCase().indexOf("git.com/") != -1) return "fa-git-square";
        if(link.toLowerCase().indexOf("github.com/") != -1) return "fa-github-square";
        if(link.toLowerCase().indexOf("hacker-news.com/") != -1) return "fa-hacker-news";
        if(link.toLowerCase().indexOf("jsfiddle.com/") != -1) return "fa-jsfiddle";
        if(link.toLowerCase().indexOf("paypal.com/") != -1) return "fa-paypal";
        if(link.toLowerCase().indexOf("pinterest.com/") != -1) return "fa-pinterest-square";
        if(link.toLowerCase().indexOf("quora.com/") != -1) return "fa-quora";
        if(link.toLowerCase().indexOf("reddit.com/") != -1) return "fa-reddit-square";
        if(link.toLowerCase().indexOf("skype.com/") != -1) return "fa-skype";
        if(link.toLowerCase().indexOf("slideshare.com/") != -1) return "fa-slideshare";
        if(link.toLowerCase().indexOf("soundcloud.com/") != -1) return "fa-soundcloud-square";
        if(link.toLowerCase().indexOf("stack-overflow.com/") != -1) return "fa-stack-overflow";
        if(link.toLowerCase().indexOf("stack-exchange.com/") != -1) return "fa-stack-exchange";
        if(link.toLowerCase().indexOf("stumbleupon.com/") != -1) return "fa-stumbleupon-circle";
        if(link.toLowerCase().indexOf("vimeo.com/") != -1) return "fa-vimeo-square";
        if(link.toLowerCase().indexOf("trello.com/") != -1) return "fa-trello";
        return "fa-question-circle-o";
    }
}