import React   from "react";
import firebase from "../db/firebase";

export default function Img() {
  var ImgName, ImgUrl ;
  var files = [];

  const Chooseme = (e) => {
     files = e.target.files;
     console.log(e.target.files);

      var reader = new FileReader();
      reader.onload = function () {
        document.getElementById("img").src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };

  const Upload = () => {
    console.log(" upload clicked");
    ImgName = document.getElementById("imgname").value;
    var uploadTask = firebase
      .storage()
      .ref("Image/" + ImgName + ".png")
      .put(files[0]);
    console.log(files[0]);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("upprogress").innerHTML =
          "Uploading" + progress + "%";
      },

      // --------Error Handling-------------------------------

      function (err) {
        alert("Error to Saving the Image");
      },

      // ------------Submit image into Database---------------
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
            console.log(url);
          ImgUrl = url;

          console.log("database is clear");
          
     var name = document.getElementById('fileInput'); 
    
     console.log('Selected file: ' + name.files.item(0).type);
     const etype = name.files.item(0).type


     
          const imgref = firebase.database().ref("Pictures");
          const imgs = {
            Name: ImgName,
            Link: ImgUrl,
            type:etype
          };

          imgref.push(imgs);



          alert("Image Added Successfuly");
        });
      }
    );
  };


  return (
    <div className="imgboxall">
      <div class="block">
        <input type="text" id="imgname" /> <br />
        <img src="https://i.imgur.com/Kt3A11F.jpg" id="img" alt="" />
        <label id="upprogress"></label>
        <div className="btnsall">
          <input className="completebtn" id="fileInput" type="file" onChange={Chooseme} />
          <br />
          <button className="completebtn" onClick={Upload} id="upload">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}