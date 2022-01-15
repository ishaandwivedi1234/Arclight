class McqResponse:
    def __init__(self,student_id,question_id,question_no,chosen_option,exam_id):
        self.student_id = student_id
        self.question_id = question_id
        self.question_no = question_no
        self.chosen_option = chosen_option
        self.exam_id  = exam_id

        