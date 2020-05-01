import React, { useEffect } from 'react';
import app from './base';
import Hours from './components/hours';

var database = app.database();

const Home = () => {
    const [passcode, setPasscode] = React.useState(null);
    var currentUser = app.auth().currentUser;
    var userId = currentUser.uid;


    useEffect(() => {
      let userRef = database.ref('/users/'+userId)
      
      const userListener = userRef.on('value', snapshot => {
        setPasscode(snapshot.val().Passcode)
      })
      return () => userListener();
    }, [])


  return (
    <>
      <h1>Home</h1>
      <h1>{currentUser.displayName}</h1>
      <Hours/>
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </>
  )
}

export default Home;