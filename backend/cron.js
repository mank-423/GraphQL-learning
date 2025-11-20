import cron from 'cron'
import https from 'https'

const URL = "https://graphql-learning.onrender.com/"

const job = new cron.CronJob('*/14 * * * *', () => {
    https.get(URL, (res) => {
        if (res.statusCode === 200){
            console.log('GET request sent successfully');
        } else{
            console.log('GET request failed', res.statusCode);
        }
    }).on('error', (e) => {
        console.error('Error while sending request', e);
    })
})

export default job;

// Examples
// * 14 * * * * - Every 14 mins
// * 0 0 * * 0 - midnight every sunday
// * 0 * * * * - every hour