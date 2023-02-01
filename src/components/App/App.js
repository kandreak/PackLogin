import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

import User from '../User/User';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "../../firebase-config";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<User />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
