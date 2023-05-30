import React, { useEffect, useState } from 'react'
import './css/Dashboard.css'
import { ApiList, BASE_URL } from '../util/Api/ApiList';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPlane, faTicket } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Spinner from '../spinner';



function Dashboard() {


  const [data, setdata] = useState([])

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [name, setName] = useState("")
  const [status, setstatus] = useState("")
  const [period, setPeriod] = useState("")
  const [date, setDate] = useState("")

  const [loading, setLoading] = useState(false)

  // navigate to login || apicall
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    else {
      apiCall();
    }
  }, [])

  // Actual api 
  const apiCall = async () => {
    try {
      // console.log(token);
      const api = await fetch(BASE_URL + ApiList.getStatus, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      const response = await api.json()
      setLoading(true)
      if (!response.success) {
        navigate('/login')
        // localStorage.removeItem("token")
        console.log(response.data.data);
      } else {
        setdata(response.data.data)
      }
      if (response.success) {
        setLoading(false)
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }



  // Getting data from the input
  const handleImage = (e) => {

    setImagePath(e.target.value);
    setImage(e.target.files[0]);
  }
  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleStatus = (e) => {
    setstatus(e.target.value)
  }
  const handlePeriod = (e) => {
    setPeriod(e.target.value)
  }
  const handleDate = (e) => {
    setDate(e.target.value)
  }

  // Hndling the submit event 
  const handleSubmit = (e) => {

    e.preventDefault(e)
    let valid = true;
    // console.log(name, period, status, date);
    if (image === "")
      valid = false;
    if (name === "")
      valid = false;
    if (status === "")
      valid = false;
    if (period === "")
      valid = false;
    if (date === "")
      valid = false;

    if (valid) {
      AddTodoApiCall(image, imagePath, name, status, date, period);
      handleClose();
    }
    else {
      alert("Enter detials properly");
    }

  }


  // new Data api
  const AddTodoApiCall = async (image, imagePath, name, status, date, period) => {
    setLoading(true)
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`);
    // console.log(image)
    // var formdata = new FormData();
    // formdata.append("document", image, imagePath);
    // formdata.append("text", name);
    // formdata.append("todostatus", status);
    // formdata.append("date", date);
    // formdata.append("period", period);
    // formdata.append("status", status);

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch(BASE_URL + ApiList.save, requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    // console.log("in handle".location.state.status);
    const formData = new FormData();
    formData.append("userImage", image, imagePath);
    formData.append("text", name);
    formData.append("todostatus", status);
    formData.append("date", date);
    formData.append("period", period);
    formData.append("status", status);

    // console.log("form data in client", image.name);
    // console.log("Image Name", image.name);
    // try {
    //     const res = await axios.post(BASE_URL+apiList.save, {
    //         text: todoname,
    //         todostatus: todostatus,
    //         date: date,
    //         period: period,
    //         status: todostatus,
    //         // image: formData
    //     },
    try {
      const res = await axios.post(BASE_URL + ApiList.save, formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("addtodoclg", res.data.status);
      if (res.data.status == 200) {
        navigate("/");
        setLoading(false)
        alert('ToDo Added Successfully');

      }
    }
    catch (err) {
      if (err.response.status == 400) {
        alert(err.response.data.message);
      }
      else if (err.response.status == 401) {
        alert(err.response.data);
        navigate('/login')
      }
      console.log("Add todo Error", err);
    }


  }

  return (
    <>



      <h1 className='text-center m-5'>ToDo List</h1>

      {loading && <Spinner />}

      {/* Button */}
      <div className="d-flex justify-content-center">
        <button className="addNewTodo" onClick={handleShow}>
          Add New Todo +
        </button>
      </div>
      {/* card */}
      <div className="d-inline-flex">
        {data.map((item, i) => {
          return (
            <div key={i}>
              <button className='insert-btn mb-3 mx-2 '>{item.status}</button>
              {/* drag & drop */}


              <div className="data">
                {item.data.map((todo, i) => {
                  return (<div key={i} className='mx-2 todo-item position-relative user-select-none '>
                    {/* {console.log(item.data)} */}

                    <div className='header d-flex justify-content-between'>
                      {item.status === "Completed" ? <FontAwesomeIcon icon={faCircleCheck} /> :
                        <>
                          <span className="complete-by">
                            {todo.period}
                          </span>
                        </>
                      }
                      <span className="date">
                        {moment(Date()).utc().format('YYYY-MM-DD') === moment(todo.date).utc().format('YYYY-MM-DD') ? "Today" : `Due : ${moment(todo.date).utc().format('YYYY-MM-DD')}`}
                      </span>
                    </div>
                    <div className="  d-flex justify-content-between position-absolute bottom-0">
                      <span className='my-auto'>
                        <p className='data  text-center' >{todo.text}</p>
                      </span>
                      <span>
                        <img className='card-ico  ' src={BASE_URL + todo.image} />
                      </span>
                    </div>
                  </div>)
                })}
              </div>

            </div>
          )
        })}
      </div >


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mb-3 mx-3">
              <label htmlFor="image">Enter image</label>
              <input type="file" className="form-control" accept='image/*' id="image" required onChange={(e) => handleImage(e)} />
            </div>

            <div className="form-group mb-3 mx-3">
              <label htmlFor="todo">Enter Todo Title</label>
              <input type="text" className="form-control" id="todo" placeholder="Todo" required onBlur={(e) => handleName(e)} />
            </div>
            <div className="form-group mb-3 mx-3">
              <label htmlFor="status">Status</label>
              <select className="form-control" id="status" required onBlur={(e) => handleStatus(e)}>
                <option value="">please select status</option>
                {
                  data.map(
                    (item, i) => {
                      return (
                        <option key={i} value={item.status}>{item.status}</option>
                      )
                    })}

              </select>
            </div>
            <div className="form-group mb-3 mx-3">
              <label htmlFor="period">Period</label>
              <select className="form-control" id="period" required onBlur={(e) => handlePeriod(e)} >
                <option value="">please select period</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Night</option>
              </select>
            </div>
            <div className="form-group mb-3 mx-3">
              <label htmlFor="date">Example textarea</label>
              <input type='date' required onBlur={(e) => handleDate(e)} className="form-control" min={moment(new Date()).format('YYYY-MM-DD')} id="date"></input>
            </div>

            <div className='d-flex justify-content-end'>
              <Button className='mx-2' variant="secondary" onClick={() => handleClose()}>
                Close
              </Button>
              <button className='btn btn-primary mx-3' type='submit' variant="primary" onClick={(e) => handleSubmit(e)}>
                Save Changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default Dashboard