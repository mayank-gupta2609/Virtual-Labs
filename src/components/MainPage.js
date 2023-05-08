import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { setExpID } from '../redux/features/userSlice'
import Draggable from 'react-draggable';
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components'
import Typewriter from 'typewriter-effect';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Cube from 'react-3d-cube';

function MainPage() {

    const [user] = useAuthState(auth);
    const dispatch = useDispatch()
    const [pColor, setPcolor] = useState("white")

    const { experimentId, section } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [experiments, setExperiments] = useState()
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [color, setColor] = useState("red")
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)

    const getExperiments = async () => {
        setLoading(true)
        setProgress(0)
        setColor("red")

        let response = await fetch("http://localhost:5000/api/experiments/getAllExperiments");
        setProgress(50)
        setColor("red")

        let data = await response.json();
        console.log(data);
        setColor("red")
        setProgress(70)

        setExperiments(data)
        setLoading(false)
        setProgress(100)
        setColor("red")
    }

    const colors = ['orange', 'yellow', 'pink', 'aqua', 'black']
    let i = 0

    setInterval(() => {
        setPcolor(colors[i])
        i = (i + 1) % 5
    }, 10000)

    useEffect(() => {
        getExperiments()
    }, [])

    return (
        <>
            <LoadingBar
                color={color}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div style={{

            }}>

                <div style={{
                    paddingTop: '52px',
                    color: 'white',
                    width: '100vw',
                    overflow: 'hidden',
                    // position: 'fixed'
                }}>


                    {/* <div style={{
                    top: '65px',
                    height: '500px',

                }} >
                    <Details style={{
                        padding: '10px',
                        borderRadius: '10px',
                    }}>

                        <div className=" d-flex mb-1 mt-1 " style={{ width: "23rem", borderRadius: '10px', backdropFilter: 'blur(50px)', position: 'relative', height: '180px', zIndex: '10' }} onMouseEnter={() => {
                            // setTimeout(()=>{

                            setVisible1(true)
                            // }, 1000)
                            // console.log(visible2)
                        }}

                            onMouseLeave={() => {
                                setVisible1(false)

                            }}>

                            <div className="  " style={{
                                visibility: (visible1 === true) ? 'visible' : 'hidden'
                            }}>
                                <h5 >Physical Chemistry</h5>
                                <p >Physical chemistry, branch of chemistry concerned with interactions and transformations of materials. Unlike other branches, it deals with the principles of physics underlying all chemical interactions (e.g., gas laws), seeking to measure, correlate, and explain the quantitative aspects of reactions. </p>

                            </div>

                            <div style={{
                                fontSize: '50px',
                                visibility: !(visible1 === true) ? 'visible' : 'hidden',
                                position: 'absolute',
                                // transition:'0.5s ease-in-out'
                            }}>

                                <i className="fa-solid fa-flask-vial" style={{
                                    color: "white",
                                    tranistion: '0.5s ease-in-out'
                                }}></i>
                                <p style={{ fontSize: '30px' }}>
                                    Physical Chemistry
                                </p>
                            </div>

                        </div>
                    </Details>

                    <Details style={{
                        padding: '10px',
                        borderRadius: '10px',
                    }}>

                        <div className=" d-flex mb-1 mt-1 " style={{ width: "23rem", borderRadius: '10px', backdropFilter: 'blur(50px)', position: 'relative', height: '180px', zIndex: '10' }} onMouseEnter={() => {
                            // setTimeout(()=>{

                            setVisible2(true)
                            // }, 1000)
                            // console.log(visible2)
                        }}

                            onMouseLeave={() => {
                                setVisible2(false)

                            }}>

                            <div className="  " style={{
                                visibility: (visible2 === true) ? 'visible' : 'hidden'
                            }}>
                                <h5 >Organic Chemistry</h5>
                                <p >Organic chemistry is the study of the structure, properties, composition, reactions, and preparation of carbon-containing compounds. Most organic compounds contain carbon and hydrogen, but they may also include any number of other elements </p>

                            </div>

                            <div style={{
                                fontSize: '50px',
                                visibility: !(visible2 === true) ? 'visible' : 'hidden',
                                position: 'absolute',
                                // transition:'0.5s ease-in-out'
                            }}>

                                <i className="ms-2 fa-sharp fa-solid fa-atom fa-spin" style={{
                                    color: "white",
                                    tranistion: '0.5s ease-in-out'
                                }}></i>
                                <p style={{ fontSize: '30px' }}>
                                    Organic Chemistry
                                </p>
                            </div>

                        </div>
                    </Details>

                    <Details style={{
                        padding: '10px',
                        borderRadius: '10px',
                    }}>

                        <div className=" d-flex mb-1 mt-1 " style={{ width: "23rem", borderRadius: '10px', backdropFilter: 'blur(50px)', position: 'relative', height: '220px', zIndex: '10' }} onMouseEnter={() => {
                            // setTimeout(()=>{

                            setVisible3(true)
                            // }, 1000)
                            // console.log(visible2)
                        }}

                            onMouseLeave={() => {
                                setVisible3(false)

                            }}>

                            <div className="  " style={{
                                visibility: (visible3 === true) ? 'visible' : 'hidden'
                            }}>
                                <h5 >InOrganic Chemistry</h5>
                                <p >Inorganic chemistry is the study of the behaviour of compounds along with their properties, their physical and chemical characteristics. The elements of the periodic table except for carbon and hydrogen are in the lists of inorganic compounds. Many of the elements very important like titanium , copper etc.</p>

                            </div>

                            <div style={{
                                fontSize: '50px',
                                visibility: !(visible3 === true) ? 'visible' : 'hidden',
                                position: 'absolute'
                                // transition:'0.5s ease-in-out'
                            }}>

                                <i className="ms-2 fa-solid fa-vial-circle-check " style={{
                                    color: "white",
                                    tranistion: '0.5s ease-in-out'
                                }}></i>
                                <p style={{ fontSize: '30px' }}>
                                    InOrganic Chemistry
                                </p>
                            </div>

                        </div>
                    </Details>



                </div> */}

                    <div style={{
                        paddingTop: '30px',
                        color: 'black',
                        backgroundColor: '#75AEDE',
                        paddingBottom: '60px',

                    }} className="row">
                        <div className="col-lg-7" style={{
                            display: 'flex',
                            justifyContent: 'left',
                            paddingLeft: '90px'
                        }}>
                            {/* Hello {user?.displayName} */}

                            <div>
                                <p style={{
                                    fontSize: '90px',
                                    fontFamily: 'Times New Roman '
                                }} className="mb-0">Hi there</p>
                                <div className="pt-0">
                                    <p style={{
                                        fontSize: '48px', fontFamily: 'Times New Roman '
                                    }} >Here you will find simulations related to</p>

                                </div>
                                <div style={{
                                    fontSize: '80px'
                                }}>
                                    <Typewriter
                                        options={{
                                            strings: ['Physical Chemistry', 'Organic Chemistry', 'InOrganic Chemistry'],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-5" style={{
                            display: 'flex',
                            paddingTop: '80px',
                            justifyContent: 'center'
                        }}>
                            <div>

                                <Cube size={200} index="front">
                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/002/554/357/non_2x/science-molecule-atom-chemistry-line-style-icon-free-vector.jpg" alt="" />
                                    </div>
                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/002/554/357/non_2x/science-molecule-atom-chemistry-line-style-icon-free-vector.jpg" alt="" />
                                    </div>
                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/002/554/357/non_2x/science-molecule-atom-chemistry-line-style-icon-free-vector.jpg" alt="" />
                                    </div>
                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}>
                                        <img src="https://ih1.redbubble.net/image.3044257767.8721/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="" />

                                    </div>
                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}>
                                        <img src="https://ih1.redbubble.net/image.3044257767.8721/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="" />
                                    </div>
                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}>
                                        <img src="https://ih1.redbubble.net/image.3044257767.8721/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="" />

                                    </div>

                                </Cube>
                            </div>
                        </div>
                    </div>

                    <div style={{ 
                        overflowX: 'hidden',
                        height: 'fit-content', 
                        visibility: loading ? 'hidden' : 'visible',
                        backgroundImage: "url(https://i.pinimg.com/originals/cb/7e/f2/cb7ef26e157572c44cc84f88e92e5149.gif)",
                        paddingBottom:'40px',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'150%'
                    }}>


                        <h1 style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            textDecoration: 'underline',

                        }} className="mt-5">List Of Available Practicals</h1>

                        {loading && <h1 style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>

                            <div className="spinner-grow text-success " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </h1>}

                        <div style={{ color: 'whitesmoke' }} className="row d-flex align-items-center justify-content-center mt-4">
                            {!loading && experiments.map(experiment => {
                                return <Holder className=' mt-2 ' style={{
                                    width: '914px', borderRadius: '15px', padding: '20px', paddingTop: '0px',
                                    color: 'black',
                                    backdropFilter: 'blur(200px)'

                                }} key={experiment._id} onClick={() => {
                                    navigate(`/experiments/${experiment.redirectURL}`)
                                }} >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        position: 'absolute',
                                        right: '0'
                                    }
                                    }>
                                        <div style={{
                                            // backgroundColor:'white',
                                            borderRadius: '15px',

                                            // backgroundImage: 'conic-gradient( pink 90deg, aqua 210deg)'
                                        }} >

                                            <span className="badge rounded-pill mb-1 ms-1 me-1 block" style={{
                                                color: 'black',
                                            }}> {experiment.section} </span>
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '25px',
                                        display: 'flex',
                                        padding: '10px'

                                    }}>
                                        <div style={{
                                            textDecoration: 'underline'
                                        }}>

                                            {experiment.title}
                                        </div>

                                    </div>
                                    <div style={{
                                        fontSize: '20px'
                                    }}>
                                        {experiment.description}

                                    </div>
                                </Holder>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage

const Holder = styled.div`
    :hover{
        transform:scale(1.01);
        box-shadow: inset 0px 0px 60px rgba(96, 236, 255, 0.8) ;
        cursor: pointer;
    }

    transition:0.15s ease-in-out;
`;

const Details = styled.div`
    :hover{
        transform:scale(1.01);
        box-shadow: inset 0px 0px 60px #FFA3FD ;
       
    }

    transition:0.15s ease-in-out;
`;


