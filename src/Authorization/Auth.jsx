import { firebaseAuth } from '../firebase'
import * as firebase from 'firebase';

export function auth(email, pw, team) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((user) => saveUser(user, team))
}

export function logout() {
  return firebaseAuth().signOut()
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user, team) {
  console.log(user);
  console.log(team);
  return firebase.database().ref(`users/${user.uid}`)
    .set({
      team,
      email: user.email,
      uid: user.uid,
    })
    .then(() => user)
}
