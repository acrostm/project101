import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherPage from './components/pages/weatherPage';
import HomeContainer from "./components/pages/homeContainer";
import UserListComponent from "./components/functions/userList";

function App () {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeContainer />}></Route>
                <Route path='/users' element={<UserListComponent />}></Route>
                <Route path='/weather' element={<WeatherPage />}></Route>
                {/*<Route path='/detail/:id' exact component={Detail}></Route>*/}
            </Routes>
        </Router>
    );
}

export default App;
