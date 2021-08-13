import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Must enter a title";
  }
  if (!formValues.description) {
    errors.description = "Must enter a description";
  }

  return errors;
};

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="from">
        <label>{label}</label>
        <input {...input} autocomplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button">Submit</button>
      </form>
    );
  }
}

// const StreamCreate = () => {

//   return <div>StreamCreate</div>;
// };

export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);
