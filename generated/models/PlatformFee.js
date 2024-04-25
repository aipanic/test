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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformFeeToJSON = exports.PlatformFeeFromJSONTyped = exports.PlatformFeeFromJSON = exports.instanceOfPlatformFee = void 0;
var runtime_1 = require("../runtime");
/**
 * Check if a given object implements the PlatformFee interface.
 */
function instanceOfPlatformFee(value) {
    var isInstance = true;
    return isInstance;
}
exports.instanceOfPlatformFee = instanceOfPlatformFee;
function PlatformFeeFromJSON(json) {
    return PlatformFeeFromJSONTyped(json, false);
}
exports.PlatformFeeFromJSON = PlatformFeeFromJSON;
function PlatformFeeFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'amount': !(0, runtime_1.exists)(json, 'amount') ? undefined : json['amount'],
        'feeBps': !(0, runtime_1.exists)(json, 'feeBps') ? undefined : json['feeBps'],
    };
}
exports.PlatformFeeFromJSONTyped = PlatformFeeFromJSONTyped;
function PlatformFeeToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'amount': value.amount,
        'feeBps': value.feeBps,
    };
}
exports.PlatformFeeToJSON = PlatformFeeToJSON;