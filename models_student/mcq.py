class Mcq:
    def __init__(self,question_no,question_id,question_text,option1,option2,option3,option4,correct_option):
        self.question_no = question_no
        self.question_text = question_text
        self.option1 = option1
        self.option2 = option2
        self.option3 = option3
        self.question_id=question_id
        self.option4 = option4
        self.correct_option = correct_option
        


class ExamQuestions:

        def __init__(self,id,exam_id,no_of_questions,list_of_questions):

            self.id = id
            self.exam_id = exam_id
            self.no_of_questions = no_of_questions
            self.list_of_question = list_of_questions

        def getExamJson(self):
            mcqs = []
            for mcq in self.list_of_question:
                thisMcq = {
                    'question_no':mcq.question_no,
                    'question_id':mcq.question_id,
                    'question_text':mcq.question_text,
                    'option1':mcq.option1,
                    'option2':mcq.option2,
                    'option3':mcq.option3,
                    'option4':mcq.option4,
                    'correct_option':mcq.correct_option
                }

                mcqs.append(thisMcq)

                thisQuestion = {
                    'id':self.id,
                    'exam_id':self.exam_id,
                    'no_of_questions':self.no_of_questions,
                    'questions':mcqs

                }

                return thisQuestion
        

