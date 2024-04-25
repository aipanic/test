"use strict";
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
exports.buy = void 0;
var index_1 = require("../src/index");
var web3_js_1 = require("@solana/web3.js");
var anchor_1 = require("@project-serum/anchor");
var bs58_1 = __importDefault(require("bs58"));
var transactionSender_1 = require("./utils/transactionSender");
var getSignature_1 = require("./utils/getSignature");
function buy() {
    return __awaiter(this, void 0, void 0, function () {
        var time, jupiterQuoteApi, wallet, connection, quote, swapResult, swapTransactionBuf, transaction, signature, simulatedTransactionResponse, err, logs, serializedTransaction, blockhash, transactionResponse;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    time = new Date().getTime();
                    jupiterQuoteApi = (0, index_1.createJupiterApiClient)();
                    wallet = new anchor_1.Wallet(web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(process.env.PRIVATE_KEY || "")));
                    console.log("Wallet:", wallet.publicKey.toBase58());
                    connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
                    return [4 /*yield*/, jupiterQuoteApi.quoteGet({
                            outputMint: "B8vV6An7xFF3bARB1cmU7TMfKNjjes2WvY7jWqiRc6K6",
                            inputMint: "So11111111111111111111111111111111111111112",
                            amount: web3_js_1.LAMPORTS_PER_SOL / 100.0,
                            slippageBps: 50,
                            onlyDirectRoutes: false,
                            asLegacyTransaction: false,
                        })];
                case 1:
                    quote = _c.sent();
                    if (!quote) {
                        console.error("unable to quote");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, jupiterQuoteApi.swapPost({
                            swapRequest: {
                                quoteResponse: quote,
                                userPublicKey: wallet.publicKey.toBase58(),
                                dynamicComputeUnitLimit: false,
                                prioritizationFeeLamports: 5000,
                                // prioritizationFeeLamports: {
                                //   autoMultiplier: 2,
                                // },
                            },
                        })];
                case 2:
                    swapResult = _c.sent();
                    console.dir(swapResult, { depth: null });
                    swapTransactionBuf = Buffer.from(swapResult.swapTransaction, "base64");
                    transaction = web3_js_1.VersionedTransaction.deserialize(swapTransactionBuf);
                    // Sign the transaction
                    transaction.sign([wallet.payer]);
                    signature = (0, getSignature_1.getSignature)(transaction);
                    return [4 /*yield*/, connection.simulateTransaction(transaction, {
                            replaceRecentBlockhash: true,
                            commitment: "processed",
                        })];
                case 3:
                    simulatedTransactionResponse = (_c.sent()).value;
                    err = simulatedTransactionResponse.err, logs = simulatedTransactionResponse.logs;
                    if (err) {
                        // Simulation error, we can check the logs for more details
                        // If you are getting an invalid account error, make sure that you have the input mint account to actually swap from.
                        console.error("Simulation Error:");
                        console.error({ err: err, logs: logs });
                        return [2 /*return*/];
                    }
                    serializedTransaction = Buffer.from(transaction.serialize());
                    blockhash = transaction.message.recentBlockhash;
                    console.log("Sending transaction at time:", new Date().getTime() - time);
                    return [4 /*yield*/, (0, transactionSender_1.transactionSenderAndConfirmationWaiter)({
                            connection: connection,
                            serializedTransaction: serializedTransaction,
                            blockhashWithExpiryBlockHeight: {
                                blockhash: blockhash,
                                lastValidBlockHeight: swapResult.lastValidBlockHeight,
                            },
                        })];
                case 4:
                    transactionResponse = _c.sent();
                    console.log("Transaction transactionSenderAndConfirmationWaiter awaited");
                    console.log("Time taken: ".concat(new Date().getTime() - time, "ms"));
                    // If we are not getting a response back, the transaction has not confirmed.
                    if (!transactionResponse) {
                        console.error("Transaction not confirmed");
                        return [2 /*return*/];
                    }
                    if ((_a = transactionResponse.meta) === null || _a === void 0 ? void 0 : _a.err) {
                        console.error((_b = transactionResponse.meta) === null || _b === void 0 ? void 0 : _b.err);
                    }
                    console.log("https://solscan.io/tx/".concat(signature));
                    console.log("Transaction confirmed in time:", new Date().getTime() - time);
                    return [2 /*return*/];
            }
        });
    });
}
exports.buy = buy;
// main();
// Add this line at the end of your index.ts
