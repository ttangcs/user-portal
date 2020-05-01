import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";

var database = app.database();

const SignUp = ({ history }) => {
  function makeNewUser(userId, name, passcode) {
    database.ref('/users/').child(userId).set({
      Name: name,
      Passcode: passcode,
      UID: userId,
      ClockedIn: "False",
      Pay: 0,
      Permission: 0
    });
  }

  function checkPasscode() {
    database.ref('/users/').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.hasChild("Passcode")){
          if(childSnapshot.val().Passcode == (document.getElementById('passcode').value)) {
            alert("Passcode Exists")
            return true
          }
          else{
            return false
          }
        }
      })
    })
  }

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { name, email, password, passcode } = event.target.elements;
    if (!checkPasscode()){
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(
            (user) => {
              if(user){
                user.user.updateProfile({
                  displayName: name.value
                })
                makeNewUser(user.user.uid, name.value, passcode.value)
              }}
          )
        history.push("/");
      } catch (error) {
        alert(error);
      }
    }
  }, [history]);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Name
          <input name="name" type="name" placeholder="Name" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <label>
          Passcode
          <input name="passcode" id="passcode" type="number" placeholder="Passcode" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);