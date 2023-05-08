import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { setSection } from '../redux/features/userSlice';
import { signOut } from "firebase/auth";
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const [color, setColor] = useState("red")
    const [cityName, setCityName] = useState("");
    const [temperature, setTemp] = useState("");
    const { section } = useSelector((state) => state.user)
    const navigate = useNavigate()
    

     

    return (
        <div >
            <nav className="navbar fixed-top navbar-expand-lg" style={{
                fontSize: '21px',
                // backgroundColor: '#75AEDE',
                backdropFilter:'blur(1000px)'

            }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={() => {
                        dispatch(setSection(""))
                    }} >Virtual Labs</Link>
                    <button className="navbar-toggler btn-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{
                        border: '0'
                    }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Option className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/@PhysicalChemistry" onClick={() => {
                                    dispatch(setSection("Physical Chemistry"))
                                }} style={{
                                    borderBottom: section === "Physical Chemistry" ? '2px solid red' : '',
                                    color: section === "Physical Chemistry" ? 'black' : '',
                                }}
                                >Physical Chemistry</Link>
                            </Option>
                            <Option className="nav-item">
                                <Link className="nav-link" to="/@OrganicChemistry" onClick={() => {
                                    dispatch(setSection("Organic Chemistry"))
                                }} style={{
                                    borderBottom: section === "Organic Chemistry" ? '2px solid red' : '',
                                    color: section === "Organic Chemistry" ? 'black' : '',
                                }}>Organic Chemistry</Link>
                            </Option>
                            <Option className="nav-item" >
                                <Link className="nav-link" to="/@InOrganicChemistry" onClick={() => {
                                    dispatch(setSection("InOrganic Chemistry"))
                                }} style={{
                                    borderBottom: section === "InOrganic Chemistry" ? '2px solid red' : '',
                                    color: section === "InOrganic Chemistry" ? 'black' : '',
                                }}>InOrganic Chemistry</Link>
                            </Option>
                            {/* <Option className="nav-item" >
                                <Link className="nav-link" to="/@InOrganicChemistry" onClick={() => {
                                    dispatch(setSection("InOrganic Chemistry"))
                                }} style={{
                                    borderBottom: section === "Feedback" ? '2px solid red' : '',
                                    color: section === "Feedback" ? 'black' : '',
                                }}>Feedback</Link>
                            </Option> */}
                        </ul>
                    </div>

                </div>

                <div className="container-fluid justify-content-end" >
                    <div className=" d-flex" style={{ color: 'black' }}>

                        <div>
                                
                            <img src={user?.photoURL} alt="" style={{
                                height: '50px',
                                borderRadius: '50%',
                                border: `2px solid ${color}`,
                                transition:'0.25s ease-in-out',
                                backdropFilter:'blur(40px)'
                            }}
                                className="ms-3 me-2 block"
                                onClick={() => {
                                navigate("/notes")
                            }}
                            />
                            {user?.displayName}
                        </div>
                    </div>

                </div>

                <div onClick={() => signOut(auth)} style={{
                    color: 'black',
                    marginRight: '20px',
                }}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </nav>
        </div>




    )
}


export default Navbar;

const Option = styled.div`
    border-radius:10px; 
    :hover{ 
        box-shadow: inset 0px 0px 60px aqua;
        color:white;
    }
    transition:0.15s ease-in-out;
`;
