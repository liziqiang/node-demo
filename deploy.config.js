let host = require('./deploy_host');
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'node-demo',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
        user: 'ubuntu',
        key: '/Users/lizq/.ssh/lizq.pem',
        host,
        ref  : 'origin/master',
        repo : 'git@github.com:liziqiang/node-demo.git',
        path : '/home/ubuntu/site/node-demo',
        'post-deploy' : 'yarn install && pm2 restart node-demo'
    }
  }
};
