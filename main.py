from os import stat
import eel
from data import * 
from static.modules.db import db,staticData
from static.modules.examHelper import ExamHelper
from static.modules.localStorage import LocalStorage
from static.modules.loginStudent import *
from static.modules.questionPannel import QuestionPannel
studentAuth = StudentAuth()
exam = ExamHelper()
localStorage = LocalStorage()
questionPannel = QuestionPannel()
def initProject():
	db.getMcqQuestions()


eel.init("static")  
# test function 

@eel.expose
def clientResponse():
	print('Question screen : Activated 🚀')

# initialize questions 
@eel.expose
def setRowCol():
	return max_col,max_row,number_of_questions,list_of_done,revisit


@eel.expose
def initQuestions():
	return mcq_questions,current_question,mcq_answers,revisit


@eel.expose
def initMcqOptions():
	return options


@eel.expose
def saveAnswers(question_index,ans):
	answers[question_index] = ans

@eel.expose
def setRevisit(question_index):
	revisit.append(question_index)
	print(revisit)
@eel.expose
def setUnRevisit(question_no):
	revisit.remove(question_no)
	print(revisit)
@eel.expose
def setTimer():
	return month,day,year,time
@eel.expose
def getRevisitList():
	return revisit
@eel.expose 
def getDoneList():
	return list_of_done

@eel.expose
def getQuestionList():
	return mcq_questions


@eel.expose
def getMcqQuestion():
	return mcq_questions




@eel.expose 
def saveMcqResponse(answer_info):
	ans = {
		'question_no':answer_info['question_no'],
		'chosen_option':answer_info['option'],
		'value':answer_info['value'],
		'student_id':'1'
	}
	print(ans)
	# mcq_answers.append(ans)
	# if list_of_done.count(ans['question_no']) == 0 :
	# 	list_of_done.append(ans['question_no'])
# 
	# print(ans)
	# db.addMcqResponse(ans)
	print('answer saved')
	
@eel.expose
def goToPersonalPage():
	eel.start( 'templates/personal.html',block = False)




# initProject()
# eel.start( 'templates/student_dashboard.html?question=1',block=False)
eel.start( 'templates/login.html')

# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)

while True:
	eel.sleep(1.0)
