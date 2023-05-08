import React, { useEffect } from 'react'
import { auth, db } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import {
    collection,
    doc,
    orderBy,
    query,
    setDoc,
    Timestamp,
    addDoc,
    where, deleteDoc, updateDoc
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
// import { deleteDoc } from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';

const Notes = () => {
    const [user] = useAuthState(auth)
    // console.log(user)
    const [userSnapshot, loading] = useCollection(
        query(
            collection(db, "users")
        )
    );
    // console.log(notesSnapshot)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [request, setRequest] = useState(false)
    const [request1, setRequest1] = useState(false)

    const data = []
    const [updTitle, setUpdTitle] = useState("")
    const [updDescription, setUpdDescription] = useState("")

    const [notesSnapshot] = useCollection(query(collection(db, `users/${user.uid.toString()}/notes`), where("user", "==", user?.uid)))


    useEffect(() => {
        if (userSnapshot) showNotes()
    }, [])
    const [updId, setUpdId] = useState("")

    const addNote = (e) => {
        e.preventDefault();
        const docRef = doc(db, `users/${(user.uid).toString()}`);
        // console.log(desc)
        // console.log(title)
        setDoc(
            docRef, { title: title, desc: desc }, { merge: false }
        );

        const colRef = collection(db, `users/${(user.uid).toString()}/notes`);

        addDoc(colRef, {
            title: title,
            desc: desc,
            user: user.uid,
            creationTime: new Date().toLocaleString()
        });

        setDesc("")
        setTitle("")
        setRequest(false)
    }

    const handleUpdate = async () => {
        const docRef = doc(db, `users/${user?.uid}/notes`, `${updId}`);
        await updateDoc(docRef, {
            title: updTitle,
            desc: updDescription
        });

        setRequest1(false)
    }

    const updateNote = async (e, note) => {
        e.preventDefault();
        setUpdId(note.id)
        // console.log(desc)
        // console.log(title)
        // console.log(note.data().title)
        setUpdTitle(note.data().title)
        setUpdDescription(note.data().desc)
        console.log(updTitle + " " + updDescription)

        // const colRef = collection(db, `users/${(user.uid).toString()}/notes`);

    }

    const showNotes = () => {
        notesSnapshot?.docs.map((message) => (
            data.push({ message })
            // console.log(message.data().title)
            // data.push(message)
        ))
    }

    if (!loading) showNotes()
    return (
        <div style={{
            marginTop: '50px',
            height: 'fit-content',
            width: '100%',
            backgroundImage: "url(https://i.pinimg.com/originals/cb/7e/f2/cb7ef26e157572c44cc84f88e92e5149.gif)",
            height: '100vh'
        }} className="p-5">
            <div className="row" style={{
                borderRadius: '10px',
            }}>
                <div className="col-lg-6 col-md-6 col-sm-12" style={{
                    // border: '1px solid red'
                }}>
                    <h3 className="text-center mt-2 mb-4" style={{
                        borderBottom: '1px solid grey'

                    }}>
                        NOTES
                    </h3>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">

                    <div style={{
                        // border: '1px solid red',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        height: 'fit-content',
                        width: 'fit-content',
                        borderRadius: '20px'
                    }} className="  mt-2">
                        <i className="fa-solid fa-square-plus" onClick={() => setRequest(true)}></i>
                        {/* <i className="fa-solid fa-pen-to-square ms-3 me-3"></i> */}
                        {/* <i className="fa-solid fa-trash ms-3 me-3"></i> */}
                    </div>
                </div>
            </div>

            <div className="row mt-4 d-flex justify-content-center">
                {loading && <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>}
                {!loading && notesSnapshot.docs.map((note) => {
                    return <div style={{ color: 'black', backdropFilter: 'blur(50px)', borderRadius: '10px', border: '1px solid white', padding: '15px' }} className="ms-5  me-2 col-lg-3 col-md-4 col-sm-6 mt-4 mb-3">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0',
                            top: '0'
                        }
                        }>

                            <span className="badge bg-danger" style={{
                                borderRadius: '20%'
                            }} onClick={(e) => {
                                // const docRef = doc(db, "users/${user.id}/notes", `${note.id}`);
                                deleteDoc(doc(db, `users/${user?.uid}/notes`, `${note.id}`))
                                console.log("clicked")
                            }}>
                                <i className="fa-solid fa-trash"></i>
                            </span>
                            <span className="badge bg-warning ms-1" style={{
                                borderRadius: '20%'
                            }} onClick={(e) => {
                                setRequest1(true)
                                updateNote(e, note)
                            }}>
                                <i className="fa-solid fa-pen-to-square "></i>
                            </span>
                        </div>
                        <h3 style={{ borderBottom: '1px solid whitesmoke' }}>{note.data().title}</h3>
                        <p style={{
                            fontSize: '20px'
                        }}>{note.data().desc}</p>
                    </div>
                })
                }

            </div>

            <Draggable>
                <div style={{
                    backdropFilter: 'blur(100px)',
                    width: '454px',
                    padding: '20px',
                    borderRadius: '20px',
                    border: '1px solid white',
                    visibility: request ? 'visible' : 'hidden',
                    top: '30%',
                    left: '30%',
                    position: 'fixed',
                    transition: '0.25s ease-in-out visibility'
                }} >
                    {/* <div style={{}}> */}
                    <div className="d-flex align-items-center justify-content-between">

                        <h3 style={{
                            borderBottom: '1px solid grey'
                        }} className='text-center'>ADD A NOTE</h3>
                        <CloseIcon fontSize="small" onClick={(e) => setRequest(false)} role="button" />
                    </div>
                    {/* </div> */}
                    <div >
                        <div>
                            <h3>
                                EXPERIMENT TITLE

                            </h3>
                        </div>
                        <Input type="text" onChange={(e) => {
                            setTitle(e.target.value)
                            console.log(e.target.value)
                        }} />
                    </div>
                    <div >
                        <div>
                            <h3>
                                NOTE

                            </h3>
                        </div>

                        <textarea name="" id="" cols="52" rows="10" style={{
                            border: 'none',
                            outline: 'none',
                            borderRadius: '10px',
                            padding: '5px'
                        }} onChange={(e) => {
                            setDesc(e.target.value)
                            console.log(e.target.value)
                        }}></textarea>
                    </div>

                    <button className="btn " style={{
                        backgroundColor: 'aquamarine'
                    }} onClick={addNote}>ADD NOTE</button>
                </div>
            </Draggable>


            <Draggable>

                <div style={{
                    backdropFilter: 'blur(100px)',
                    width: '454px',
                    padding: '20px',
                    borderRadius: '20px',
                    border: '1px solid white',
                    visibility: request1 ? 'visible' : 'hidden',
                    top: '30%',
                    left: '30%',
                    position: 'fixed'
                }} className='block' >
                    <div >
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 style={{
                                borderBottom: '1px solid grey'
                            }} className='text-center'>UPDATE NOTE</h3>
                            <CloseIcon fontSize="small" onClick={(e) => setRequest1(false)} role="button" />
                        </div>
                        <div  >
                            <h3>
                                EXPERIMENT TITLE
                            </h3>
                        </div>
                        <Input type="text" onChange={(e) => {
                            setUpdTitle(e.target.value)
                            console.log(e.target.value)
                        }} value={updTitle} />
                    </div>
                    <div >
                        <div>
                            <h3>
                                NOTE

                            </h3>
                        </div>

                        <textarea name="" id="" cols="52" rows="10" style={{
                            border: 'none',
                            outline: 'none',
                            borderRadius: '10px',
                            padding: '5px'
                        }} onChange={(e) => {
                            setUpdDescription(e.target.value)
                            console.log(e.target.value)
                        }} value={updDescription}></textarea>
                    </div>

                    <button className="btn " style={{
                        backgroundColor: 'aquamarine'
                    }} onClick={handleUpdate}>UPDATE NOTE</button>
                </div>
            </Draggable>

        </div>
    )
}

export default Notes


const Input = styled.input` 
  outline: 0;
  border: none;
  border-radius: 10px; 
  padding: 10px; 
  margin-right: 15px;
  maring-top:5px;
  width:406px
`;