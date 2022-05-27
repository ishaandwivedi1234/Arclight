function startExam() {
  eel.getExamFromLocalStorage()(function (exam) {
    var time = new Date();
    var exam_hr;
    var exam_hr_min;
    var exam_min;
    var exam_m;

    var curr_hour_m = time.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    var curr_min = time.toLocaleString("en-US", {
      minute: "numeric",
      hour12: true,
    });
    var curr_hour = "";
    var ampm = "";
    for (var i = 0; i < curr_hour_m.length; i++) {
      if (
        curr_hour_m[i] !== "M" &&
        curr_hour_m[i] !== "P" &&
        curr_hour_m[i] !== "A" &&
        curr_hour_m[i] !== " "
      ) {
        curr_hour += curr_hour_m[i];
      } else if (curr_hour_m[i] === "A") ampm = "am";
      else if (curr_hour_m[i] === "P") ampm = "pm";
    }
    curr_hour = curr_hour.split(":")[0];
    console.log(curr_hour);
    console.log(curr_min);

    curr_hour = parseInt(curr_hour);
    curr_min = parseInt(curr_min);
    var examTime = exam["time"];
    for (var i = 0; i < examTime.length; i++) {
      if (examTime[i] !== "A" && examTime !== "P" && examTime !== " ") {
        exam_hr_min += examTime[i];
      } else if (examTime[i] === "A") {
        exam_m = "am";
      } else if (examTime[i] === "M") exam_m = "pm";
    }
    exam_hr = parseInt(exam_hr_min.split(":")[0]);
    exam_min = parseInt(exam_hr_min.split(":")[1]);
    console.log(exam_hr);
    console.log(exam_min);
    console.log(curr_hour);
    console.log(curr_min);
    console.log(exam_m);
    console.log(ampm);

    if (exam_m !== ampm) {
      // alert("Exam is not started yet !");
      location.replace("student_dashboard.html?question=1");
    } else if (exam_hr > curr_hour) {
      alert("Exam is not started yet !");
    } else {
      location.replace("student_dashboard.html?question=1");
    }
  });
}
