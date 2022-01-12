import React from 'react';
import { useState } from 'react';

function form() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    gender: '',
  });

  const [issues, setIssues] = useState({});

  const [gender, setGender] = useState();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleError) {
      console.log(data, gender);
    } else {
      console.log('Errors');
    }
  };

  const handleError = (e) => {
    const { name, value } = e.target;

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

    if (!data.password || data.password.length == 0) {
      formValid = false;
      errors['passIssue'] = 'Enter password';
    } else if (
      !/^[A-Za-z]\w{7,14}$/i.test(data.password) &&
      data.password.length < 5
    ) {
      errors['passIssue'] = 'Invalid password';
      formValid = false;
    }

    if (!data.password2 || data.password2.length == 0) {
      formValid = false;
      errors['passIssue2'] = 'Password required';
    } else if (data.password != data.password2) {
      formValid = false;
      errors['passIssue2'] = "Password didn't match";
    }

    setData({ ...data, [name]: value });
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
          onChange={handleError}
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
          onChange={handleError}
        ></input>
        <i>{issues && issues.emailIssue}</i>
      </div>

      <div>
        <label>Phone No:</label>
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleError}
          maxLength="10"
        ></input>
        <i>{issues && issues.phoneIssue}</i>
      </div>

      {/* <div>
        <input
          type="radio"
          id="male"
          name="male"
          value={data.sex}
          onChange={() => {
            setData.sex == 'male';
          }}
        />
        <label> Male </label>
        <input
          type="radio"
          id="female"
          name="female"
          value={data.sex}
          onChange={() => {
            setData.sex == 'female';
          }}
        />
        <label> Female </label>
      </div> */}

      <div>
        <label>Gender:</label>
        <RadioInput
          label="Male"
          value="male"
          checked={gender}
          setter={setData}
        />
        <RadioInput
          label="Female"
          value="female"
          checked={gender}
          setter={setGender}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleError}
        ></input>
        <i>{issues && issues.passIssue}</i>
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={data.password2}
          onChange={handleError}
        ></input>
        <i>{issues && issues.passIssue2}</i>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default form;

const RadioInput = ({ label, value, checked, setter }) => {
  return (
    <label>
      <input
        type="radio"
        checked={checked == value}
        onChange={() => setter(value)}
      />
      <span>{label}</span>
    </label>
  );
};
