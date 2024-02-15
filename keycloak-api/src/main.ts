import express, { Response, Request } from 'express'
import keycloak, { memoryStore } from './config/keycloak'
import session from 'express-session'
import cors from 'cors'
import jwt, {
    JwtHeader,
    JwtPayload,
    VerifyCallback,
    VerifyErrors
} from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const app = express()
const port = 3000

app.use(cors())
app.use(
    session({
        secret: 'dkas)@#DKas)d@DKAW)@KE@!%ik1q)wDAKs',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 10
        },
        store: memoryStore
    })
)

app.use(
    keycloak.middleware({
        logout: '/logout',
        admin: '/admin'
    })
)

function getKey(header: JwtHeader, callback: jwt.SigningKeyCallback): void {
    const jwksUri =
        'http://localhost:8080/realms/Demo-Realm/protocol/openid-connect/certs' ||
        ''
    const client = jwksClient({ jwksUri, timeout: 30000 })

    client
        .getSigningKey(header.kid)
        .then((key) => callback(null, key.getPublicKey()))
        .catch(callback)
}

// Função para verificar e decodificar o token JWT
export function verify(token: string) {
    return new Promise((resolve, reject) => {
        const verifyCallback: VerifyCallback<JwtPayload | string> = (
            error: VerifyErrors | null,
            decoded: any
        ) => {
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        }

        jwt.verify(token, getKey, verifyCallback)
    })
}

// Rota para visualizar o payload do token
app.get('/protected', (req: Request, res: Response) => {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) {
        return res.status(400).json({ message: 'Token não fornecido' })
    }

    verify(token)
        .then((decoded: any) => {
            console.log(decoded)
            res.json(decoded)
        })
        .catch((error: Error) => {
            res.status(401).json({
                message: 'Erro ao decodificar o token',
                error: error.message
            })
        })
})

// Rota de login
app.get('/login', keycloak.protect(), (req, res) => {
    res.redirect('/')
})

// Rota de logout
// app.get('/logout', (req: any, res: Response) => {
//     req.session?.destroy(() => {
//         req.logout()
//         res.redirect('/')
//     })
// });

app.listen(port, () =>
    console.log(`Express server is listening at http://localhost:${port} 🚀`)
)
