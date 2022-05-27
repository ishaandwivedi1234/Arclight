from os import stat
from unicodedata import name
from pymongo import MongoClient
from models_student.mcq import ExamQuestions, Mcq
from models_student.mcqResponse import McqResponse
from models_student.result import Result
from models_student.student import Student
from datetime import date
import time
from models_student.exam import Exam
from data import max_col,max_row
from bson.objectid import ObjectId
import json
conn_string ="mongodb+srv://arclight:Qwerty1234@cluster0.59liy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
class Database:
    def __init__(self):
        self.establishConnection()
        super().__init__()

 ##########################################################################################################################################
    def establishConnection(self):
        try:
            self.client = MongoClient(conn_string,tls=True,tlsAllowInvalidCertificates=True)
            self.mcqQuestionCollection = self.client.arclightDB.mcqQuestions
            self.studentCollection = self.client.arclightDB.students
            self.examCollection = self.client.arclightDB.exams
            self.mcqResponseCollection = self.client.arclightDB.mcqResponse
            self.resultsCollection = self.client.arclightDB.mcqResults

            print('👉🏻 db connected ...📀')

        except Exception as e:
            print(e)
            print('connection to db failed ❌ ... ')

 ##########################################################################################################################################

    def getMcqQuestions(self):
        try:

            exam = staticData.exam
            # print('👉🏻 Fetching question with exam id : ',exam.id)
            data = self.mcqQuestionCollection.find_one({'exam_id':str(exam.id)}) 
            # data = self.mcqQuestionCollection.find_one({})
            # print(data)
            mcqs = []
            questions = []
            if data != None:
                for mcq in data['questions']:
                    thisMcq = Mcq(
                        question_no=mcq['question_no'],
                        question_text=mcq['question_text'],
                        option1=mcq['option1'],
                        option2=mcq['option2'],
                        option3=mcq['option3'],
                        option4=mcq['option4'],
                        question_id=mcq['question_id'],
                        correct_option=mcq['correct_option']
                    )

                    thisQuestion = {
                        'question_no':thisMcq.question_no,
                        'question_text':thisMcq.question_text,
                        'option1':thisMcq.option1,
                        'option2':thisMcq.option2,
                        'option3':thisMcq.option3,
                        'option4':thisMcq.option4,
                        'correct_option':thisMcq.correct_option,
                        'question_id':thisMcq.question_id,
                    }
                    thisResultQuestions = {
                        'question_no':thisMcq.question_no,
                        'question_text':thisMcq.question_text,
                        'option1':thisMcq.option1,
                        'option2':thisMcq.option2,
                        'option3':thisMcq.option3,
                        'option4':thisMcq.option4,
                        'correct_option':thisMcq.correct_option,
                        'question_id':str(thisMcq.question_id),
                        'chosen_option':'',
                        'is_correct':False,
                        'response_count':0
                    }
                    hasAlready = False
                    alreadySavedQuestionForResult = staticData.result.questionResponse 
                    for qn in alreadySavedQuestionForResult: 
                        if qn['question_no'] == thisResultQuestions['question_no']: 
                            hasAlready = True 
                    if not hasAlready : 
                        staticData.result.questionResponse.append(thisResultQuestions)    

                    questions.append(thisQuestion)
                    mcqs.append(thisMcq)


                        
                examQuestions = ExamQuestions(
                    id=data['_id'],
                    exam_id=data['exam_id'],
                    no_of_questions=data['no_of_questions'],
                    list_of_questions=mcqs
                )

                    

                staticData.addExamQuestions(examQuestion=examQuestions)

                examJson = {
                    'id':examQuestions.id,
                    'exam_id':examQuestions.exam_id,
                    'no_of_questions':examQuestions.no_of_questions,
                    'questions':questions
                }
                # print('👉🏻 exam question fetched & stored locally ✅')
                # print(examJson)
                # print(staticData.result.questionResponse)
                return examJson

            else:
                print('👉🏻 No questions found ❌')

        except Exception as e:
                print('👉🏻 in getMCQ quesions',e)
 ##########################################################################################################################################

    def addMcqResponse(self,response):
        try:
            self.mcqQuestionCollection.insert_one(response)
            print('👉🏻 pached response to database ✅ ')
        except Exception as e:
            print('👉🏻 patching MCQ response failed ... ❌')
            print(e)
 ##########################################################################################################################################
        
    def authStudent(self,enrollment,password):
        try:
            studentDoc = self.studentCollection.find_one({'en':enrollment,'password':password})
            if studentDoc != None:
                print('👉🏻 found student 🧑🏻‍💼 ',studentDoc['name'],' ✅')

                student = Student(
                    id=studentDoc['_id'],
                    name=studentDoc['name'],
                    batch=studentDoc['batch'],
                    branch=studentDoc['branch'],
                    en =studentDoc['en'],
                    semester=studentDoc['semester'],
                    email=studentDoc['email']
                )
                staticData.addStudent(student=student)

                result = Result(
                    student_id=str(student.id),
                    student_name=student.name,
                    en_no=student.en,
                    questionResponse=[],
                    exam_id=''
                )
                staticData.addResult(result=result)
                return True
            else: 
                return False
            
        except Exception as e:
            print(e)
            return False
 ##########################################################################################################################################

    def getExamInfo(self,student):
        todays_date = date.today()
        todays_date = todays_date.strftime("%Y-%m-%d")
        # print(type(todays_date),'today date')
        current_time = time.time()
        print('👉🏻 current date : ',todays_date,' 📅')
        print('👉🏻 current time : ',current_time ,' ⏰')
        
        try:
            upcomming_exam  = self.examCollection.find_one({
                'date':str(todays_date),
            })
            # print(upcomming_exam,'upcomming')
            print('👉🏻 exam found : ',upcomming_exam['exam_name'],' ✅')
               
            if upcomming_exam == None  or todays_date!=upcomming_exam['date'] :
            # or str(current_time) < str(upcomming_exam['time']):
            # or str(current_time) < str(upcomming_exam['time'])
                print('exam no exam ')
                return {'exam':False}
            else:
                exam = Exam(
                    id=upcomming_exam['_id'],
                    branch=upcomming_exam['branch'],
                    exam_name=upcomming_exam['exam_name'],
                    date=upcomming_exam['date'],
                    time=upcomming_exam['time'],
                    batch=upcomming_exam['batch'],
                    course_code=upcomming_exam['course_code'],
                    duration=upcomming_exam['duration'],
                    end_time=upcomming_exam['end_time'],
                    submitted=upcomming_exam['submitted']
                   )
                staticData.addExam(exam)
                staticData.result.exam_id=str(exam.id)


                return {
                    'exam':True,
                    'id':exam.id,
                    'student_name':student.name,
                    'exam_name':exam.exam_name,
                    'date':exam.date,
                    'time':exam.branch,
                    'batch':exam.batch,
                    'course_code':exam.course_code,
                    'duration':exam.duration,
                    'end_time':exam.end_time,
                    'submitted':exam.submitted
                    
                    
                }

        except Exception as e:


            print(e)
            return {'exam':False}

 ##########################################################################################################################################

    def getMcqResponse(self):

        student = staticData.student
        exam = staticData.exam
        # print('student id: ',student.id,' exam id ',exam.id)
        try :
            # data = self.mcqResponseCollection.find_one()
            data = self.mcqResponseCollection.find({'student_id':str(student.id),'exam_id':str(exam.id)})
            # print(data)
            info= { 
                        'mcqResponse':[],
                        'revisited':staticData.revisited,
                        'list_of_done':staticData.list_of_done,
                        'max_col':max_col,
                        'max_rows':max_row
                  }
            if data != None:
                mcqResponse = []
                mcqResponseObject =[]
                for response in data:
                    thisResponse = McqResponse(
                        student_id=response['student_id'],
                        question_id=response['question_id'],
                        question_no=response['question_no'],
                        chosen_option=response['chosen_option'],
                        exam_id=response['exam_id']
                    )

                    thismcqResponseObject = {
                        'student_id':response['student_id'],
                        'question_id':response['question_id'],
                        'question_no':response['question_no'],
                        'chosen_option':response['chosen_option'],
                        'exam_id':response['exam_id'],
                        
                    }


                    mcqResponseObject.append(thismcqResponseObject)

                    mcqResponse.append(thisResponse)

                    for question in mcqResponseObject:
                        staticData.addDoneQuestion(question_no=question['question_no'])

                    info['mcqResponse'] =mcqResponseObject
                    

                staticData.addResponseList(mcqResponse)
                # print(mcqResponseObject)
                    
                return info



        except Exception as e :
            

            print('Mcq Response : ',e,'❌')

 ##########################################################################################################################################
   
    def saveMcqResoonse(self,question_no,chosen_option,question_id,isCorrect):
        student  = staticData.student
        exam = staticData.exam
        # print('searching for : question Id : ',question_id)
        try:
            query  = { 'exam_id':str(exam.id),'student_id':str(student.id),'question_no':str(question_no)}
            alreadySavedResponse = self.mcqResponseCollection.find_one(query)
            

            savedResponseData = {
                    'student_id':str(student.id),
                    'exam_id':str(exam.id),
                    'question_id':str(question_id),
                    'chosen_option':str(chosen_option),
                    'question_no':str(question_no)
                }


            if alreadySavedResponse == None:
                self.mcqResponseCollection.insert_one(savedResponseData)
                print('👉🏻 saved new response data...  ✅')
            else:
                
                
                self.mcqResponseCollection.update_one(query,{"$set":savedResponseData}, upsert=True)
                print('👉🏻 patched new response data... ✅')

            for qn in staticData.result.questionResponse:
                if str(qn['question_no']) == str(question_no):
                    qn['chosen_option'] = str(chosen_option)
                    qn['is_correct']  = isCorrect
                    qn['response_count'] = qn['response_count'] + 1
                    print(qn)
                    break


        except Exception as e:

            print('Save Mcq Response : ',e,'❌')
            

 ##########################################################################################################################################
 
    def endExam(self):
        try:
            exam_id = staticData.exam.id
            # print(exam_id)
            exam = self.examCollection.find_one({'_id':exam_id})
            if exam != None:
                # print(exam)
                
                alreadySumbitted = exam['submitted']
                # print(alreadySumbitted)
                
                alreadySumbitted.append(str(staticData.student.id))
                # {
                #     'student_name':student_name,
                #     'en_no':en_no,
                #     'mark_obtained':
                # }
                updated_data  = {
                   
                    '_id': exam['_id'],
                     'exam_name': exam['exam_name'],
                      'date':  exam['date'],
                       'time':  exam['time'],
                        'end_time':  exam['end_time'],
                         'batch':  exam['batch'],
                          'course_code':  exam['course_code'],
                           'year':  exam['year'],
                            'branch':  exam['branch'], 
                            'duration':  exam['duration'],
                             'faculty_id':  exam['faculty_id'], 
                             'submitted': alreadySumbitted,
                             'responses':[]
                             
                }

                result = staticData.result
                resultData = {

                    'student_name':result.student_name,
                    'en_no':result.en_no,
                    'exam_id':result.exam_id,
                    'student_id':result.student_id,
                    'question_response':result.questionResponse
                }
                # print(resultData)


                self.resultsCollection.insert_one(resultData)
                self.examCollection.update_one({'_id':ObjectId(exam_id)},{"$set":updated_data}, upsert=True)
                # print('updated submitted')
                print('👉🏻 Submitted & ended the exam: Closing mainapp...  ✅')


                return True
        except Exception as e:

            print('End Exam: ',e,'❌')
            return False
 
 ##########################################################################################################################################

class StaticData:
    def __init__(self):
        self.student = None
        self.exam = None
        self.examQuestion = None
        self.responseList = None
        self.revisited = []
        self.list_of_done=[]
        self.result = None
        self.AppRunning = True
        pass

    def addToRevisited(self,question_no):
        self.revisited.append(question_no)

    def addDoneQuestion(self,question_no):
        if self.list_of_done.count(question_no) == 0 :
            self.list_of_done.append(question_no)

    def addStudent(self,student):
        self.student = student

    def addExam(self,exam):
        self.exam = exam
        
    def addExamQuestions(self,examQuestion):
        self.examQuestion = examQuestion

    def addResponseList(self,responseList):
        self.responseList = responseList

    def addResult(self,result):
        self.result = result

db = Database()
staticData = StaticData()