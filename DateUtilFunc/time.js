"use strict";
exports.__esModule = true;
exports.toMySQLdatetime = exports.getTime = void 0;
function getTime(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}
exports.getTime = getTime;
function toMySQLdatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
exports.toMySQLdatetime = toMySQLdatetime;
