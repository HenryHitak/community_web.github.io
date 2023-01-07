import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './pages/Nav';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import Nopage from './pages/Nopage';
import Admin from './pages/Amin';
import Admin2 from './pages/Admin2';
import EmailConfirm from './pages/EmailConfirm';
import PassReset from './pages/PassReset';
import { useState } from 'react';

export default function App(){
    const [user,setUser] = useState('');
    let LoginFunction = (userInput) => {
        setUser(userInput);
    };
    console.log(user);
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Nav/>} logFun={setUser} LoggedUser={user}>
                        <Route index element={<Home/>} />
                        <Route path='home' element={<Home/>} />
                        <Route path='contact' element={<Contact/>} />
                        <Route path='myprofile' element={<Myprofile/>} LoggedUser={user} />
                        <Route path='admin' element={<Admin/>} />
                        <Route path='admindash' element={<Admin2/>} />
                        <Route path='email' element={< EmailConfirm />}/>
                        <Route path='reset' element={< PassReset />}/>
                        <Route path='*' element={<Nopage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}