import eel
from models_student.exam import Exam
from modules_student.db import db,staticData
from datetime import datetime,timedelta

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
    @eel.expose()
    
    def stopApp():
       ExamHelper.staticData.AppRunning = False

    
    @staticmethod
    @eel.expose()
    
    def getFinishingInfo():
      info = {
        'solved':len(ExamHelper.staticData.responseList),
        'revisited':len(ExamHelper.staticData.revisited),
        'total':ExamHelper.staticData.examQuestion.no_of_questions
      }
      return info

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
          # print('exam qustion found ')

          thisQuestion = question
          question_id = thisQuestion.question_id
          isCorrect = int(thisQuestion.correct_option)==int(chosen_option)
          ExamHelper.database.saveMcqResoonse(question_id=question_id,chosen_option=chosen_option,question_no=question_no,isCorrect=isCorrect)
          return
          
    @staticmethod
    @eel.expose
    def endExam():
      # print('ending exam')
      return ExamHelper.database.endExam()
      
    @staticmethod
    @eel.expose
    def getTimeData():
      date = ExamHelper.staticData.exam.date
      time = ExamHelper.staticData.exam.time
      # print(time)
      # print(date)
      dateComponent = date.split('-')
      day = dateComponent[2]
      month = dateComponent[1]
      year = dateComponent[0]
      end_time = ExamHelper.staticData.exam.end_time
      # print(end_time)

      return {
        'date':date,
        'month':month,
        'day':day,
        'year':year,
        'time_of_end':end_time
      }
      
      
      
  