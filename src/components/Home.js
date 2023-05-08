import React from 'react'
import ContentPage from './ContentPage'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './MainPage';
import ExpDetails from './ExpDetails';
import Theory from './Theory';
import LambertBeersLaw from './exps/LambertBeersLaw';
import PageNotFound from './PageNotFound';
import Notes from './Notes';
import EMF from './exps/EMF';
import FeedBack from './FeedBack';
// import  ProgressBar  from 'react-progressbar-on-scroll';

function Home() {
    return (
        <>
           

            <Navbar />
            <div style={{
                height: '100vh',
                overflowX: 'hidden',
                overflowY: 'scroll',
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover', 
            }}>

                <Routes >
                    <Route exact path='/' element={<MainPage />} />
                    <Route exact path='/@PhysicalChemistry' element={<ContentPage />} />
                    <Route exact path='/@OrganicChemistry' element={<ContentPage />} />
                    <Route exact path='/@InorganicChemistry' element={<ContentPage />} />
                    <Route exact path='/experiments/lambertBeersLaw' element={<LambertBeersLaw />} />
                    {/* <Route exact path='/experiments/emfOfACell' element={<EMF />} /> */}
                    <Route exact path='notes' element={<Notes />} />
                    <Route exact path="*" element={<PageNotFound/>}/>
                    <Route exact path="feedBack" element={<FeedBack />} />
                </Routes>
            </div>
        </>
    )
}

export default Home
