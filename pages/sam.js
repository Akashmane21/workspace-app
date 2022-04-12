import React, { Component , useState , useEffect } from 'react';
import firebase from '../db/firebase';
import Login from './Login';


function App(){
  const [user, setuser] = useState('')

  useEffect(() => {
   
    firebase.auth().onAuthStateChanged((User)=>{
      if(User)
      {
        setuser({User})
        console.log(User.metadata);
        console.log(User.email);
      }
      else{
        setuser({User : null})
      }
    })

  }, [])
  


  // componentDidMount()
  // {
  //   this.authListener();
  // }
  // authListener(){
  //   firebase.auth().onAuthStateChanged((user)=>{
  //     if(user)
  //     {
  //       this.setState({user})
  //     }
  //     else{
  //       this.setState({user : null})
  //     }
  //   })
  // }

 
    return (
      <div className="App">
        {user ? (<> 
        
        Auth
        </>) : (<>
        
        <Login />
         </>)}
       
      </div>
    );
  
}

export default App;