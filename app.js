const { App } = require('@slack/bolt');
const path = require('path');
const llog = require('./src/ll-modules/ll-utilities/ll-logs')
const { noBotMessages } = require('./src/ll-modules/ll-slack-tools/middleware')
const { messageHandler, eventHandler, actionHandler, slashHandler } = require('./src/elle-l-bot');  

const logRe = /^log/;
const everything = /.*/;

require('dotenv').config();
global.ROOT_DIR = path.resolve(__dirname);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.message('testing testing', noBotMessages, messageHandler.testing);
app.message(/.*/, noBotMessages, messageHandler.parseAll);

app.command('/elle', slashHandler.elleSlash);

(async () => {
  // Start your app
  global.BOT_CONFIG = {channels: [process.env.SLACK_TESTS_CHANNEL]};
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();