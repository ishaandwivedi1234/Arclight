function initExamInfo() {
  let name = document.getElementById("name");
  let course_code = document.getElementById("course_code");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let duration = document.getElementById("duration");
  eel.getExamFromLocalStorage()(function (exam) {
    name.value = exam["exam_name"];
    course_code.value = exam["course_code"];
    date.value = exam["date"];
    time.value = exam["time"];
    duration.value = exam["time"] + "-" + exam["end_time"];
  });
}
