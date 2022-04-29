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

    shipit.on('deployed', () => {
        const processName = 'xpression';
        const env = shipit.environment;

        let cmd = `
            cd ${shipit.releasePath} && npm install --production && 
            (
                pm2 restart ${processName} ||
                NODE_ENV=${env} pm2 start index.js --name ${processName}
            )
        `;

        shipit.remote(cmd);
    });
};
