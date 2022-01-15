function loginToDashboard() {
  console.log("login in faculty");
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email === "" || password === "") {
    alert("Please provide login credentials ...");
    return;
  }

  document.getElementById("submit_btn").style.display = "none";
  document.getElementById("loader").style.display = "block";

  eel.loginFaculty(
    email,
    password
  )(function (result) {
    document.getElementById("submit_btn").style.display = "";
    document.getElementById("loader").style.display = "none";
    var msg_text = document.getElementById("msg_text");
    var alert = document.getElementById("alert");

    if (result === true) {
      alert.style.display = "block";
      msg_text.innerHTML = "Login Successfull...";
      alert.style.backgroundColor = "#00a693";

      setTimeout(() => {
        msg_text.innerHTML = "Fetching Exam Details ...";
        alert.style.backgroundColor = "#008080";
      }, 500);

      eel.getFacultyExams()(function (response) {
        location.replace("faculty_dashboard.html");
      });
    } else {
      alert.style.display = "block";
      alert.style.backgroundColor = "#f88379";
      msg_text.innerHTML = "Invalid credentials";
    }
  });
}
