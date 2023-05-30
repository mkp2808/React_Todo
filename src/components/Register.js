import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Register.css';
import { ApiList, BASE_URL } from '../util/Api/ApiList';

function Register() {

  var nameformat = /^[a-zA-Z]+$/;
  // eslint-disable-next-line
  var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const navigate = useNavigate();

  const [inpval, setInputval] = useState({

    fname: "",
    lname: "",
    gender: "Male",
    country: "",
    address: "",
    email: "",
    pass: "",
    cpass: "",
    tnc: ""
  });


  const [error, setError] = useState({})

  const handlefName = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, fname: value })

    if (value === "") {
      setError({ ...error, fname: "name should not be empty" })
      return false;
    }
    else if (!value.match(nameformat)) {
      setError({ ...error, fname: "name should only contains alphabets" })
      return false;
    }
    else {
      setError({ ...error, fname: "" })
      return true;
    }
  }

  const handlelName = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, lname: value })


    if (value === "") {
      setError({ ...error, lname: "name should not be empty" })
      return false;
    }
    else if (!value.match(nameformat)) {
      setError({ ...error, lname: "name should only contains alphabets" })
      return false;
    }
    else {
      setError({ ...error, lname: "" })
      return true;
    }
  }

  const handleGender = (e) => {

    const { value } = e.target;
    console.log(value);
    setInputval({ ...inpval, gender: value })
    if (value === "") {
      setError({ ...error, gender: "Please enter your email" })
      return false;
    }
    else {
      setError({ ...error, gender: "" })
      return true;
    }
  }

  const handleAddress = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, address: value })


    if (value === "") {
      setError({ ...error, address: "address should not be empty" })
      return false;
    }
    else {
      setError({ ...error, address: "" })
      return true;
    }
  }
  const handleCountry = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, country: value })


    if (value === "") {
      setError({ ...error, country: "country should not be empty" })
      return false;
    }
    else if (!value.match(nameformat)) {
      setError({ ...error, country: "country should only contains alphabets" })
      return false;
    }
    else {
      setError({ ...error, country: "" })
      return true;
    }
  }

  const handleEmail = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, email: value })
    if (value === "") {
      setError({ ...error, email: "Email should not be empty" })
      return false;
    }
    else if (!value.match(mailformat)) {
      setError({ ...error, email: "Enter a valid email id" })
      return false;
    }
    else {
      setError({ ...error, email: "" })
      return true;
    }
  }

  const handlePassword = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, pass: value })
    if (value === "") {
      setError({ ...error, pass: "Password should not be empty" })
      return false;
    }
    else if (value.length < 8) {
      setError({ ...error, pass: "Password should contain atleast 8 characters" })
      return false;
    }
    else {
      setError({ ...error, pass: "" })
      return true;
    }
  }

  const handleCPassword = (e) => {
    const { value } = e.target;
    setInputval({ ...inpval, cpass: value })
    if (value !== inpval.pass) {
      setError({ ...error, cpass: "Passwords does not match." })
      return false;
    }
    else {
      setError({ ...error, cpass: "" })
      return true;
    }
  }

  const handleTnc = (e) => {
    const { checked } = e.target;

    setInputval({ ...inpval, tnc: checked })
    if (!checked) {
      setError({ ...error, tnc: "Please check Terms and conditions." })
      return false;
    }
    else {
      setError({ ...error, tnc: "" })
      return true;
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    let valid = true;

    const { fname, lname, gender, country, address, email, pass, cpass, tnc } = inpval;


    const submitError = {};


    if (fname === "") {
      valid = false;
      submitError.fname = "First name should not be empty";

    }
    else if (!fname.match(nameformat)) {
      valid = false;
      submitError.fname = "First name should only contains alphabets"
    }


    if (lname === "") {
      valid = false;
      submitError.lname = "Last name should not be empty";

    }
    else if (!lname.match(nameformat)) {
      valid = false;
      submitError.lname = "Last name should only contains alphabets"
    }

    if (gender === "") {
      valid = false;
      submitError.gender = "Please enter gender"
    }

    if (country === "") {
      valid = false;
      submitError.country = "Please enter your Country"
    }
    else if (!country.match(nameformat)) {
      valid = false;
      submitError.country = "Country should only contains alphabets"
    }

    if (address === "") {
      valid = false;
      submitError.address = "Please Enter your address"
    }

    if (email === "") {
      valid = false;
      submitError.email = "Email should not be empty"
    }
    else if (!email.match(mailformat)) {
      valid = false;
      submitError.email = "Enter a valid email id";
    }

    if (pass === "") {
      valid = false;
      submitError.pass = "Password should not be empty";
    }
    else if (pass.length < 8) {
      valid = false;
    }

    if (cpass === "") {
      valid = false;
      submitError.cpass = "Confirm Password should not be empty";
    }
    else if (pass !== cpass) {
      submitError.cpass = "Password does not match";
      valid = false;
    }

    if (!tnc) {
      submitError.tnc = "Please check terms and condition.";
      valid = false;
    }

    setError(submitError);


    if (valid) {
      // localStorage.setItem("userRegisteration", JSON.stringify({ fname, lname, email, pass, cpass, tnc }));
      apiCall(fname, lname, gender, country, address, email, pass);
    }
  }

  const apiCall = async (fname, lname, gender, country, address, email, password) => {
    try {
      const body = JSON.stringify({
        "firstname": fname,
        "lastname": lname,
        "gender": gender,
        "country": country,
        "address": address,
        "email": email,
        "password": password
      })
      const headers = {
        "Content-Type": "application/json"
      }
      // eslint-disable-next-line
      const url = await fetch(BASE_URL + ApiList.register, {
        method: "POST",
        body: body,
        headers: headers
      })
      navigate('/login');
      const response = await url.json()
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className='d-flex justify-content-center' >
        <form action="" style={{ width: "450px" }} className='shadow-lg p-4 mb-5 bg-white rounded-3  m-3 '>
          <h2 className="text-center my-3">Register</h2>
          <div className="d-flex justify-content-between">
            <div className="mb-3 mx-1">
              <label htmlFor="fname" className="form-label">First Name</label>
              <input type="text" className="form-control" onBlur={(e) => handlefName(e)} onChange={(e) => handlefName(e)} id="fname" />
              <div className="validation-alert" id="fnameAlert">{error.fname}</div>
            </div>

            <div className="mb-3 mx-1">
              <label htmlFor="lname" className="form-label">Last Name</label>
              <input type="text" className="form-control" onBlur={(e) => handlelName(e)} onChange={(e) => handlelName(e)} id="lname" />
              <div className="validation-alert" id="lnameAlert">{error.lname}</div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="mb-3 mx-1 ">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text" className="form-control" onBlur={(e) => handleCountry(e)} onChange={(e) => handleCountry(e)} id="country" />
              <div className="validation-alert" id="CountryAlert">{error.country}</div>
            </div>

            <div className="d-flex  align-items-center col-6 p-3">
              <input type="radio" checked name="gender" value="male" onBlur={(e) => handleGender(e)} onChange={(e) => handleGender(e)} id="male" />
              <label htmlFor="male" className='mx-2'>Male</label>
              <input type="radio" name="gender" value="female" onBlur={(e) => handleGender(e)} onChange={(e) => handleGender(e)} id="female" />
              <label htmlFor="female" className='mx-2'>Female</label><br />
              <div className="validation-alert" id="GenderAlert">{error.gender}</div>
            </div>
          </div>

          <div className="mb-3 mx-1">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea className="form-control" onBlur={(e) => handleAddress(e)} onChange={(e) => handleAddress(e)} id="address" style={{ maxHeight: "60px", minHeight: "60px" }} />
            <div className="validation-alert" id="lnameAlert">{error.address}</div>
          </div>

          <div className="mb-3 mx-1">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" onBlur={(e) => handleEmail(e)} onChange={(e) => handleEmail(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div className="validation-alert" id="emailAlert">{error.email}</div>
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3 mx-1">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" onBlur={(e) => handlePassword(e)} onChange={(e) => handlePassword(e)} id="exampleInputPassword1" />
            <div className="validation-alert" id="passAlert">{error.pass}</div>
          </div>
          <div className="mb-3 mx-1">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onBlur={(e) => handleCPassword(e)} onChange={(e) => handleCPassword(e)} id="exampleInputPassword2" />
            <div className="validation-alert" id="cpassAlert">{error.cpass}</div>
          </div>
          <div className="mb-3 mx-1 form-check">
            <input type="checkbox" className="form-check-input" onBlur={(e) => handleTnc(e)} onChange={(e) => handleTnc(e)} id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Aagree Terms & Conditions<sup>*</sup></label>
            <div className="validation-alert" id="tncAlert">{error.tnc}</div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50 m-2" onClick={(e) => handleSubmit(e)} >Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register