// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzUqUK7mFnjFTHZiVxJgWZUJYcQOnYteA",
  authDomain: "js-16-firebase-1.firebaseapp.com",
  projectId: "js-16-firebase-1",
  storageBucket: "js-16-firebase-1.appspot.com",
  messagingSenderId: "523023913167",
  appId: "1:523023913167:web:e90fe2d89d7daf47aaa7ba",
  measurementId: "G-KGJQKLY9TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Database
const db = getDatabase();

// Wait for the DOM to load before running script
document.addEventListener("DOMContentLoaded", function() {

    //----------------------References------------------------//
    var namebox = document.getElementById("nameBox");  
    var rollbox = document.getElementById("rollBox");  
    var secbox = document.getElementById("secBox");  
    var genbox = document.getElementById("genBox");
    
    var insBtn = document.getElementById("insBtn");
    var selBtn = document.getElementById("selBtn");
    var updBtn = document.getElementById("updBtn");
    var delBtn = document.getElementById("delBtn");

    //-------------------Insert Data Function------------------//
    function insertData() {
      set(ref(db, "TheStudents/"+ rollbox.value),{
        NameOfStd: namebox.value,
        RollNo: rollbox.value,
        Section: secbox.value,
        Gender: genbox.value
      })
      .then(()=>{
        alert("Data stored successfully");
      })
      .catch((error)=>{
        alert("Unsuccessful, error: " + error.message);
      });
    }

    //-------------------Select Data Function-------------------//
    function selectData() {
      const dbref = ref(db);

      get(child(dbref, "TheStudents/" + rollbox.value))
      .then((snapshot)=>{
        if(snapshot.exists()){
          namebox.value = snapshot.val().NameOfStd;
          secbox.value = snapshot.val().Section;
          genbox.value = snapshot.val().Gender;
        }
        else {
          alert("No data found");
        }
      })
      .catch((error)=>{
        alert("Unsuccessful, error: " + error.message);
      });
    }

    //-------------------Update Data Function-------------------//
    function updateData() {
      update(ref(db, "TheStudents/" + rollbox.value),{
        NameOfStd: namebox.value,
        Section: secbox.value,
        Gender: genbox.value
      })
      .then(()=>{
        alert("Data updated successfully");
      })
      .catch((error)=>{
        alert("Unsuccessful, error: " + error.message);
      });
    }

    //-------------------Delete Data Function-------------------//
    function deleteData() {
      remove(ref(db, "TheStudents/" + rollbox.value))
      .then(()=>{
        alert("Data removed successfully");
      })
      .catch((error)=>{
        alert("Unsuccessful, error: " + error.message);
      });
    }

    //-------------------Asign Events To Btns------------------//
    insBtn.addEventListener("click", insertData);
    selBtn.addEventListener("click", selectData);
    updBtn.addEventListener("click", updateData);
    delBtn.addEventListener("click", deleteData);

});
