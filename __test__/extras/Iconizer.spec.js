/**
 * Created by cagdasbekar on 09/02/17.
 */
import chai from "chai";
import TestUtils from "../TestUtils";
import Iconizer from "extras/Iconizer";

describe("Iconizer", () => {

    let links = [
        "http://www.facebook.com/turkishairlines",
        "https://twitter.com/turkishairlines",
        "https://www.linkedin.com/company/turkish-airlines?trk=ppro_cprof",
        "https://plus.google.com/110917299073396811011",
        "https://www.youtube.com/user/TURKISHAIRLINES?sub_confirmation=1",
        "http://instagram.com/turkishairlines",
        "tumblr.com/","snapchat.com/","flickr.com/","git.com/","github.com/","hacker-news.com/","jsfiddle.com/",
        "paypal.com/", "snapchat.com/", "pinterest.com/", "quora.com/", "reddit.com/", "skype.com/", "slideshare.com/",
        "soundcloud.com/", "stack-overflow.com/", "stack-exchange.com/", "stumbleupon.com/", "vimeo.com/", "trello.com/", "non-matching"
    ];

    it("render", () => {
        let props = {
            links: links,
            size: "lg"
        }
        let iconizer = TestUtils.mount(props, Iconizer, props);

        chai.assert.equal(iconizer.find("a").length, 27);

        iconizer.unmount();
    });
});