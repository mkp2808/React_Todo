import React, { useEffect, useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { ApiList, BASE_URL } from '../util/Api/ApiList';

function Login() {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            navigate("/");
        }
        else{
            navigate('/login')
        }
    },[])

    
    const [inpval, setInputval] = useState({
        email: "",
        pass: ""
    });
    var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const [error, setError] = useState({})

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

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true;

        const { email, pass } = inpval;

        const submitError = {};

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

        setError(submitError);

        if (valid) {
            // console.log(valid);
            apiCall(email, pass)
            // Local storage
            // const getuserArr = localStorage.getItem("userRegisteration");
            // if (getuserArr && getuserArr.length) {
            //     const userdata = [JSON.parse(getuserArr)];
            //     const userlogin = userdata.filter((el, k) => {
            //         return el.email === email && el.pass === pass
            //     });

            //     if (userlogin.length === 0) {
            //         alert("invalid details");
            //     }
            //     else {
            //         console.log("Login Successful...!");
            //         localStorage.setItem("user_login", JSON.stringify(userlogin))
            //         navigate('/');
            //     }
            // }
        }

    }

    const apiCall = async (email, password) => {
        try {
            const body = JSON.stringify({
                "email": email,
                "password": password
            })
            const headers = {
                "Content-Type": "application/json"
            }
            const url = await fetch(BASE_URL + ApiList.login, {
                method: "POST",
                body: body,
                headers: headers
            })
            const response = await url.json()
            console.log(response.data.$set.token);
            localStorage.setItem("token", response.data.$set.token)
            navigate('/');
        } catch (error) {
            alert("Email or Password is invalid");  
            navigate('/login');
            console.log(error);
        }
    }

    return (
        <>

            <div className='d-flex justify-content-center' >
                <form style={{ width: "450px" }} action='' className='shadow-lg p-4 mb-5 bg-white rounded-3 my-5 mx-3 '>
                    <h2 className="text-center my-3">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" onBlur={(e) => handleEmail(e)} onChange={(e) => handleEmail(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div className="validation-alert" id="emailAlert">{error.email}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onBlur={(e) => handlePassword(e)} onChange={(e) => handlePassword(e)} id="exampleInputPassword1" />
                        <div className="validation-alert" id="passAlert">{error.pass}</div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary w-50 m-2" onClick={(e) => handleSubmit(e)} >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login