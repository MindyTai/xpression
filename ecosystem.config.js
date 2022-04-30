
            module.exports = {
            apps: [
                {
                name: 'xpression-dev',
                script: '/srv/xpression/releases/20220430124012/src/index.js',
                watch: true,
                autorestart: true,
                restart_delay: 1000,
                env_development: {
                    NODE_ENV: 'development'
                },
                env_production: {
                    PORT: 3000,
                    NODE_ENV: 'production'
                    }
                }
            ]
        };