import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import {  signOut } from "firebase/auth";
import { auth } from '../App/App';

export default function User() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("uid", uid)
                //TODO
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
                navigate("/login");
            }
        });

    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <nav>
                <p>
                    User Page
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}