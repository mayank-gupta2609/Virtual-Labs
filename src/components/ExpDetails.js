import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import EMF from './exps/EMF'
import PageNotFound from './PageNotFound'


function ExpDetails() {

  const [exp, setExp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState("red")
  const [progress, setProgress] = useState(0)
  const [request, setRequest] = useState("theory")
  const { experimentId } = useSelector((state) => state.user)

  const getExpDetails = async () => {
    setProgress(0)
    setColor("orange")
    setLoading(true)

    let response = await fetch(`http://localhost:5000/api/experiments/getExpDetails/${experimentId}`, {
      method: "GET"
    });
    setProgress(50)
    setColor("aqua")

    let data = await response.json();
    console.log(data)
    setColor("pink")
    setProgress(70)
    setExp(data)
    setProgress(100)
    setColor("red")
    setLoading(false)

  }

  useEffect(() => {
    getExpDetails()
  }, [])

  if (exp?.exp.length === 0) {
    return <PageNotFound />
  }

  return (
    <>

      <div style={{
        paddingTop: '100px',
        color: 'black'
      }}>
        <LoadingBar
          color={color}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />

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

        {!loading && <div className="row">
          <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black'
          }}>
            {exp?.exp[0].title}
          </h1>

          <div className=" d-flex align-items-center justify-content-center" >
            <div className='ms-5 mt-2 me-5' 
              style={{
                backgroundColor: request=== "theory" ? 'whitesmoke' :'white',
                borderRadius:'5px',
                padding:'4px',
                transition:'0.25s ease-in-out'
              }}
            
             onClick={() => {
              setProgress(0)
              setColor("yellow")
              setRequest("theory")
              setProgress(100)
              setColor("pink")
            }} role="button">
              <h3 >
                Theory
              </h3>
            </div>
            <div className='ms-5 mt-2 me-5' 
              style={{
                backgroundColor: request=== "procedure" ? 'whitesmoke' :'white',
                borderRadius:'5px',
                padding:'4px',
                transition:'0.25s ease-in-out'
              }}
            
             onClick={() => {
              setProgress(0)
              setColor("yellow")
              setRequest("procedure")
              setProgress(100)
              setColor("pink")
            }} role="button">
              <h3 >
                Procedure
              </h3>
            </div>
            <div className='ms-5 mt-2 me-5' 
              style={{
                backgroundColor: request=== "simulation" ? 'whitesmoke' :'white',
                borderRadius:'5px',
                padding:'4px',
                transition:'0.25s ease-in-out'
              }}
            
             onClick={() => {
              setProgress(0)
              setColor("yellow")
              setRequest("simulation")
              setProgress(100)
              setColor("pink")
            }}
            role="button"
            >

              <h3>
                Simulation
              </h3>

            </div>
            <div className='ms-5 mt-2 me-5' 
              style={{
                backgroundColor: request=== "questionarie" ? 'whitesmoke' :'white',
                borderRadius:'5px',
                padding:'4px',
                transition:'0.25s ease-in-out'
              }}
            
             onClick={() => {
              setProgress(0)
              setColor("yellow")
              setRequest("questionarie")
              setProgress(100)
              setColor("pink")
            }} role="button">
              <h3>
                Questionarie
              </h3>

            </div>
          </div>

          <div className='  d-flex align-items-center justify-content-left mt-4' style={{
            marginLeft: '250px',
            backgroundColor: 'whitesmoke',
            width: '1000px',
            borderRadius: '10px',
            padding: '20px',

          }}>
            {request === "theory" && <div>
              <h4>Objectives</h4>
              {exp.exp[0]?.objective.map((obj) => {
                return <div>{obj}</div>
              })}

              <h4 className='mt-4'>Theory</h4>
              {exp.exp[0]?.theory.map((obj) => {
                return <div style={{
                  width: '900px'
                }}>
                  <p>{obj}</p>
                </div>
              })}
            </div>
            }


            {request === "procedure" && <div>
              <h4>Procedure</h4>
              {exp.exp[0]?.procedure.map((obj) => {
                return <div style={{
                  width: '900px'
                }}> <p>

                    {obj}
                  </p>
                </div>
              })}

            </div>
            }


            {request === "simulation" && <div>
              <h4>Simulation</h4>
              {exp.exp[0].simulation && exp.exp[0].title==="EMF of a Cell(Nerst Equation)" && <div>Simulation Added
              
              <EMF /></div>}
              {!exp.exp[0].simulation  && <div>
                  Simulation To Be Added
                  
              </div>}
            </div>
            }


            {request === "questionarie" && <div>
              <h4>Questionarie</h4>
              {exp[0]?.questionarie && <p>questionarie Added</p>}
              {!exp[0]?.questionarie && <p>questionarie To Be Added</p>}
            </div>
            }

          </div>


        </div>}

      </div>
    </>
  )
}

export default ExpDetails
