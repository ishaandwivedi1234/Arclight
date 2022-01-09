import eel
from static.models.exam import Exam
from static.modules.db import db,staticData


class ExamHelper:

    staticData = staticData
    database = db
   

    @staticmethod
    @eel.expose

    def getExamInfo():
        student = ExamHelper.staticData.student
        return ExamHelper.database.getExamInfo(student)
    
    
    @staticmethod
    @eel.expose

    def getExamQuestions():
      return ExamHelper.database.getMcqQuestions()

    @staticmethod
    @eel.expose
    def getMcqResponse():
        return ExamHelper.database.getMcqResponse()
        
    
    @staticmethod
    @eel.expose()
    
    def getNoOfQuestions():
      return ExamHelper.staticData.examQuestion.no_of_questions


    @staticmethod
    @eel.expose()
    
    def getDoneList():
      return ExamHelper.staticData.examQuestion.no_of_questions

    
    
    


    @staticmethod
    @eel.expose
    def setRevisit(question_no):
      if staticData.revisited.count(question_no) == 0 :
        staticData.addToRevisited(question_no)
        print('👉🏻 quesion no ',question_no,' marked revisit 🟡 ')

    @staticmethod
    @eel.expose
    def unSetRevisit(question_no):
      if staticData.revisited.count(question_no) != 0 :
        staticData.revisited.remove(question_no)
        print('👉🏻 quesion no ',question_no,' un marked revisit 🟢')
    
    
    # Poster function for patching mcq response 
    @staticmethod
    @eel.expose
    def saveMcqResponse(question_no,chosen_option):
    
      for question  in staticData.examQuestion.list_of_question:
        if str(question.question_no) == str(question_no):
          print('exam qustion found ')

          thisQuestion = question
          question_id = thisQuestion.question_id
          ExamHelper.database.saveMcqResoonse(question_id=question_id,chosen_option=chosen_option,question_no=question_no)
          return
          
      
      
      
      
      
      
      
#  _id
# :
# 61d92851400cb4b882ee5b44
# student_id
# :
# "61d5eb0e454c11e44301ca44"
# question_id
# :
# "61d929a5400cb4b882ee5b46"
# question_no
# :
# "2"
# exam_id
# :
# "61d5ebac454c11e44301ca45"
# chosen_option
# :
# "2"