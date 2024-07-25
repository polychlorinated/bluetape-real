"use strict";

var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var frontEndUrl = 'https://bluetap-xnqz.vercel.app';

var sendInvitationEmail = function sendInvitationEmail(recipientEmail, code, projectName, orgName) {
  var data;
  return regeneratorRuntime.async(function sendInvitationEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = {
            from: 'Join@bluetape.io',
            to: recipientEmail,
            text: 'and easy to do anywhere, even with Node.js',
            subject: "You have been invited!",
            html: "<!doctype html>\n      <html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n        <head>\n          <title> </title>\n          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n          <style type=\"text/css\">\n            #outlook a {\n              padding: 0;\n            }\n            body {\n              margin: 0;\n              padding: 0;\n              -webkit-text-size-adjust: 100%;\n              -ms-text-size-adjust: 100%;\n            }\n            table,\n            td {\n              border-collapse: collapse;\n              mso-table-lspace: 0pt;\n              mso-table-rspace: 0pt;\n            }\n            a{\n              font-weight: bold;\n              color: blue;\n            }\n            p {\n              display: block;\n              margin: 13px 0;\n            }\n          </style>\n          <link href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700\" rel=\"stylesheet\" type=\"text/css\">\n          <style type=\"text/css\">\n            @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\n          </style>\n          <style type=\"text/css\">\n            @media only screen and (min-width:480px) {\n              .mj-column-per-100 {\n                width: 100% !important;\n                max-width: 100%;\n              }\n            }\n          </style>\n          <style type=\"text/css\">\n            @media only screen and (max-width:480px) {\n              table.mj-full-width-mobile {\n                width: 100% !important;\n              }\n              td.mj-full-width-mobile {\n                width: auto !important;\n              }\n            }\n          </style>\n        </head>\n        <body>\n          <div style=\"\">\n            <div style=\"margin:0px auto;max-width:600px;\">\n              <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%;\">\n                <tbody>\n                  <tr>\n                    <td style=\"direction:ltr;font-size:0px;padding:20px 0;text-align:center;\">\n                      <div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;\">\n                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:top;\" width=\"100%\">\n                          <tr>\n                            <td align=\"center\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <div style=\"font-family:Avenir;font-size:22px;font-weight:bold;line-height:1;text-align:left;color:#000000;\">You've been invited!</div>\n                            </td>\n                          </tr>\n                          <tr>\n                            <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:2;text-align:left;color:#000000;\">Use  <span style=\"font-weight:700;font-size:18px;\">{{ORGANIZATION}}</span> as the organization name and the case-sensitive code below to create your Bluetape account <a href='".concat(frontEndUrl, "/signup'>here</a></div>\n                            </td>\n                          </tr>\n                          <tr>\n                            <td align=\"left\" vertical-align=\"middle\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                <tr>\n                                  <td align=\"center\" role=\"presentation\">\n                                      <p  style=\"font-size: 28px; font-weight: 700;\">\n                      {{CODE}}\n                                  </p> </td>\n                                </tr>\n                              </table>\n                            </td>\n                          </tr>\n                          <tr>\n                            <td style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <p style=\"border-top:solid 4px #ffffff;font-size:1px;margin:0px auto;width:100%;\"> </p>\n                            </td>\n                          </tr>\n                          <tr>\n                            <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;\">Regards,</div>\n                            </td>\n                          </tr>\n                          <tr>\n                            <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;\">The <b>Bluetape</b> Team</div>\n                            </td>\n                          </tr>\n                        </table>\n                      </div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div style=\"margin:0px auto;max-width:600px;\">\n              <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%;\">\n                <tbody>\n                  <tr>\n                    <td style=\"direction:ltr;font-size:0px;padding:20px 0;text-align:center;\">\n                      <div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;\">\n                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:top;\" width=\"100%\">\n                          <tr>\n                            <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                              <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;\">\n                                <small>This email can't receive replies.</small>\n                              </div>\n                            </td>\n                          </tr>\n                        </table>\n                      </div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </body>\n      </html>").replace('{{CODE}}', code).replace('{{ORGANIZATION}}', orgName).replace('{{project}}', projectName)
          };
          sgMail.send(data).then(function () {
            console.log('Email sent');
          })["catch"](function (error) {
            console.error(error);
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

var sendResetPasswordEmail = function sendResetPasswordEmail(recipientEmail, newPassword) {
  var data;
  return regeneratorRuntime.async(function sendResetPasswordEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = {
            from: 'Join@bluetape.io',
            text: 'and easy to do anywhere, even with Node.js',
            to: recipientEmail,
            subject: "Request to Reset Password",
            html: "<!doctype html>\n    <html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n      <head>\n        <title> </title>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <style type=\"text/css\">\n          #outlook a {\n            padding: 0;\n          }\n          body {\n            margin: 0;\n            padding: 0;\n            -webkit-text-size-adjust: 100%;\n            -ms-text-size-adjust: 100%;\n          }\n          table,\n          td {\n            border-collapse: collapse;\n            mso-table-lspace: 0pt;\n            mso-table-rspace: 0pt;\n          }\n          a{\n            font-weight: bold;\n            color: blue;\n          }\n          p {\n            display: block;\n            margin: 13px 0;\n          }\n        </style>\n        <link href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700\" rel=\"stylesheet\" type=\"text/css\">\n        <style type=\"text/css\">\n          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\n        </style>\n        <style type=\"text/css\">\n          @media only screen and (min-width:480px) {\n            .mj-column-per-100 {\n              width: 100% !important;\n              max-width: 100%;\n            }\n          }\n        </style>\n        <style type=\"text/css\">\n          @media only screen and (max-width:480px) {\n            table.mj-full-width-mobile {\n              width: 100% !important;\n            }\n            td.mj-full-width-mobile {\n              width: auto !important;\n            }\n          }\n        </style>\n      </head>\n      <body>\n        <div style=\"\">\n          <div style=\"margin:0px auto;max-width:600px;\">\n            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%;\">\n              <tbody>\n                <tr>\n                  <td style=\"direction:ltr;font-size:0px;padding:20px 0;text-align:center;\">\n                    <div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;\">\n                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:top;\" width=\"100%\">\n                        <tr>\n                          <td align=\"center\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                            <div style=\"font-family:Avenir;font-size:22px;font-weight:bold;line-height:1;text-align:left;color:#000000;\">Upon Your Request</div>\n                          </td>\n                        </tr>\n                        <tr>\n                          <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                            <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:2;text-align:left;color:#000000;\">Your new password is <b><i>".concat(newPassword, "</i></b>.</div>\n                          </td>\n                        </tr>\n                        <tr>\n                          <td style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                            <p style=\"border-top:solid 4px #ffffff;font-size:1px;margin:0px auto;width:100%;\"> </p>\n                          </td>\n                        </tr>\n                        <tr>\n                          <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                            <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;\">Regards,</div>\n                          </td>\n                        </tr>\n                        <tr>\n                          <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                            <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;\">The <b>Bluetape</b> Team</div>\n                          </td>\n                        </tr>\n                      </table>\n                    </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n          <div style=\"margin:0px auto;max-width:600px;\">\n            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%;\">\n              <tbody>\n                <tr>\n                  <td style=\"direction:ltr;font-size:0px;padding:20px 0;text-align:center;\">\n                    <div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;\">\n                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:top;\" width=\"100%\">\n                        <tr>\n                          <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n                            <div style=\"font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;\">\n                              <small>This email can't receive replies.</small>\n                            </div>\n                          </td>\n                        </tr>\n                      </table>\n                    </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>")
          };
          sgMail.send(data).then(function () {
            console.log('Email sent');
          })["catch"](function (error) {
            console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
            console.error(error);
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // const sendVerificationEmail = async (recipientEmail, token) => {
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
  sendResetPasswordEmail: sendResetPasswordEmail,
  sendInvitationEmail: sendInvitationEmail // sendVerificationEmail,

};