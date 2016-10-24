import React, { Component } from 'react';
import './TemplateValues.css';

const TextBox = ({ field, handleChange, value }) => (
  <div className="text-box">
    <label>{ field }:</label>
    <input name={ field } value={ value } onChange={ handleChange } />
  </div>
);

class TemplateValues extends Component {

  render() {
    const {
      handleEmail,
      handlePhone,
      handleCompanyName,
      handleFirstName,
      handleLastName,
    } = this.props.callbacks;

    const values = this.props.values;

    return (
      <div className="template-values">
        <h3>Template Values</h3>
        <TextBox
          field="First Name"
          handleChange={ handleFirstName }
          value={ values.contactName.first }
        />
        <TextBox
          field="Last Name"
          handleChange={ handleLastName }
          value={ values.contactName.last }
        />
        <TextBox
          field="Company Name"
          handleChange={ handleCompanyName }
          value={ values.companyName }
        />
        <TextBox
          field="Email"
          handleChange={ handleEmail }
          value={ values.email }
        />
        <TextBox
          field="Phone"
          handleChange={ handlePhone }
          value={ values.phone }
        />
      </div>
    );
  }
}

export default TemplateValues;
