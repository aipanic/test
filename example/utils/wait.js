"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
var wait = function (time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};
exports.wait = wait;
