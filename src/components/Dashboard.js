import React, { useEffect, useState } from 'react'
import './css/Dashboard.css'
import { ApiList, BASE_URL } from '../util/Api/ApiList';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Spinner from '../spinner';


function Dashboard() {


  const [data, setdata] = useState([])

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // Add new todo modal
  const [showAddNewTodo, setShowAddNewTodo] = useState(false);
  const handleCloseAddNewTodo = () => setShowAddNewTodo(false);
  const handleShowAddNewTodo = () => setShowAddNewTodo(true);

  // show options modal
  const [showCardOptions, setShowCardOptions] = useState(false);
  const handleCloseCardOptions = () => setShowCardOptions(false);
  const handleShowCardOptions = () => setShowCardOptions(true);

  // show options modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  //Initial
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [status, setstatus] = useState("")
  const [period, setPeriod] = useState("")
  const [date, setDate] = useState("")

  // Updated 
  const [nameUpdated, setNameUpdated] = useState("")
  const [statusUpdated, setstatusUpdated] = useState("")
  const [periodUpdated, setPeriodUpdated] = useState("")
  const [dateUpdated, setDateUpdated] = useState("")

  const [updatedData, setupdatedData] = useState()

  const setTextToTextBox = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL + ApiList.settexttotextbox, requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));

      
    
    
  }










  const [loading, setLoading] = useState(false)

  const [cardCount, setCardCount] = useState(0)


  // navigate to login || apicall
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    else {
      apiCall();
    }
    // eslint-disable-next-line 
  }, [])

  // Getting data from the input
  const handleImage = (e) => {

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

  const [id, setId] = useState("")

  const handleCardClick = (id) => {
    setId(id);
    handleShowCardOptions();
  }

  try {
    var handleEdit = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = JSON.stringify({
        "text": "Katch Trip",
        "status": "Not Started",
        "date": "2023-06-02",
        "_id": id,
        "period": "Afternoon"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(BASE_URL + ApiList.update, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  } catch (error) {
    console.log(error);
  }

  try {
    var handleDelete = () => {

      // console.log(id);
      fetch(`${BASE_URL + ApiList.delete}?_id=${id}`, { "method": 'delete' })
        .then(response => response.text())
        .then(result => {
          console.log(result)
          handleCloseCardOptions()
          apiCall();
          setId("");
        })
        .catch(error => console.log('error', error));
    }
  } catch (error) {
    console.log(error);
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
      AddTodoApiCall(image, name, status, date, period);
      handleCloseAddNewTodo();
    }
    else {
      alert("Enter detials properly");
    }

  }

  // new Data api
  const AddTodoApiCall = async (image, name, status, date, period) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("document", image);
    formData.append("text", name);
    formData.append("todostatus", status);
    formData.append("date", date);
    formData.append("period", period);
    formData.append("status", status);

    try {
      const res = await axios.post(BASE_URL + ApiList.save, formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("addtodoclg", res.data.status);
      if (res.data.status === 200) {
        // navigate("/");
        await apiCall();
        setLoading(false)
        // alert('ToDo Added Successfully');

      }
    }
    catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.message);
      }
      else if (err.response.status === 401) {
        alert(err.response.data);
        navigate('/login')
      }
      console.log("Add todo Error", err);
    }


  }


  // Actual api 
  const apiCall = async () => {
    try {
      // console.log(token);
      setLoading(true)
      const api = await fetch(BASE_URL + ApiList.getStatus, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      const response = await api.json()
      setCardCount(response.data.count);
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



  return (
    <>


      {loading && <Spinner />}
      {!loading &&
        <>
          {/* Button */}
          <div className="d-flex my-5 justify-content-around">
            <h2 className=''>Remaining Tasks : {cardCount}</h2>
            <button className="addNewTodo" onClick={handleShowAddNewTodo}>
              Add Todo +
            </button>
          </div>
          {/* card */}
          <div className="d-inline-flex">
            {data.map((item, i) => {
              return (
                <div key={i}>
                  <button className='insert-btn mb-3 mx-2 '>{item.status}</button>
                  {/* drag & drop */}

                  <div className="data" >
                    {item.data.map((todo, i) => {
                      return (<div key={i} onClick={() => handleCardClick(todo._id)} className='mx-2 my-3 py-2 px-3 todo-item position-relative  user-select-none '>
                        {console.log(todo._id + todo.text)}


                        {/* <i class="fa-light fa-ellipsis-vertical"></i> */}
                        <div className='header my-3 d-flex justify-content-between'>
                          {todo.text}
                          <span className="date">
                            {moment(Date()).utc().format('YYYY-MM-DD') === moment(todo.date).utc().format('YYYY-MM-DD') ? "Today" : `Due : ${moment(todo.date).utc().format('DD-MM-YYYY')}`}
                          </span>
                        </div>
                        <div className=" d-flex my-4 justify-content-between ">

                          <span className="complete-by">
                            {item.status === "Completed" ? <FontAwesomeIcon icon={faCircleCheck} /> :
                              <>
                                {todo.period}
                              </>
                            }
                          </span>
                          <img className='card-ico ' src={BASE_URL + todo.image} alt='ico' />
                        </div>
                      </div>)
                    })}
                  </div>

                </div>
              )
            })}
          </div >

        </>}

      {/* options */}
      <Modal show={showCardOptions} onHide={handleCloseCardOptions}>
        <Modal.Header closeButton>
          <Modal.Title>Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex my-3 justify-content-around card-options  ">
            <button onClick={() => handleEdit()}><FontAwesomeIcon size='3x' className='cursor-pointer' icon={faEdit} /></button>
            <button onClick={() => handleDelete()}><FontAwesomeIcon size='3x' className='cursor-pointer' icon={faTrash} /></button>
          </div>
        </Modal.Body>
      </Modal>


      {/* add new todo */}
      <Modal show={showAddNewTodo} onHide={handleCloseAddNewTodo}>
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
              <Button className='mx-2' variant="secondary" onClick={() => handleCloseAddNewTodo()}>
                Close
              </Button>
              <button className='btn btn-primary mx-3' type='submit' variant="primary" onClick={(e) => handleSubmit(e)}>
                Save Changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>


      <Modal show={showUpdateTodo} onHide={handleCloseAddNewTodo}>
        <Modal.Header closeButton>

          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

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
              <Button className='mx-2' variant="secondary" onClick={() => handleCloseUpdateTodo()}>
                Close
              </Button>
              <button className='btn btn-primary mx-3' type='submit' variant="primary" onClick={(e) => handleUpdateSubmit(e)}>
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