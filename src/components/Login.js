import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import styled from "styled-components";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

function Login() {

    const [color, setColor] = useState("red")
    const [progress, setProgress] = useState(0)

    const signIn = () => {
        setProgress(0)
        setColor("orange")
        signInWithPopup(auth, provider).catch(alert)
        setProgress(100)
        setColor("red")
    }

    return (
        <>
            <LoadingBar
                color={color}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div style={{ height: '100vh', width: '100vw', display: 'flex',backgroundImage:'url(https://i.pinimg.com/originals/ec/29/67/ec2967eebf71e31cd1cb47e3252e36cd.gif)', alignItems: 'center', justifyContent: 'center', 
            backgroundRepeat:'no-repeat', backgroundSize:'100%' }}>
                <h1 style={{
                    color:'white',
                    backdropFilter:'blur(500px)',
                    padding:'20px',
                    borderRadius:'20px',
                    border:'1px solid white'
                }} className="me-4 block">WELCOME TO VIRTUAL LABS</h1>
                <Button onClick={signIn}  className="ms-4">
                    Sign In With <i className="fa-brands fa-google" style={{ "color": "#ffffff", 
                    marginLeft:'10px' }} 
                    ></i>
                </Button>
            </div>
        </>
    )
}

export default Login;


const Button = styled.div`
    background-color:#77A6F7;
    height:70px;
    width:250px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:10px;
    font-family: Roboto, Noto Naskh Arabic UI, Arial, sans-serif;
    font-size:35px;
    transition:0.15s ease-in-out;

    :hover {
        transform:scale(1.1)
    }
`;