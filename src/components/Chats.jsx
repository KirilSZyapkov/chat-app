import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';

function Chats() {

  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  async function logout() {
    await auth.signOut();
    history.push('/login');
  }

  async function getFile(url) {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": '5d832003-eac2-4498-92b8-3f5962fc8bc4',
        "user-name": user.email,
        "user-secret": user.uid
      }
    })
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user?.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name)

            axios.post('https://api.chatengine.io/users', 
              formdata,
              {headers:{
                "private-key":'47ce3334-0d67-4563-98c6-9b18432efc30'
              }}
            )
            .then(()=>setLoading(false))
            .catch((error)=> console.log(error))
          })
      })
  }, [user, history]);

  if(!user || loading){
    return "Loading ...";
  }

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Chat App
        </div>
        <div onClick={logout} className='logout-tab'>
          Logout
        </div>

      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="5d832003-eac2-4498-92b8-3f5962fc8bc4"
        userName={user?.email}
        userSecret={user?.uid}
      />
    </div>
  )
}

export default Chats;