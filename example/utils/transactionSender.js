"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSenderAndConfirmationWaiter = void 0;
var web3_js_1 = require("@solana/web3.js");
var promise_retry_1 = __importDefault(require("promise-retry"));
var wait_1 = require("./wait");
var SEND_OPTIONS = {
    skipPreflight: true,
};
function transactionSenderAndConfirmationWaiter(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var txid, controller, abortSignal, abortableResender, lastValidBlockHeight, e_1, response;
        var _this = this;
        var connection = _b.connection, serializedTransaction = _b.serializedTransaction, blockhashWithExpiryBlockHeight = _b.blockhashWithExpiryBlockHeight;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.sendRawTransaction(serializedTransaction, SEND_OPTIONS)];
                case 1:
                    txid = _c.sent();
                    controller = new AbortController();
                    abortSignal = controller.signal;
                    abortableResender = function () { return __awaiter(_this, void 0, void 0, function () {
                        var e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!true) return [3 /*break*/, 6];
                                    return [4 /*yield*/, (0, wait_1.wait)(2000)];
                                case 1:
                                    _a.sent();
                                    if (abortSignal.aborted)
                                        return [2 /*return*/];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, connection.sendRawTransaction(serializedTransaction, SEND_OPTIONS)];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_2 = _a.sent();
                                    console.warn("Failed to resend transaction: ".concat(e_2));
                                    return [3 /*break*/, 5];
                                case 5: return [3 /*break*/, 0];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); };
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, 5, 6]);
                    abortableResender();
                    lastValidBlockHeight = blockhashWithExpiryBlockHeight.lastValidBlockHeight - 150;
                    // this would throw TransactionExpiredBlockheightExceededError
                    return [4 /*yield*/, Promise.race([
                            connection.confirmTransaction(__assign(__assign({}, blockhashWithExpiryBlockHeight), { lastValidBlockHeight: lastValidBlockHeight, signature: txid, abortSignal: abortSignal }), "confirmed"),
                            new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var tx;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!!abortSignal.aborted) return [3 /*break*/, 3];
                                            return [4 /*yield*/, (0, wait_1.wait)(2000)];
                                        case 1:
                                            _b.sent();
                                            return [4 /*yield*/, connection.getSignatureStatus(txid, {
                                                    searchTransactionHistory: false,
                                                })];
                                        case 2:
                                            tx = _b.sent();
                                            if (((_a = tx === null || tx === void 0 ? void 0 : tx.value) === null || _a === void 0 ? void 0 : _a.confirmationStatus) === "confirmed") {
                                                resolve(tx);
                                            }
                                            return [3 /*break*/, 0];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }),
                        ])];
                case 3:
                    // this would throw TransactionExpiredBlockheightExceededError
                    _c.sent();
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _c.sent();
                    if (e_1 instanceof web3_js_1.TransactionExpiredBlockheightExceededError) {
                        // we consume this error and getTransaction would return null
                        return [2 /*return*/, null];
                    }
                    else {
                        // invalid state from web3.js
                        throw e_1;
                    }
                    return [3 /*break*/, 6];
                case 5:
                    controller.abort();
                    return [7 /*endfinally*/];
                case 6:
                    response = (0, promise_retry_1.default)(function (retry) { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, connection.getTransaction(txid, {
                                        commitment: "confirmed",
                                        maxSupportedTransactionVersion: 0,
                                    })];
                                case 1:
                                    response = _a.sent();
                                    if (!response) {
                                        retry(response);
                                    }
                                    return [2 /*return*/, response];
                            }
                        });
                    }); }, {
                        retries: 5,
                        minTimeout: 1e3,
                    });
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.transactionSenderAndConfirmationWaiter = transactionSenderAndConfirmationWaiter;
