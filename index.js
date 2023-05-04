const firebaseConfig = {
  apiKey: "AIzaSyADTqM1RjdkDjiNWzc-5DiJn1FblKPlUq4",
  authDomain: "birbal-authorization.firebaseapp.com",
  projectId: "birbal-authorization",
  storageBucket: "birbal-authorization.appspot.com",
  messagingSenderId: "217702969214",
  appId: "1:217702969214:web:cb33df734c8c22c9520d2f",
  databaseURL: "https://birbal-authorization-default-rtdb.asia-southeast1.firebasedatabase.app"
};

function initializeApp() {

  var firebaseConfig = {
    apiKey: "AIzaSyADTqM1RjdkDjiNWzc-5DiJn1FblKPlUq4",
    authDomain: "birbal-authorization.firebaseapp.com",
    projectId: "birbal-authorization",
    storageBucket: "birbal-authorization.appspot.com",
    messagingSenderId: "217702969214",
    appId: "1:217702969214:web:cb33df734c8c22c9520d2f",
    databaseURL: "https://birbal-authorization-default-rtdb.asia-southeast1.firebasedatabase.appF"
  };
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function register() {
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  full_name = document.getElementById('full_name').value;
  favourite_song = document.getElementById('favourite_song').value;
  tell_me = document.getElementById('tell_me').value;

  if (validate_email(email) == false) {
    alert('Invalid Email!')
    return
  }
  if (validate_passwd(password) == false) {
    alert('Password should contain atleast six characters!')
    return
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(tell_me) == false) {
    alert('One or more fields is outta line!')
    return
  }

  auth.createUserWithEmailAndPassword(email, password).then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()
    var rawDate = new Date()
    var dateTime = rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString()
    var user_data = {
      email: email,
      password: password,
      full_name: full_name,
      favourite_song: favourite_song,
      tell_me: tell_me,
      last_login: dateTime
    }
    alert("User created successfully!")
    database_ref.child('users/' + user.uid).set(user_data)
    login()

  }).catch(function(error) {
    // var error_code=error.code;
    var error_msg = error.message
    alert(error_msg)
  })
}

function login() {
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  full_name = document.getElementById('full_name').value;
  favourite_song = document.getElementById('favourite_song').value;
  tell_me = document.getElementById('tell_me').value;
  if (validate_email(email) == false) {
    alert('Invalid Email!')
    return
  }
  if (validate_passwd(password) == false) {
    alert('Password should contain atleast six characters!')
    return
  }
  auth.signInWithEmailAndPassword(email, password).then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()
    var rawDate = new Date()
    var dateTime = rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString()
    var user_data = {
      last_login: dateTime
    }
    alert("Login successfully!")
    database_ref.child('users/' + user.uid).update(user_data)
    if (full_name != "") {
      database_ref.child('users/' + user.uid).update({ full_name: full_name })
    }
    if (favourite_song != "") {
      database_ref.child('users/' + user.uid).update({ favourite_song: favourite_song })
    }
    if (tell_me != "") {
      database_ref.child('users/' + user.uid).update({ tell_me: tell_me })
    }
    localStorage.setItem('userId', user.uid);

    window.location.href = "home.html";


  }).catch(function(error) {
    // var error_code=error.code;
    var error_msg = error.message
    alert(error_msg)
  })
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_passwd(passwd) {
  if (passwd.length >= 6) {
    return true
  } else {
    return false
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }
  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}