const replaceValues = (email, values) => {

};

class Template {
  /**
   * Generate the template.
   */
  generateEmail(template, values) {
    let email = template.replace('{{firstName}}', values.contactName.first);
    email = email.replace('{{companyName}}', values.companyName);
    email = email.replace('{{email}}', values.email);
    email = email.replace('{{phone}}', values.phone);
    email = email.replace('{{lastName}}', values.contactName.last);

    return email;
  }
}

export default Template;
