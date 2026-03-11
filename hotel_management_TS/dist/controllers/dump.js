//  async send(template) {
//     const Template = path.join(__dirname, './emailTemplates', `${template}`);
//     const emailTemplate = new Email({ views: { root: Template } });
//     const locals = {
//         data: this.data,
//     };
//     const html = await emailTemplate.render(template, locals);
//     const mailOptions = {
//         from: this.SMTP_USER,
//         to: this.to,
//         subject: this.subject,
//         html,
//     };
//     await this.newTransport().sendMail(mailOptions);
// }
//# sourceMappingURL=dump.js.map