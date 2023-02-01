import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { signOut, updateProfile, updateEmail } from "firebase/auth";
import { auth } from '../App/App';

export default function User() {
    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(false);
    const [saving, setSaving] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setDisplayName(user.displayName ? user.displayName : '');
                setEmail(user.email ? user.email : '');
                setPhotoURL(user.photoURL ? user.photoURL : '');
            } else {
                // User is signed out
                // ...
                // console.log("user is logged out")
                navigate("/login");
            }
        });

    }, [])

    const handleEdit = () => {
        setIsEdit(true);
    }
    const handleCancel = () => {
        setIsEdit(false);
    }

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile(auth.currentUser, { displayName: displayName, photoURL: photoURL })
            await updateEmail(auth.currentUser, email);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
            setIsEdit(false);
        }
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
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
                {isEdit ?
                    <div>
                        Photo URL:
                        <input type="text" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
                    </div>
                    :
                    <div>
                        <Avatar
                            alt="Google Photo/Initial"
                            src={photoURL}
                        />
                    </div>
                }
                {isEdit ?
                    <div>
                        Display Name:
                        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                    </div>
                    :
                    <div>
                        Display Name: {displayName}
                    </div>
                }
                {isEdit ?
                    <div>
                        Email:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    :
                    <div>
                        Email: {email}
                    </div>
                }
                <div>
                    <button onClick={handleEdit}>
                        Edit
                    </button>
                    <button disabled={saving} onClick={handleSave}>
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button onClick={handleCancel}>
                        Cancel
                    </button>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}