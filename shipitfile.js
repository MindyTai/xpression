module.exports = shipit => {
    require('shipit-deploy')(shipit)
    const appName = 'xpression-dev'

    shipit.initConfig({
      default: {
        deployTo: '/srv/xpression',
        branch: 'main',
        repositoryUrl: 'https://github.com/MindyTai/xpression.git',
        shared: {
            overwrite: true,
            dirs: ['node_modules']
        },
        keepReleases: 5,
        deleteOnRollback: false
      },
      production: {
        servers: [
            {
                host: `${appName}`,
                user: 'ubuntu'
            }
        ],
        workspace: '/srv/xpression'
      },
    })

    shipit.on('updated', async () => {
        shipit.start('copy-config');
    });

    shipit.on('published', () => {
        shipit.start('pm2-server',);
    });

    shipit.on('deployed', () => {
        shipit.start('app-server');

    });

    const path = require('path');
    const ecosystemFilePath = path.join(
        shipit.config.deployTo,
        'shared',
        'ecosystem.config.js'
    );

    shipit.blTask('copy-config', async () => {
        const fs = require('fs');
        const ecosystem = `
            module.exports = {
            apps: [
                {
                name: '${appName}',
                script: '${shipit.releasePath}/src/index.js',
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
        };`;
            
        fs.writeFileSync('ecosystem.config.js', ecosystem, function(err) {
          if (err) throw err;
          console.log('File created successfully.');
        });
    
        await shipit.copyToRemote('ecosystem.config.js', ecosystemFilePath);
      });       
   
    shipit.blTask('app-server', async () => {
        const processName = 'xpression';
        
        let cmd = `
            cd /srv/app-env/${processName} &&
            cd ${shipit.releasePath} &&
            sudo npm install
        `;

        await shipit.remote(cmd);
    });

    shipit.blTask('pm2-server', async () => {
        await shipit.remote(`pm2 delete -s ${appName} || :`);
        await shipit.remote(
            `pm2 start ${ecosystemFilePath} --env production --watch true`
        );
    });
};
