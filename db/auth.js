import firebase from 'firebase'
import fire from './firebase'


var Googleprovider = new firebase.auth.GoogleAuthProvider();
import { message } from 'antd';

export const signInWithGoogle = () => {

    firebase.auth()
   
   .signInWithPopup(Googleprovider).then(function(result) {
      console.log(result)
      localStorage.setItem("uid",result.user.uid)
      const data={
        email:result.user.email,
        creationTime:result.user.metadata.creationTime,
        Photo:result.user.photoURL,
        Displayname:result.user.displayName

      }
      console.log(data);
      fire
      .database()
      .ref(`Linksdata/${result.user.uid}/Auth`).set(data)

      fire
      .database()
      .ref(`Linksdata/${result.user.uid}/CollectionName`).push({ 
         Image:"https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
         Name:"My Workspace"
      })
      fire
      .database()
      .ref(`Linksdata/${result.user.uid}/All_Coll/My Workspace/info`).set({ 
         Image:"https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
         Name:"My Workspace"
      })




   }).catch(function(error) {
  
      var errorMessage = error.message;
      console.log(error.code)
      console.log(error.message)
   });
};





var Gitprovider = new firebase.auth.GithubAuthProvider();


   export const githubSignin = () =>{
   firebase.auth().signInWithPopup(Gitprovider)
   
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(result)
      localStorage.setItem("uid",result.user.uid)
      const data={
        email:result.user.email,
        creationTime:result.user.metadata.creationTime,
        Photo:result.user.photoURL,
        Displayname:result.user.displayName

      }
      console.log(data);
      fire
      .database()
      .ref(`Linksdata/${result.user.uid}/Auth`).set(data)

      fire
      .database()
      .ref(`Linksdata/${result.user.uid}/CollectionName`).push({ 
         Image:"https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
         Name:"My Workspace"
      })
      fire
      .database()
      .ref(`Linksdata/${result.user.uid}/All_Coll/My Workspace/info`).set({ 
         Image:"https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
         Name:"My Workspace"
      })


      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      message.warn(error.code);
      console.log(error.code)
      console.log(error.message)
   });
}