"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryStore = void 0;
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
const express_session_1 = __importDefault(require("express-session"));
exports.memoryStore = new express_session_1.default.MemoryStore();
const config = {
    realm: 'Demo-Realm',
    'auth-server-url': 'http://localhost:8080/',
    resource: 'nodejs-microservice', // == cliendID
    'confidential-port': 0,
    'ssl-required': 'external'
};
const keycloak = new keycloak_connect_1.default({ store: exports.memoryStore }, config);
exports.default = keycloak;
