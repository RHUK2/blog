import nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'gusdnr814',
    pass: 'PHZUZF3GRYC3',
  },
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: '"RHUK2" <gusdnr814@naver.com>',
    to: 'gusdnr814@naver.com',
    subject: '이메일이 발송되었습니다.',
    text: 'Hello world?', // plain‑text body
    html: '<b>Hello world?</b>', // HTML body
  });

  console.log('Message sent:', info.messageId);
})();
