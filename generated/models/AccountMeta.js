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
exports.AccountMetaToJSON = exports.AccountMetaFromJSONTyped = exports.AccountMetaFromJSON = exports.instanceOfAccountMeta = void 0;
/**
 * Check if a given object implements the AccountMeta interface.
 */
function instanceOfAccountMeta(value) {
    var isInstance = true;
    isInstance = isInstance && "pubkey" in value;
    isInstance = isInstance && "isSigner" in value;
    isInstance = isInstance && "isWritable" in value;
    return isInstance;
}
exports.instanceOfAccountMeta = instanceOfAccountMeta;
function AccountMetaFromJSON(json) {
    return AccountMetaFromJSONTyped(json, false);
}
exports.AccountMetaFromJSON = AccountMetaFromJSON;
function AccountMetaFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'pubkey': json['pubkey'],
        'isSigner': json['isSigner'],
        'isWritable': json['isWritable'],
    };
}
exports.AccountMetaFromJSONTyped = AccountMetaFromJSONTyped;
function AccountMetaToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'pubkey': value.pubkey,
        'isSigner': value.isSigner,
        'isWritable': value.isWritable,
    };
}
exports.AccountMetaToJSON = AccountMetaToJSON;
