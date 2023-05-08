import React, { useRef, useState } from 'react'
import Select from 'react-select';

function EMF() {

    const [volts, setVolts] = useState(0)
    const [temp, setTemp] = useState("10")
    const [conc, setConc] = useState("0.01")
    console.log("CALLED");
    const slider = document.getElementById("myRange");
    const output = document.getElementById("demo");
    if (output) {
        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
            setTemp(this.value);
        }
    }

    const slider_ = document.getElementById("myRange_");
    const output_ = document.getElementById("concC");
    if (output_) {
        output_.innerHTML = slider_.value;
        slider_.oninput = function () {
            setConc(this.value);
            cC.current = this.value;
            output_.innerHTML = cC.current
        }
        // console.log(conc);
    }

    const slider__ = document.getElementById("myRange__");
    const output__ = document.getElementById("concA");
    if (output_) {
        output__.innerHTML = slider_.value;
        slider__.oninput = function () {
            setConc(this.value);
            cA.current = this.value;
            output__.innerHTML = cA.current
        }
        // console.log(conc);
    }


    const valueC = useRef('0.0')
    const valueA = useRef('0.0')
    const cA = useRef(0.0)
    const cC = useRef(0.0)
    const n = useRef('0')
    const nA = useRef('0')
    const nC = useRef('0')
    const R = 3.314
    const F = 96500

    const electrodes = [
        { label: 'Lithium', value: '-3.05', e: '1' },
        { label: 'Potassium', value: '-2.93', e: '1' },
        { label: 'Barium', value: '-2.90', e: '2' },
        { label: 'Calcium', value: '-2.87', e: '2' },
        { label: 'Sodium', value: '-2.71', e: '1' },
        { label: 'Magnesium', value: '-2.37', e: '2' },
        { label: 'Aluminium', value: '-1.66', e: '3' },
        { label: 'Manganese', value: '-1.18', e: '2' },
        { label: 'Zinc', value: '-0.76', e: '2' },
        { label: 'Chromium', value: '-0.74', e: '3' },
        { label: 'Iron', value: '-0.44', e: '2' },
        { label: 'Cobalt', value: '-0.27', e: '2' },
        { label: 'Nickel', value: '-0.25', e: '2' },
        { label: 'Tin', value: '-3.08', e: '2' },
        { label: 'Lead', value: '-0.13', e: '2' },
        { label: 'Copper', value: '0.34', e: '2' },
        { label: 'Silver', value: '0.80', e: '1' },
        { label: 'Gold', value: '1.68', e: '3' },
        { label: 'Hydrogen', value: '0.0', e: '1' },
    ];


    const handleClick = () => {
        n.current = lcm(parseFloat(nA.current), parseFloat(nC.current));
        // console.log(n);
        // setVolts(valueC.current - valueA.current)
        // console.log(temp);
        // console.log(n);
        let ans = 0
        ans = (parseFloat(valueC.current) - parseFloat(valueA.current)) - (R * parseFloat(temp))/(parseFloat(n.current)*F) * Math.log(parseFloat(cC.current))/(parseFloat(cA.current))
        // console.log(ans.toPrecision(2));
        setVolts(ans)
    }

    function lcm(x, y) {
        if ((typeof x !== 'number') || (typeof y !== 'number'))
            return false;
        return (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));
    }

    function gcd(x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    }

    return (
        <>

            <div style={{
                width: '1000px', 
                height:'500px'
            }}>

                <div style={{
                    width: '1000px',
                    height: '400px', 
                    display: 'flex'
                }}>

                    <div style={{
                        width: '598px',
                        height: '400px', 
                        display: 'flex',
                        position: 'relative'
                    }}>
                        <img src="https://www.chemicals.co.uk/wp-content/uploads/2023/01/galvanic-cell-experiment-scaled.jpg" height="400px" alt="" onContextMenu={(e)=>{
                            e.preventDefault()
                        }} />
                        <div style={{
                            position: 'absolute',
                            backgroundColor: 'black',
                            height: '40px',
                            zIndex: '100',
                            width: '76px',
                            top: '216px',
                            left: '260px',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {volts?.toPrecision(2)}V
                        </div>
                    </div>

                    <div>
                        <div className="">
                            <div className="d-flex justify-content-center align-items-center mb-1 ms-1">
                                Temperature
                            </div>
                            <div className=" ms-5">
                                <input type="range" min="10" max="100" value="10" id="myRange" onChange={(e)=>{
                                    // console.log(temp)
                                }} />
                                <p>Value: <span id="demo"></span>°C</p>
                            </div>
                        </div>


                        <div  >

                            <div className="d-flex justify-content-center mb-3 ">

                                Select Cathode:
                                <div>
                                    <Select options={electrodes} onChange={(e) => {
                                        // console.log(e)
                                        valueC.current = e.value
                                        // console.log(valueC)
                                        nC.current = e.e
                                    }} />

                                </div>
                            </div>


                            <div className="">
                                <div className="d-flex justify-content-center align-items-center mb-1 ms-1">
                                    Concentration Cathode:(0.01-10M)
                                </div>
                                <div className=" ms-5">
                                    <input type="text"   onChange={(e) =>{
                                        cC.current = e.target.value
                                        // console.log(cC)
                                    }} />
                                    <p>Value: {cC.current} M</p>
                                </div>
                            </div>


                            <div className="d-flex justify-content-center mb-3 ">

                                Select Anode:(0.01-10M)
                                <div>
                                    <Select options={electrodes} onChange={(e) => {
                                        // console.log(e)
                                        valueA.current = e.value
                                        // console.log(valueA)
                                        nA.current = e.e
                                    }} />

                                </div>
                            </div>
                        </div>


                        <div className="">
                            <div className="d-flex justify-content-center align-items-center mb-1 ms-1">
                                Concentration Anode:
                            </div>
                            <div className=" ms-5">
                                <input type="text"  id="myRange__" onChange={(e) =>{
                                        cA.current = e.target.value
                                        // console.log(cA)
                                    }}/>
                                <p>Value: {cA.current} M</p>
                            </div>
                        </div>

                        <button className="btn btn-success ms-5" onClick={handleClick}>Test</button>
                        <button className='btn btn-primary'>ReSet</button>
                    </div>



                </div>
            </div>
        </>
    )
}

export default EMF
