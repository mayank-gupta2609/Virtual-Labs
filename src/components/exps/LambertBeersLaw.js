import React, { useRef } from 'react'
import { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import ReactSlider from "react-slider";
import Plot from 'react-plotly.js';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Quiz from 'react-quiz-component';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import XenonLamp from '../../../src/Xenon arc lamp(Light Source).jpg'
import Cuvette from '../../../src/Cuvette.jpeg'
import Spectrophotometer from '../../../src/Spectrophotometer.jpg'
import Kmno4 from '../../../src/KMnO4(Analyte).jpeg'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LambertBeersLaw = () => {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(true);
    const [request, setRequest] = useState("theory")
    const [color, setColor] = useState("red")
    const [progress, setProgress] = useState(0)
    const [value, setValue] = useState(0.00001);
    const absorbance = useRef('0')
    const intensity = useRef('0')
    const reading = useRef('0')
    const handleChange = (event, newValue) => {
        setValue(newValue);
        absorbance.current = value1 * value * 2070
        // calc()

        intensity.current = (value2 * Math.exp(value1 * value * 2070 * -1))
        // console.log(value)
    };

    const [value1, setValue1] = useState(1);

    const handleChange1 = (event, newValue1) => {
        setValue1(newValue1);
        // calc()
        absorbance.current = value1 * value * 2070
        intensity.current = (value2 * Math.exp(value1 * value * 2070 * -1))
        // console.log(value1)
    };

    const [value2, setValue2] = useState(0.0001);

    const handleChange2 = (event, newValue2) => {
        setValue2((newValue2));
        // console.log(value2)
        // console.log(value)
        intensity.current = (value2 * Math.exp(value1 * value * 2070 * -1))
    }

    const c = useRef(new Array())
    const cR = useRef(new Array())
    const [graph, setGraph] = useState(false)
    const calc = () => {
        // intensity.current = 0
        if (conc < 0) {
            setOpen(true)
            return
        }
        c.current.push(conc)
        reading.current = (0.1 * conc * 2070).toPrecision(4)
        cR.current.push(reading.current)
        // console.log(c)
        // console.log(value1 * value * 2070)
        // intensity.current = (value2 * Math.exp(value1 * value * 2070 * -1))
        // * value1 * value*2070
        setConc(0)
    }

    const l = []
    const lR = []
    const r = []
    const cl = []
    const clR = []
    const [conc, setConc] = useState()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const action1 = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose1}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const quiz = {
        "quizTitle": "Beer Lambert's Law Quiz",
        "quizSynopsis": "This is a short quiz to check your knowledge",
        "nrOfQuestions": "4",
        "questions": [
            {
                "question": "Beer Lambert's Law states that?",
                "questionType": "text",
                // if you need to display Picture in Question
                "answerSelectionType": "single",
                "answers": [
                    "Absorbance directly proportional to length and concentration",
                    "Absorbance is inversely proportional to length and concentration",
                    "Absorbance only directly proportional to length  ",
                    "Absorbance only directly proportional to  concentration"
                ],
                "correctAnswer": "1",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Absorbance directly proportional to length and concentration",
                "point": "20"
            },
            {
                "question": "Which of the following is correct?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                    "A = εbc",
                    "I=I0e-εbc",
                    "All Of the above"
                ],
                "correctAnswer": "3",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
                "explanation": "Both of them are correct",
                "point": "20"
            },
            {
                "question": "InCorrect Formula",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                    "T=I/I0",
                    "A = 2 - log(%T)",
                    "T = I0/I"
                ],
                "correctAnswer": "3",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Transmittance is the ratio of Output Intensity upon Incident Incident ",
                "point": "10"
            }, 
            {
                "question": "True Or False/The law fails at high concentrations (>0.01M) due to electrostatic interactions between molecules in proximity.",
                "questionType": "text",
                "answerSelection": "single",
                "answers": [
                    "True",
                    "False"
                ],
                "correctAnswer": "True",
                "messageForCorrectAnswer": "Correct answer. Good job",
                "messageForIncorrectAnswer": "The law fails at high concentrations (>0.01M) due to electrostatic interactions between molecules in proximity.",
                "point": "50"
            }


        ]
    }
    const addReading = () => {
        c.push(value)
        l.push(value1)
        r.push(value1 * value * 2070 * -1)
        setConc(0)
    }

    return (
        <>
            <LoadingBar
                color={color}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <div style={{
                marginTop: '64px',
                overflowY: 'scroll',
                backgroundImage: "url(https://i.pinimg.com/originals/cb/7e/f2/cb7ef26e157572c44cc84f88e92e5149.gif)",
                height: '100vh'
            }}>
                <h1 className="text-center">Lambert Beers Law</h1>
                <div class="d-flex justify-content-around mt-5">
                    <h3 style={{
                        backgroundColor: request === "theory" ? 'whitesmoke' : '',
                        borderRadius: '5px',
                        padding: '4px',
                        transition: '0.25s ease-in-out'
                    }} role="button" onClick={() => {
                        setProgress(0)
                        setColor("yellow")
                        setRequest("theory")
                        setProgress(100)
                        setColor("pink")
                        if (request !== "theory") {

                            setOpen1(true)
                        }
                    }} >Theory</h3>
                    <h3 style={{
                        backgroundColor: request === "apparatus" ? 'whitesmoke' : '',
                        borderRadius: '5px',
                        padding: '4px',
                        transition: '0.25s ease-in-out'
                    }} role="button" onClick={() => {
                        setProgress(0)
                        setColor("yellow")
                        setRequest("apparatus")
                        setProgress(100)
                        setColor("pink")
                    }} >Apparatus Needed</h3>
                    <h3 style={{
                        backgroundColor: request === "procedure" ? 'whitesmoke' : '',
                        borderRadius: '5px',
                        padding: '4px',
                        transition: '0.25s ease-in-out'
                    }} role="button" onClick={() => {
                        setProgress(0)
                        setColor("yellow")
                        setRequest("procedure")
                        setProgress(100)
                        setColor("pink")
                    }}>Procedure</h3>
                    <h3 style={{
                        backgroundColor: request === "simulation" ? 'whitesmoke' : '',
                        borderRadius: '5px',
                        padding: '4px',
                        transition: '0.25s ease-in-out'
                    }} role="button" onClick={() => {
                        setProgress(0)
                        setColor("yellow")
                        setRequest("simulation")
                        setProgress(100)
                        setColor("pink")
                    }}>Simulation</h3>
                    <h3 style={{
                        backgroundColor: request === "questionarie" ? 'whitesmoke' : '',
                        borderRadius: '5px',
                        padding: '4px',
                        transition: '0.25s ease-in-out'
                    }} role="button" onClick={() => {
                        setProgress(0)
                        setColor("yellow")
                        setRequest("questionarie")
                        setProgress(100)
                        setColor("pink")
                    }}>Questionarie</h3>

                </div>


                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        width: '80%',
                        backgroundColor: 'whitesmoke',
                        marginTop: '30px',
                        padding: '10px',
                        borderRadius: '10px',
                    }}>
                        {request === "theory" && <div>
                            <Snackbar
                                open={open1}
                                autoHideDuration={100000}
                                onClose={handleClose1}
                                message="It is best to measure the absorbance somewhere in the range of 0.1 to 0.8. Solutions of higher and lower concentrations have higher relative error in the measurement. Low absorbance values (high transmittance) correspond to dilute solutions. Often, other than taking steps to concentrate the sample, we are forced to measure samples that have low concentrations and must accept the increased error in the measurement. It is generally undesirable to record absorbance measurements above 1 for samples. Instead, it is better to dilute such samples and record a value that will be more precise with less relative error."
                                action={action1}
                            />

                            <h5 className="text-center">AIM: To verify Lambert-beer’s law for various solutions</h5> <p style={{
                                fontSize: '18px',
                            }}>

                                The Beer-Lambert law states that the absorbance of a solution is directly
                                proportional to the concentration of the absorbing species in the solution and the path
                                length. Thus, for a fixed path length (cuvette length), UV/Vis spectroscopy can be used
                                to determine the concentration of the absorber in a solution. The absorbance changes
                                with concentration, A higher concentration of the colored solution absorbs more light
                                (and transmits less) than a solution of lower concentration.
                            </p>
                            <div style={{
                                display: 'flex',
                            }}>

                                <img src="https://chemistrytalk.org/wp-content/uploads/2023/03/Transmission-2.jpg" alt="" width='30%' className='mt-4 me-3' />
                                <p style={{
                                    fontSize: '18px',
                                }} className='mt-4'>

                                    log( Io / It ) = A = εcl
                                    where <br />
                                    Io and It are the incident and transmitted intensities<br />
                                    A = absorbance and
                                    ε is a constant i.e. absorptivity (formerly called the extinction coefficient )<br /> If the
                                    concentration is measured in molL−1 , the absorptivity is called the molar
                                    absorptivity .<br />
                                    A= ε c l
                                    At constant length
                                    A α c
                                </p>
                            </div>
                            <p style={{
                                fontSize: '18px',
                            }} className="mt-4">
                                It is best to measure the absorbance somewhere in the range of 0.1 to 0.8. Solutions of higher and lower concentrations have higher relative error in the measurement. Low absorbance values (high transmittance) correspond to dilute solutions. Often, other than taking steps to concentrate the sample, we are forced to measure samples that have low concentrations and must accept the increased error in the measurement. It is generally undesirable to record absorbance measurements above 1 for samples. Instead, it is better to dilute such samples and record a value that will be more precise with less relative error.
                            </p>
                        </div>
                        }

                        {request === "apparatus" && <div style={{

                            paddingBottom: '40px'
                        }}>


                            <h5 className="text-center">Apparatus used in this experiment</h5> <p style={{
                                fontSize: '18px',
                            }}>
                                <div>


                                    <div className="row d-flex justify-content-center">
                                        <div style={{
                                            width: '40%'
                                        }}>
                                            <h4>Light Source - Xenon Arc Lamp</h4>
                                            <img src={XenonLamp} alt="" height="60%" style={{
                                                borderRadius: '10px'
                                            }} />

                                        </div>

                                        <div style={{
                                            width: '40%'
                                        }} className="ms-5">
                                            <h4>Cuvette for holding the solution</h4>
                                            <img src={Cuvette} alt="" height="60%" style={{
                                                borderRadius: '10px'
                                            }} />

                                        </div>

                                    </div>



                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="ms-5" style={{
                                            width: '40%'}}>
                                        <h4>Spectrophotometer for measuring the Intensity</h4>
                                        <img src={Spectrophotometer} alt="" height="500px" style={{
                                            borderRadius: '10px'
                                        }} />

                                    </div>

                                    <div className="ms-5" style={{
                                            width: '40%'}}>
                                        <h4>Analyte used is KMnO4 for this experiment</h4>
                                        <img src={Kmno4} alt="" style={{
                                            borderRadius: '10px'
                                        }} height="100%" />

                                    </div>
                                </div>
                            </p>
                        </div>
                        }



                        {request === "procedure" && <div style={{
                            height: '450px',
                            overflowY: 'scroll',
                        }}>
                            <h4 className="mt-4">Requirements:</h4>
                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px'
                            }}>
                                1. Analyte

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px'
                            }}>
                                2. Xenon Arc Lamp Light Source

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px'
                            }}>
                                3. Detector

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px'
                            }}>
                                4. Cuvette

                            </p>



                            <h4 className="mt-3">Procedure</h4>

                            <div><img src="https://i.pinimg.com/736x/03/c9/a3/03c9a352a019ceb1e6660afbd53edb0e.jpg" alt="" height="350px" style={{
                                    borderRadius: '10px'
                                }} /></div>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Obtain small volumes 0.01M KMnO4 (Molecular weight 158.03 gm/mol) of
                                    solution and distilled water in separate beakers, fill in the separate graduated
                                    burettes
                                </div>

            

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Label five clean, dry, test tubes 1–5. Use Burettes to prepare five standard
                                    solutions according to the chart below. Thoroughly mix each solution with a
                                    stirring rod. Clean and dry the stirring rod between uses
                                </div>

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    You are now ready to collect absorbance-concentration data for the five standard
                                    solutions
                                </div>

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Switch on the computer and/or the instrument powers; wait for 30 minutes for
                                    ‘warm-up’ of the instrument
                                </div>

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    In the instrument one can select light sources (UV and visible), choose the slit
                                    width, scan speed and % transmittance or absorbance display, wavelength range of
                                    interest, etc.
                                </div>

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Take two clean and dry glass (only for visible range scan) or quartz cuvettes with a
                                    given path length (say, 1 cm). Prepare a blank by filling a cuvette 3/4 full with
                                    distilled water and the other cuvette with aqueous KMnO4 solution with lowest
                                    concentration.
                                </div>

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Read the absorbance value displayed in the meter. When the displayed absorbance
                                    value stabilizes, record its value in your data table.

                                </div>

                            </p>

                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Repeat the procedure for Test Tubes 2 to 5.Similarly spectral runs are done for all the
                                    other samples starting from the lowest concentrations to next higher concentrations
                                    of KMnO4. Every time one should rinse the cuvette taking a small portion of the
                                    solution to be analyzed next.
                                </div>

                                
                                
                            </p>


                            <p style={{
                                fontSize: '18px',
                                marginBottom: '0px',
                                display: 'flex'
                            }}>
                                <div>

                                    <i className="fa-sharp fa-solid fa-arrow-right-long me-2" style={{ color: "#505358" }}></i>
                                </div>
                                <div>

                                    Plot a curve between Absorbance v/s concentrations. Check whether it is a liner
                                    plot or not
                                </div>

                            </p>


                            <h3>REFERENCE</h3>
                            <h5>https://www.mlsu.ac.in/econtents/2560_Lambert-BeerLaw.pdf</h5>

                        </div>}

                        {request === "simulation" && <div style={{
                            height: 'fit-content'
                        }}  >

                            <div style={{
                                width: '100%',
                                position: 'relative'
                            }} className="d-flex">

                                <div style={{
                                    width: '100%',
                                    display: 'flex',

                                }}>

                                    <div style={{
                                        width: '10%',
                                        height: '450px',

                                    }} className="d-flex align-items-center justify-content-center">
                                        <div>

                                            <i className="fa-solid fa-lightbulb fa-beat-fade " style={{ color: "#fbff00", fontSize: '100px' }}></i>

                                        </div>
                                        <div>
                                        </div>

                                    </div>

                                    <div style={{
                                        width: '60%',
                                        height: '450px',
                                        display: 'flex'
                                    }}>

                                        <div style={{
                                            width: '50%',
                                        }} className="d-flex align-items-center justify-content-center">


                                            <div style={{
                                                width: value1 * 10,
                                                height: '200px',
                                                border: '4px solid black',
                                                zIndex: '10',
                                                // overflow:'hidden'
                                            }} className="justify-content-center">
                                                <div style={{
                                                    backgroundColor: 'whitesmoke',
                                                    height: '42px'
                                                }}>

                                                </div>

                                                <div style={{
                                                    backgroundColor: 'aqua',
                                                    height: '150px',
                                                    width: '100%'
                                                }}>

                                                </div>
                                            </div>
                                        </div>


                                        <div style={{
                                            width: '60%',
                                            height: '450px',
                                            display: 'flex',
                                            backgroundColor: 'white',
                                            borderRadius: '10px'
                                        }}>

                                            <div style={{
                                                width: '100%',
                                            }} className="d-flex align-items-center justify-content-center">
                                                <div style={{
                                                    width: '300px',
                                                    border: '4px solid black'
                                                }}>
                                                    <div style={{
                                                        borderBottom: '1px solid gray',
                                                        height: '60px',
                                                        padding: '2px',
                                                        zIndex: '50'
                                                    }} className="d-flex align-items-center justify-content-center">
                                                        <div style={{
                                                            borderRadius: '20px', width: '100%', height: '100%', backgroundColor: 'white',
                                                        }} className="d-flex align-items-center justify-content-center">
                                                            <h3>

                                                                {((intensity.current / value2) * 100).toPrecision(4)} %
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <h4 className="text-center">Intensity Measured</h4>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div style={{
                                        width: '30%',
                                        height: '450px',
                                        marginLeft: '5px',
                                    }}>



                                        <div style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: '10px',
                                            backgroundColor: 'white',
                                            padding: '10px'
                                        }}>
                                            <div>
                                                <h5>

                                                    Concentration: {value} M
                                                </h5>
                                                <Box sx={{ width: 200 }}>
                                                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                                        <Slider aria-label="Volume" value={value} onChange={handleChange} min={0.00001} max={0.0001} step={0.00001} />
                                                    </Stack>

                                                </Box>
                                            </div>

                                            <div>
                                                <h5>

                                                    Length: {value1} cm
                                                </h5>
                                                <Box sx={{ width: 200 }}>
                                                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                                        <Slider aria-label="Volume" value={value1} onChange={handleChange1} min={1} max={10} step={1} />
                                                    </Stack>

                                                </Box>
                                            </div>

                                            <div>
                                                <h5>

                                                    Intensity: {value2} W/m<sup>2</sup>
                                                </h5>
                                                <Box sx={{ width: 200 }}>
                                                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                                        <Slider aria-label="Volume" value={value2} onChange={handleChange2} min={10} max={100} />
                                                    </Stack>

                                                </Box>
                                            </div>

                                            <div>
                                                <h5>
                                                    Solution
                                                    ε - 2.07 x 10 <sup>3</sup> M<sup>-1</sup>cm <sup>-1</sup>
                                                </h5>
                                            </div>


                                            <div style={{
                                                borderTop: '1px solid black',
                                                marginTop: '5px'
                                            }}>


                                                <h3 style={{
                                                    textDecoration: 'underline'
                                                }}>
                                                    RESULTS:

                                                </h3>
                                                <h5>
                                                    <p>

                                                        Absorbance:- {Number(absorbance.current).toPrecision(2)}
                                                    </p>

                                                    <p>
                                                        Intensity:- {Number(intensity.current)?.toPrecision(2)} W/m<sup>2</sup>

                                                    </p>
                                                </h5>

                                            </div>


                                        </div>

                                    </div>


                                    <div style={{
                                        position: 'absolute',
                                        left: '8%',
                                        top: '46%'
                                    }}>
                                        <div style={{
                                            height: '10px',
                                            width: '380px',
                                            display: 'flex'
                                        }}>
                                            <div style={{
                                                width: '50%',
                                                backgroundColor: 'yellow',
                                                height: '10px'
                                            }}>

                                            </div>

                                            <div style={{
                                                width: '50%',
                                                backgroundColor: 'yellow',
                                                height: '10px',
                                                opacity: intensity.current * 100000000,
                                                transform: '1s ease-in-out opacity'
                                            }}>

                                            </div>

                                        </div>
                                    </div>



                                </div>



                            </div>

                            <div style={{
                                borderRadius: '6px',
                                marginTop: '30px',
                                backgroundColor: 'white'
                            }} className="p-2">
                                <h2 style={{ borderBottom: '1px solid grey' }}>
                                    Graph Of Absorbance v/s Concentration
                                </h2>
                                <div>
                                    <p style={{ fontSize: '20px' }}>
                                        Length - 0.1 cm (Constant for verification purpose, other lengths will also give the same graph)
                                    </p>
                                </div>
                                <Snackbar
                                    open={open}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    message="Concentration can't be negative"
                                    action={action}
                                />
                                <Input type="text" value={conc} onChange={(e) => setConc(e.target.value)} />
                                <button class="btn btn-primary" onClick={calc}>Add Reading</button>
                                <button class="btn btn-success ms-4" onClick={(e) => {
                                    setGraph(true)
                                }}>Display Graph</button>
                            </div>

                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                padding: '10px',
                                marginTop: '10px'
                            }}>
                                <h2 style={{ borderBottom: '1px solid grey' }}>
                                    Readings
                                </h2>
                                <div>
                                    <div className="d-flex mt-3 p-3" style={{
                                        border: '1px solid black', borderRadius: '10px',
                                        width: '420px'
                                    }}  >
                                        <div style={{
                                            borderRight: '1px solid grey'
                                        }} className="pe-3">
                                            <h3 style={{
                                                borderBottom: '1px solid grey'
                                            }}>

                                                Concentration
                                            </h3>
                                            <div>
                                                {c.current?.map((conc) => {
                                                    return <div>
                                                        <p style={{
                                                            fontSize: '20px'
                                                        }}>{conc}</p>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div className='ms-4'>
                                            <h3 style={{
                                                borderBottom: '1px solid grey'
                                            }}>

                                                Absorbance
                                            </h3>
                                            <div>
                                                {cR.current?.map((conc) => {
                                                    return <div>
                                                        <p style={{
                                                            fontSize: '20px'
                                                        }}>{conc}</p>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {graph && <Draggable>

                                <div style={{
                                    width: 'fit-content',
                                    padding: '6px',
                                    borderRadius: '10px',
                                    height: 'fit-content'
                                }} className="holder">

                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        width: 'fit-content',
                                        zIndex: 100000,
                                        overflow: 'hidden'
                                    }}>

                                        <Plot
                                            data={[
                                                {
                                                    x: c.current,
                                                    y: cR.current,
                                                    type: 'scatter',
                                                    mode: 'lines',
                                                    marker: { color: 'red' },
                                                },
                                                { type: 'scatter', x: c.current, y: cR.current },
                                            ]}
                                            layout={{ width: 620, height: 480, title: 'Absorbance v/s Concentration' }}
                                        />
                                    </div>
                                </div>
                            </Draggable>}
                        </div>
                        }

                        {request == "questionarie" && <div style={{
                            // border:'1px solid red'
                        }}>
                            <Quiz quiz={quiz} />
                        </div>}
                    </div>



                </div>


            </div>
        </>
    )
}

export default LambertBeersLaw



const Input = styled.input` 
  outline: 1;
  border: 1px solid grey;
  border-radius: 10px; 
  padding: 6px; 
  margin-right: 15px; 
  width:406px
`;