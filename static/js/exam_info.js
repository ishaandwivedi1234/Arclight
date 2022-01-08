function initExamInfo() {
  let name = document.getElementById("name");
  let course_code = document.getElementById("course_code");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let duration = document.getElementById("duration");
  eel.getExamFromLocalStorage()(function (exam) {
    var time = new Date(exam["time"]).toLocaleTimeString("en-US");

    name.value = exam["exam_name"];
    course_code.value = exam["course_code"];
    date.value = exam["date"];
    time.value = time;
    duration.value = exam["duration"] + " HRS";
  });
}
