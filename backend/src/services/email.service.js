const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const frontEndUrl = 'https://bluetap-xnqz.vercel.app';
const sendInvitationEmail = async (recipientEmail, code, projectName, orgName) => {
  const data = {
    from: 'Join@bluetape.io',
    to: recipientEmail,
    text: 'and easy to do anywhere, even with Node.js',
    subject: `You have been invited!`,
    html: `<!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <title> </title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
            a{
              font-weight: bold;
              color: blue;
            }
            p {
              display: block;
              margin: 13px 0;
            }
          </style>
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
          <style type="text/css">
            @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
          </style>
          <style type="text/css">
            @media only screen and (min-width:480px) {
              .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
              }
            }
          </style>
          <style type="text/css">
            @media only screen and (max-width:480px) {
              table.mj-full-width-mobile {
                width: 100% !important;
              }
              td.mj-full-width-mobile {
                width: auto !important;
              }
            }
          </style>
        </head>
        <body>
          <div style="">
            <div style="margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tr>
                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <div style="font-family:Avenir;font-size:22px;font-weight:bold;line-height:1;text-align:left;color:#000000;">You've been invited!</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:2;text-align:left;color:#000000;">Use  <span style="font-weight:700;font-size:18px;">{{ORGANIZATION}}</span> as the organization name and the case-sensitive code below to create your Bluetape account <a href='${frontEndUrl}/signup'>here</a></div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td align="center" role="presentation">
                                      <p  style="font-size: 28px; font-weight: 700;">
                      {{CODE}}
                                  </p> </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <p style="border-top:solid 4px #ffffff;font-size:1px;margin:0px auto;width:100%;"> </p>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;">Regards,</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">The <b>Bluetape</b> Team</div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tr>
                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                                <small>This email can't receive replies.</small>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>`
      .replace('{{CODE}}', code)
      .replace('{{ORGANIZATION}}', orgName)
      .replace('{{project}}', projectName),
  };
  sgMail
    .send(data)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendResetPasswordEmail = async (recipientEmail, newPassword) => {
  const data = {
    from: 'Join@bluetape.io',
    text: 'and easy to do anywhere, even with Node.js',
    to: recipientEmail,
    subject: `Request to Reset Password`,
    html: `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title> </title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          a{
            font-weight: bold;
            color: blue;
          }
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        </style>
        <style type="text/css">
          @media only screen and (min-width:480px) {
            .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
            }
          }
        </style>
        <style type="text/css">
          @media only screen and (max-width:480px) {
            table.mj-full-width-mobile {
              width: 100% !important;
            }
            td.mj-full-width-mobile {
              width: auto !important;
            }
          }
        </style>
      </head>
      <body>
        <div style="">
          <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Avenir;font-size:22px;font-weight:bold;line-height:1;text-align:left;color:#000000;">Upon Your Request</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:2;text-align:left;color:#000000;">Your new password is <b><i>${newPassword}</i></b>.</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <p style="border-top:solid 4px #ffffff;font-size:1px;margin:0px auto;width:100%;"> </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;">Regards,</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">The <b>Bluetape</b> Team</div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                              <small>This email can't receive replies.</small>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>`,
  };
  sgMail
    .send(data)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.log(
        'errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
      );
      console.error(error);
    });
};

// const sendVerificationEmail = async (recipientEmail, token) => {
//   const data = {
//     from: config.email.from,
//     to: recipientEmail,
//     subject: `Verify Your Account`,
//     html: `<!doctype html>
//       <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//         <head>
//           <title> </title>
//           <meta http-equiv="X-UA-Compatible" content="IE=edge">
//           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1">
//           <style type="text/css">
//             #outlook a {
//               padding: 0;
//             }
//             body {
//               margin: 0;
//               padding: 0;
//               -webkit-text-size-adjust: 100%;
//               -ms-text-size-adjust: 100%;
//             }
//             table,
//             td {
//               border-collapse: collapse;
//               mso-table-lspace: 0pt;
//               mso-table-rspace: 0pt;
//             }
//             a{
//               font-weight: bold;
//               color: blue;
//             }
//             p {
//               display: block;
//               margin: 13px 0;
//             }
//           </style>
//           <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
//           <style type="text/css">
//             @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
//           </style>
//           <style type="text/css">
//             @media only screen and (min-width:480px) {
//               .mj-column-per-100 {
//                 width: 100% !important;
//                 max-width: 100%;
//               }
//             }
//           </style>
//           <style type="text/css">
//             @media only screen and (max-width:480px) {
//               table.mj-full-width-mobile {
//                 width: 100% !important;
//               }
//               td.mj-full-width-mobile {
//                 width: auto !important;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div style="">
//             <div style="margin:0px auto;max-width:600px;">
//               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//                 <tbody>
//                   <tr>
//                     <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//                       <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                           <tr>
//                             <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                               <div style="font-family:Avenir;font-size:22px;font-weight:bold;line-height:1;text-align:left;color:#000000;">Verify You Account</div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                               <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:2;text-align:left;color:#000000;">Click <a href='${frontEndUrl}/verify_account/{{token}}'>here</a></div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                               <p style="border-top:solid 4px #ffffff;font-size:1px;margin:0px auto;width:100%;"> </p>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                               <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;">Regards,</div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                               <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">The <b>Bluetape</b> Team</div>
//                             </td>
//                           </tr>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div style="margin:0px auto;max-width:600px;">
//               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//                 <tbody>
//                   <tr>
//                     <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//                       <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                           <tr>
//                             <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                               <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
//                                 <small>This email can't receive replies.</small>
//                               </div>
//                             </td>
//                           </tr>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </body>
//       </html>`.replace('{{token}}', token),
//   };
//   await mg.messages().send(data);
// };

module.exports = {
  sendResetPasswordEmail,
  sendInvitationEmail,
  // sendVerificationEmail,
};
