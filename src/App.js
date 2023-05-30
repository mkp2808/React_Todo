import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";


function App() {
  return (
    <>

        <BrowserRouter>
          <NavBar />
          <Container fluid>
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/" element={<Dashboard />} />
            </Routes>
          </Container>
        </BrowserRouter>
    </>
  );
}

export default App;
