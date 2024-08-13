/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */

const cron = require('node-cron');

exports.validateEpins = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Running a task every midnight (1:00 am)');
    try {
      console.log('inside');
    } catch (err) {
      console.log(err);
    }
  });
};
