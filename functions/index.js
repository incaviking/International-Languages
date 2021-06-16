const functions = require('firebase-functions');
const cors = require('cors')({ origin: true, });

exports.contactUs = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {  
    var send = require('gmail-send')({
      user: 'intlangnoreply@gmail.com',
      pass: 'A110388a?!?',
      to: ['tomkj4@gmail.com', 'andres@itlanguages.com'],//'tomkj4@gmail.com',
      // to:   credentials.user,                  // Send to yourself
      // you also may set array of recipients:
      // [ 'user1@gmail.com', 'user2@gmail.com' ]
      // from:    credentials.user,            // from: by default equals to user
      replyTo: request.body.email,            // replyTo: by default undefined
      // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
      subject: 'International Languages Contact Form',
      //text: 'gmail-send example 1', // Plain text
      html:    `<b>Name:</b> ${request.body.name}<br /><b>Email:</b> ${request.body.email}<br /><b>Languages:</b> ${request.body.langs}<br/><b>Service:</b> ${request.body.service}<br /><br /><b>Message:</b><br />${request.body.message}`            // HTML
    });

    send().then(({ result, full }) => {
        console.log(result);
        response.json({});
    }).catch((error) => {
        console.error('ERROR', error);
        response.send(`error ${error}`);
    });
  });
});