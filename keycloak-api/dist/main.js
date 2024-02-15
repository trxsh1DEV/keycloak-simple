"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const express_1 = __importDefault(require("express"));
const keycloak_1 = __importStar(require("./config/keycloak"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: 'dkas)@#DKas)d@DKAW)@KE@!%ik1q)wDAKs',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    },
    store: keycloak_1.memoryStore
}));
app.use(keycloak_1.default.middleware({
    logout: '/logout',
    admin: '/admin'
}));
function getKey(header, callback) {
    const jwksUri = 'http://localhost:8080/realms/Demo-Realm/protocol/openid-connect/certs' ||
        '';
    const client = (0, jwks_rsa_1.default)({ jwksUri, timeout: 30000 });
    client
        .getSigningKey(header.kid)
        .then((key) => callback(null, key.getPublicKey()))
        .catch(callback);
}
// Função para verificar e decodificar o token JWT
function verify(token) {
    return new Promise((resolve, reject) => {
        const verifyCallback = (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded);
        };
        jsonwebtoken_1.default.verify(token, getKey, verifyCallback);
    });
}
exports.verify = verify;
// Rota para visualizar o payload do token
app.get('/protected', (req, res) => {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Token não fornecido' });
    }
    verify(token)
        .then((decoded) => {
        console.log(decoded);
        res.json(decoded);
    })
        .catch((error) => {
        res.status(401).json({
            message: 'Erro ao decodificar o token',
            error: error.message
        });
    });
});
// Rota de login
app.get('/login', keycloak_1.default.protect(), (req, res) => {
    res.redirect('/');
});
// Rota de logout
// app.get('/logout', (req: any, res: Response) => {
//     req.session?.destroy(() => {
//         req.logout()
//         res.redirect('/')
//     })
// });
app.listen(port, () => console.log(`Express server is listening at http://localhost:${port} 🚀`));
