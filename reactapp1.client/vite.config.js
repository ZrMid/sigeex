import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "reactapp1.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5148';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api/academias': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/bloques': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/catalogos': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/clases': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/examenes': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/materias': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/programaeducativos': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/reactivos': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/reactivosexamen': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/reactivosrespondidos': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/tiporeactivos': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/tiposprofesores': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/tiposusuarios': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/usuarios': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
            '^/api/usuarioclases': {
                target,
                secure: false,
                onProxyRes: (proxyRes) => {
                    proxyRes.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            },
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
