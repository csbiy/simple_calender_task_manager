import {Strategy as TwitterStrategy} from "passport-twitter";

const twitter = new TwitterStrategy({
    consumerKey: "TWITTER_CONSUMER_KEY",
    consumerSecret: "TWITTER_CONSUMER_SECRET",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},()=>{});

export {twitter};