import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { setExpID } from '../redux/features/userSlice';
import { Fade } from "react-awesome-reveal"
import styled from 'styled-components'

function ContentPage() {
  const dispatch = useDispatch();
  const { experimentId, section } = useSelector((state) => state.user)
  const navigate = useNavigate()
  // console.log(section);
  const [experiments, setExperiments] = useState()
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState("red")

  const getExperiments = async () => {
    setProgress(0)
    setColor("yellow")
    setLoading(true)
    let response = await fetch(`http://localhost:5000/api/experiments/getSection/${section}`, {
      method: "GET"
    });
    setProgress(50)
    setColor("red")
    let data = await response.json();
    console.log(data);
    setExperiments(data)
    setColor("green")
    setProgress(70)
    setLoading(false)
    setProgress(100)
    setColor("red")
  }


  useEffect(() => {
    getExperiments()
  }, [section])

  return (
    <>
      <LoadingBar
        color={color}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div style={{
        paddingTop: '5px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: '685px',
                    marginTop:'60px',
                    backgroundImage: "url(https://i.pinimg.com/originals/cb/7e/f2/cb7ef26e157572c44cc84f88e92e5149.gif)",
                    paddingBottom:'10px'
      }}>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black'
        }}>
          {section}
        </h1>


        {loading && <h1 style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black'
        }}>

          <div className="spinner-grow text-success " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </h1>}

        {/* <Fade triggerOnce="false" direction="up"> */}
        <div style={{ color: 'black' }} className="row d-flex align-items-center justify-content-center mt-2">
          {!loading && experiments.map(experiment => {
            return <Holder className=' mt-2' style={{
              width: '914px', borderRadius: '15px', padding: '20px',
              color: 'black',
              backdropFilter: 'blur(50px)'

            }} key={experiment._id} onClick={() => {
              dispatch(setExpID(experiment._id))
              navigate(`/experiments/${experiment.title.split(" ").join("")}`)
            }} >
              <div style={{
                fontSize: '25px',
                textDecoration: 'underline',
                display: 'flex'
              }}>
                {experiment.title}


              </div>
              <div style={{
                fontSize: '20px'
              }}>
                {experiment.description}

              </div>
            </Holder>
          })}
        </div>
        {/* </Fade> */}
      </div>
    </>
  )
}

export default ContentPage


const Holder = styled.div`
    :hover{
        transform:scale(1.01);
        box-shadow: inset 0px 0px 60px rgba(96, 236, 255, 0.8) ;
        cursor: pointer;
    }

    transition:0.15s ease-in-out;
`;