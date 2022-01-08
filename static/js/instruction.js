function startExam() {
  eel.getExamFromLocalStorage()(function (exam) {
    if (exam["time"] <= Date.now()) {
      console.log(exam["time"]);
      console.log(Date.now());
      location.replace("student_dashboard.html?question=1");
    } else alert("Exam is not started yet !");
  });
}
