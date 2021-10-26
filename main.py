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
	return questions,current_question,answers



@eel.expose
def saveAnswers(question_index,ans):
	answers[question_index] = ans


@eel.expose
def setTimer():
	return month,day,year,time


eel.start( 'templates/splashscreen.html',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)

while True:
	eel.sleep(1.0)
