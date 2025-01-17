"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * Jupiter API v6
 * The core of [jup.ag](https://jup.ag). Easily get a quote and swap through Jupiter API.  ### Rate Limit We update our rate limit from time to time depending on the load of our servers. We recommend running your own instance of the API if you want to have high rate limit, here to learn how to run the [self-hosted API](https://station.jup.ag/docs/apis/self-hosted).  ### API Wrapper - Typescript [@jup-ag/api](https://github.com/jup-ag/jupiter-quote-api-node)  ### Data types - Public keys are base58 encoded strings - raw data such as Vec<u8\\> are base64 encoded strings
 *
 * The version of the OpenAPI document: 6.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteGetSwapModeEnum = exports.DefaultApi = void 0;
var runtime = __importStar(require("../runtime"));
var index_1 = require("../models/index");
/**
 *
 */
var DefaultApi = /** @class */ (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * DEPRECATED, please use /tokens for tradable mints. Returns a hash map, input mint as key and an array of valid output mint as values, token mints are indexed to reduce the file size
     * GET /indexed-route-map
     * @deprecated
     */
    DefaultApi.prototype.indexedRouteMapGetRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParameters = {};
                        if (requestParameters.onlyDirectRoutes !== undefined) {
                            queryParameters['onlyDirectRoutes'] = requestParameters.onlyDirectRoutes;
                        }
                        headerParameters = {};
                        return [4 /*yield*/, this.request({
                                path: "/indexed-route-map",
                                method: 'GET',
                                headers: headerParameters,
                                query: queryParameters,
                            }, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.IndexedRouteMapResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * DEPRECATED, please use /tokens for tradable mints. Returns a hash map, input mint as key and an array of valid output mint as values, token mints are indexed to reduce the file size
     * GET /indexed-route-map
     * @deprecated
     */
    DefaultApi.prototype.indexedRouteMapGet = function () {
        return __awaiter(this, arguments, void 0, function (requestParameters, initOverrides) {
            var response;
            if (requestParameters === void 0) { requestParameters = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.indexedRouteMapGetRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns a hash, which key is the program id and value is the label. This is used to help map error from transaction by identifying the fault program id. With that, we can use the `excludeDexes` or `dexes` parameter.
     * GET /program-id-to-label
     */
    DefaultApi.prototype.programIdToLabelGetRaw = function (initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParameters = {};
                        headerParameters = {};
                        return [4 /*yield*/, this.request({
                                path: "/program-id-to-label",
                                method: 'GET',
                                headers: headerParameters,
                                query: queryParameters,
                            }, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response)];
                }
            });
        });
    };
    /**
     * Returns a hash, which key is the program id and value is the label. This is used to help map error from transaction by identifying the fault program id. With that, we can use the `excludeDexes` or `dexes` parameter.
     * GET /program-id-to-label
     */
    DefaultApi.prototype.programIdToLabelGet = function (initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.programIdToLabelGetRaw(initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a GET request to the Jupiter API to get the best priced quote.
     * GET /quote
     */
    DefaultApi.prototype.quoteGetRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (requestParameters.inputMint === null || requestParameters.inputMint === undefined) {
                            throw new runtime.RequiredError('inputMint', 'Required parameter requestParameters.inputMint was null or undefined when calling quoteGet.');
                        }
                        if (requestParameters.outputMint === null || requestParameters.outputMint === undefined) {
                            throw new runtime.RequiredError('outputMint', 'Required parameter requestParameters.outputMint was null or undefined when calling quoteGet.');
                        }
                        if (requestParameters.amount === null || requestParameters.amount === undefined) {
                            throw new runtime.RequiredError('amount', 'Required parameter requestParameters.amount was null or undefined when calling quoteGet.');
                        }
                        queryParameters = {};
                        if (requestParameters.inputMint !== undefined) {
                            queryParameters['inputMint'] = requestParameters.inputMint;
                        }
                        if (requestParameters.outputMint !== undefined) {
                            queryParameters['outputMint'] = requestParameters.outputMint;
                        }
                        if (requestParameters.amount !== undefined) {
                            queryParameters['amount'] = requestParameters.amount;
                        }
                        if (requestParameters.slippageBps !== undefined) {
                            queryParameters['slippageBps'] = requestParameters.slippageBps;
                        }
                        if (requestParameters.autoSlippage !== undefined) {
                            queryParameters['autoSlippage'] = requestParameters.autoSlippage;
                        }
                        if (requestParameters.autoSlippageCollisionUsdValue !== undefined) {
                            queryParameters['autoSlippageCollisionUsdValue'] = requestParameters.autoSlippageCollisionUsdValue;
                        }
                        if (requestParameters.computeAutoSlippage !== undefined) {
                            queryParameters['computeAutoSlippage'] = requestParameters.computeAutoSlippage;
                        }
                        if (requestParameters.swapMode !== undefined) {
                            queryParameters['swapMode'] = requestParameters.swapMode;
                        }
                        if (requestParameters.dexes) {
                            queryParameters['dexes'] = requestParameters.dexes;
                        }
                        if (requestParameters.excludeDexes) {
                            queryParameters['excludeDexes'] = requestParameters.excludeDexes;
                        }
                        if (requestParameters.restrictIntermediateTokens !== undefined) {
                            queryParameters['restrictIntermediateTokens'] = requestParameters.restrictIntermediateTokens;
                        }
                        if (requestParameters.onlyDirectRoutes !== undefined) {
                            queryParameters['onlyDirectRoutes'] = requestParameters.onlyDirectRoutes;
                        }
                        if (requestParameters.asLegacyTransaction !== undefined) {
                            queryParameters['asLegacyTransaction'] = requestParameters.asLegacyTransaction;
                        }
                        if (requestParameters.platformFeeBps !== undefined) {
                            queryParameters['platformFeeBps'] = requestParameters.platformFeeBps;
                        }
                        if (requestParameters.maxAccounts !== undefined) {
                            queryParameters['maxAccounts'] = requestParameters.maxAccounts;
                        }
                        headerParameters = {};
                        return [4 /*yield*/, this.request({
                                path: "/quote",
                                method: 'GET',
                                headers: headerParameters,
                                query: queryParameters,
                            }, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.QuoteResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Sends a GET request to the Jupiter API to get the best priced quote.
     * GET /quote
     */
    DefaultApi.prototype.quoteGet = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.quoteGetRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns instructions that you can use from the quote you get from `/quote`.
     * POST /swap-instructions
     */
    DefaultApi.prototype.swapInstructionsPostRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (requestParameters.swapRequest === null || requestParameters.swapRequest === undefined) {
                            throw new runtime.RequiredError('swapRequest', 'Required parameter requestParameters.swapRequest was null or undefined when calling swapInstructionsPost.');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        headerParameters['Content-Type'] = 'application/json';
                        return [4 /*yield*/, this.request({
                                path: "/swap-instructions",
                                method: 'POST',
                                headers: headerParameters,
                                query: queryParameters,
                                body: (0, index_1.SwapRequestToJSON)(requestParameters.swapRequest),
                            }, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SwapInstructionsResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Returns instructions that you can use from the quote you get from `/quote`.
     * POST /swap-instructions
     */
    DefaultApi.prototype.swapInstructionsPost = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.swapInstructionsPostRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns a transaction that you can use from the quote you get from `/quote`.
     * POST /swap
     */
    DefaultApi.prototype.swapPostRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (requestParameters.swapRequest === null || requestParameters.swapRequest === undefined) {
                            throw new runtime.RequiredError('swapRequest', 'Required parameter requestParameters.swapRequest was null or undefined when calling swapPost.');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        headerParameters['Content-Type'] = 'application/json';
                        return [4 /*yield*/, this.request({
                                path: "/swap",
                                method: 'POST',
                                headers: headerParameters,
                                query: queryParameters,
                                body: (0, index_1.SwapRequestToJSON)(requestParameters.swapRequest),
                            }, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SwapResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Returns a transaction that you can use from the quote you get from `/quote`.
     * POST /swap
     */
    DefaultApi.prototype.swapPost = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.swapPostRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns a list of all the tradable mints
     * GET /tokens
     */
    DefaultApi.prototype.tokensGetRaw = function (initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParameters = {};
                        headerParameters = {};
                        return [4 /*yield*/, this.request({
                                path: "/tokens",
                                method: 'GET',
                                headers: headerParameters,
                                query: queryParameters,
                            }, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response)];
                }
            });
        });
    };
    /**
     * Returns a list of all the tradable mints
     * GET /tokens
     */
    DefaultApi.prototype.tokensGet = function (initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokensGetRaw(initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DefaultApi;
}(runtime.BaseAPI));
exports.DefaultApi = DefaultApi;
/**
 * @export
 */
exports.QuoteGetSwapModeEnum = {
    ExactIn: 'ExactIn',
    ExactOut: 'ExactOut'
};
