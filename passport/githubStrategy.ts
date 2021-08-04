import   { Strategy as GithubStrategy }  from "passport-github";

const github = new GithubStrategy({
    clientID: "GITHUB_CLIENT_ID",
    clientSecret: "GITHUB_CLIENT_SECRET",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},()=>{});

export {github};