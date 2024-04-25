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
// Key derivation function using PBKDF2
function deriveKey(password, salt) {
    return __awaiter(this, void 0, void 0, function () {
        var encoder, keyMaterial;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encoder = new TextEncoder();
                    return [4 /*yield*/, crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, ['deriveKey'])];
                case 1:
                    keyMaterial = _a.sent();
                    return [4 /*yield*/, crypto.subtle.deriveKey({
                            name: 'PBKDF2',
                            salt: salt,
                            iterations: 100000,
                            hash: 'SHA-256'
                        }, keyMaterial, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Encrypt private key using AES-GCM
function encryptPrivateKey(privateKey, password) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, key, encoder, iv, encrypted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    salt = crypto.getRandomValues(new Uint8Array(16));
                    return [4 /*yield*/, deriveKey(password, salt)];
                case 1:
                    key = _a.sent();
                    encoder = new TextEncoder();
                    iv = crypto.getRandomValues(new Uint8Array(12));
                    return [4 /*yield*/, crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encoder.encode(privateKey))];
                case 2:
                    encrypted = _a.sent();
                    return [2 /*return*/, {
                            encrypted: Array.from(new Uint8Array(encrypted)),
                            iv: Array.from(iv),
                            salt: Array.from(salt)
                        }];
            }
        });
    });
}
// Decrypt private key using AES-GCM
function decryptPrivateKey(encryptedKey, password) {
    return __awaiter(this, void 0, void 0, function () {
        var key, decrypted, decoder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deriveKey(password, new Uint8Array(encryptedKey.salt))];
                case 1:
                    key = _a.sent();
                    return [4 /*yield*/, crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(encryptedKey.iv) }, key, new Uint8Array(encryptedKey.encrypted))];
                case 2:
                    decrypted = _a.sent();
                    decoder = new TextDecoder();
                    return [2 /*return*/, decoder.decode(decrypted)];
            }
        });
    });
}
// Store encrypted private key in localStorage
function storePrivateKey() {
    return __awaiter(this, void 0, void 0, function () {
        var privateKeyInput, passwordInput, privateKey, password, encryptedKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    privateKeyInput = document.getElementById('privateKeyInput');
                    passwordInput = document.getElementById('passwordInput');
                    privateKey = privateKeyInput.value;
                    password = passwordInput.value;
                    return [4 /*yield*/, encryptPrivateKey(privateKey, password)];
                case 1:
                    encryptedKey = _a.sent();
                    localStorage.setItem('encryptedPrivateKey', JSON.stringify(encryptedKey));
                    alert('Private key stored successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
// Retrieve and decrypt private key from localStorage
function getPrivateKey(password) {
    return __awaiter(this, void 0, void 0, function () {
        var encryptedKeyJson, encryptedKey, privateKey, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encryptedKeyJson = localStorage.getItem('encryptedPrivateKey');
                    if (!encryptedKeyJson) return [3 /*break*/, 4];
                    encryptedKey = JSON.parse(encryptedKeyJson);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, decryptPrivateKey(encryptedKey, password)];
                case 2:
                    privateKey = _a.sent();
                    return [2 /*return*/, privateKey];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error decrypting private key:', error_1);
                    alert('Invalid password. Please try again.');
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
// Handle form submission
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordInput, password, privateKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    passwordInput = document.getElementById('passwordInput');
                    password = passwordInput.value;
                    return [4 /*yield*/, getPrivateKey(password)];
                case 1:
                    privateKey = _a.sent();
                    if (privateKey) {
                        console.log('Private key:', privateKey);
                        // Perform swap functionality here
                        alert('Swap initiated successfully!');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Attach event listener to the form
document.addEventListener('DOMContentLoaded', function () {
    var keyForm = document.getElementById('keyForm');
    keyForm.addEventListener('submit', handleSubmit);
});
