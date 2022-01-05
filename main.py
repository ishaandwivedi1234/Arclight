import eel
from data import * 


  
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
	return questions,current_question,answers,revisit


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
	return questions

eel.start( 'templates/student_dashboard.html',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)

while True:
	eel.sleep(1.0)
