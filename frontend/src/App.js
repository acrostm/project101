import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherPage from './components/pages/WeatherPage';
import HomeContainer from "./components/pages/HomeContainer";
import UserListComponent from "./components/functions/UserList";

function App () {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<HomeContainer />}></Route>
                    <Route path='/users' element={<UserListComponent />}></Route>
                    <Route path='/weather' element={<WeatherPage />}></Route>
                    {/*<Route path='/detail/:id' exact component={Detail}></Route>*/}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
