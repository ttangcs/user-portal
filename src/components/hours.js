import React from 'react'
import app from '../base.js';

var database = app.database();

const Hours = () => {
  var currentUser = app.auth().currentUser;
  var userId = currentUser.uid;

  var hoursArray = [];

  var hoursFormatted = [];


    database.ref('/users/').child(userId+"@TimeCard/Unpaid").on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        hoursArray.push(new Date(childSnapshot.val().StartingDateTime * 1000).toString())
        hoursArray.push(new Date(childSnapshot.val().EndingDateTime * 1000).toString())
      })
    })

    for (let index = 0; index < hoursArray.length; index = index + 2) {
      hoursFormatted.push(<li>{hoursArray[index]} to {hoursArray[index+1]}</li>)
    }


  console.log(hoursArray)

  return(
    <div>
      <ul>
        {hoursFormatted}
      </ul>
    </div>
  )
}
export default Hours;