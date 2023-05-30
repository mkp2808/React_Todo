import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import './css/Navbar.css';

function NavBar() {
    // const [login, setLogin] = useState()
    const navigate = useNavigate()

    //     useEffect(() => {
    //         check();
    //         console.log("adlksj");
    //     },[])

    // const check = () => {
    const token = localStorage.getItem('token')
    //     if (token) {
    //         setLogin(true)
    //     }
    //     else {
    //         setLogin(false)
    //     }
    // }

    const removeToken = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }

    const navRegister = () => {
        navigate('/register')
    }
    const navLogin = () => {
        navigate('/login')
    }

    return (
        <>

            <Navbar className="px-4  shadow-lg" bg="dark" variant='dark' expand="lg">
                <Navbar.Brand href="/">ToDo List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {token ?
                        <>
                            <Nav className="me-auto">
                                <a className='nav-link' href="/">Home</a>
                            </Nav>
                            <Button variant="primary" onClick={removeToken}>Logout</Button>
                        </>
                        :
                        <>
                            <Nav className="me-auto">
                            </Nav>
                            <Button className='mx-2' variant="primary" onClick={navRegister} style={{ display: ("/register" === window.location.pathname) ? "none" : "block" }}>Register</Button>
                            <Button className='mx-2' variant="primary" onClick={navLogin} style={{ display: ("/login" === window.location.pathname) ? "none" : "block" }}>Login</Button>
                        </>
                    }



                    {token ?
                        <>
                        </> :
                        ""
                    }
                </Navbar.Collapse>
            </Navbar >
        </>
    )
}

export default NavBar