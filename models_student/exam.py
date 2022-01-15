class Exam:
    def __init__(self,id,branch, exam_name, date,time, batch,course_code,duration,end_time,submitted):
        self.id = id
        self.branch = branch
        self.exam_name = exam_name
        self.date = date
        self.time = time
        self.batch = batch
        self.duration = duration
        self.course_code = course_code
        self.end_time=end_time
        self.submitted = submitted

