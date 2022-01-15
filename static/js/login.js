(function () {
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll(".logo");
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (idx + 1) * 400);
    });
  });
});

function login() {
  console.log("login");
  var enrollment = document.getElementById("enrollment");
  var password = document.getElementById("password");
  if (
    enrollment === null ||
    enrollment.value === "" ||
    password === null ||
    password.value === ""
  ) {
    alert("Please provide login credentials ...");
    return;
  }
  var loader = document.getElementById("loader");
  var submit = document.getElementById("submit");

  loader.style.display = "block";
  submit.style.display = "none";

  eel.loginStudent(
    enrollment.value,
    password.value
  )(function (result) {
    if (result === true) {
      console.log("logged in ");
      var alert = document.getElementById("alert");
      var msg_text = document.getElementById("msg_text");
      alert.style.display = "block";
      alert.style.backgroundColor = "green";
      msg_text.innerHTML = "Login Successfull\nPlease wait ...";

      setTimeout(function () {
        alert.style.backgroundColor = "#0069d9";
        msg_text.innerHTML = "Fetching exam details ";

        setTimeout(function () {
          eel.getExamInfo()(function (result) {
            console.log(result);
            if (result["exam"] === false) {
              alert.style.backgroundColor = "#ff8243";
              msg_text.innerHTML = "You don't have any exams today!";
              loader.style.display = "none";
              submit.style.display = "";
            } else {
              var exam_name = result["exam_name"];
              alert.style.backgroundColor = "#6CB4EE";
              msg_text.innerHTML = "Setting up your " + exam_name + " exam ...";

              setTimeout(function () {
                location.replace("personal.html");
              }, 2000);
            }
          });
        }, 2000);
      }, 1000);
    } else {
      var alert = document.getElementById("alert");
      var msg_text = document.getElementById("msg_text");
      alert.style.display = "block";
      msg_text.innerHTML = "Invalid Login credentials";
      console.log("auth failed");
      loader.style.display = "none";
      submit.style.display = "";
    }
  });
}
