import React from 'react';
import { useState } from 'react';

function form() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    sex: '',
  });

  const [issues, setIssues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleError();
    if (handleError) {
      console.log(data);
    } else {
      console.log('errors');
    }
  };

  const handleError = () => {
    let formValid = true;
    let errors = {};
    if (!data.name || data.name.length == 0) {
      formValid = false;
      errors['nameIssue'] = 'Name is Required';
    } else if (data.name.length > 15) {
      errors['nameIssue'] = 'Name should be less than 14 characters ';
      formValid = false;
    }

    if (!data.email || data.email.length == 0) {
      formValid = false;
      errors['emailIssue'] = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors['emailIssue'] = 'Invalid Format';
      formValid = false;
    }

    if (!data.phone || data.phone.length == 0) {
      formValid = false;
      errors['phoneIssue'] = 'Number is required';
    } else if (data.phone.length > 11) {
      errors['phoneIssue'] = 'Should be less than 11 characters ';
      formValid = false;
    }
    setIssues({ ...errors });
    return formValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form Validation</h3>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        ></input>
        <i>{issues && issues.nameIssue}</i>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        ></input>
        <i>{issues && issues.emailIssue}</i>
      </div>

      <div>
        <label>Phone No:</label>
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={data.phone}ds
          onChange={handleChange}
          maxLength="10"
        ></input>
        <i>{issues && issues.phoneIssue}</i>
      </div>

      <div>
        <input type="radio" id="male" name="male" value={data.sex} />
        <label for="male"> Male </label>
        <input type="radio" id="female" name="female" value={data.sex} />
        <label for="female"> Female </label>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default form;
