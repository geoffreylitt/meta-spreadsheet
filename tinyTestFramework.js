"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEq = exports.assert = void 0;
function assert(arg0) {
    if (!arg0) {
        throw new Error("test failed!");
    }
}
exports.assert = assert;
function assertEq(arg0, arg1) {
    if (arg0 !== arg1) {
        throw new Error(`expected ${arg0} to equal ${arg1}`);
    }
}
exports.assertEq = assertEq;
