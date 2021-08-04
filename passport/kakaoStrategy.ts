import {Strategy as KakaoStrategy } from "passport-kakao";

const kakao :KakaoStrategy = new KakaoStrategy({
    clientID:"clientID",
    clientSecret:"clientSecret",
    callbackURL:"callbackURL",
}
,()=>{});

export {kakao};