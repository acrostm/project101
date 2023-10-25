import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherPage from './components/pages/WeatherPage';
import HomeContainer from "./components/pages/HomeContainer";
import FrontPage from "./components/pages/FrontPage";

function App () {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<HomeContainer />}></Route>
                    <Route path='/home' element={<FrontPage />}></Route>
                    <Route path='/weather' element={<WeatherPage />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
