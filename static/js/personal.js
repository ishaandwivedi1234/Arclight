function initPersonalInfo() {
  let er = document.getElementById("er_no");
  let name = document.getElementById("name");
  let course = document.getElementById("course");
  let semester = document.getElementById("semester");
  let email = document.getElementById("email");
  eel.getStudentFromLocalStorage()(function (student) {
    er.value = student["en"];
    name.value = student["name"];
    (course.value = student["branch"]),
      (semester.value = student["semester"]),
      (email.value = student["email"]);
  });
}
