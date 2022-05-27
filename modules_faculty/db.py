from doctest import Example
from os import stat
import re
from unittest import result
from models_student.mcq import Mcq
from pymongo import MongoClient
from bson import ObjectId
from models_faculty.faculty import Faculty
from models_faculty.facultyExam import FacultyExam
from utility.logger import *
from utility.dayTime import *
from utility.dataUtil import formatYear
conn_string ="mongodb+srv://arclight:Qwerty1234@cluster0.59liy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
class Database:
    def __init__(self):
        self.establishConnection()
        super().__init__()
    conn_string = ''
 ##########################################################################################################################################
    def establishConnection(self):
        try:

            self.client = MongoClient(conn_string,tls=True,tlsAllowInvalidCertificates=True)
            self.mcqQuestionCollection = self.client.arclightDB.mcqQuestions
            self.studentCollection = self.client.arclightDB.students
            self.examCollection = self.client.arclightDB.exams
            self.mcqResponseCollection = self.client.arclightDB.mcqResponse
            self.facultyCollection =self.client.arclightDB.faculty
            self.resultsCollection = self.client.arclightDB.mcqResults


            #####abhi
            self.subjectiveQuestionCollection = self.client.arclightDB.subjectiveQuestions
            



            print('👉🏻 db connected ...📀')

        except Exception as e:
            logE('connection to db failed ')
            logE(e)

            

 ##########################################################################################################################################
        
    def authFaculty(self,email,password):
        try:
            # print("authing faculty")
            facultyDoc = self.facultyCollection.find_one({'email':email,'password':password})
            if facultyDoc != None:
                print('👉🏻 found faculty 🧑🏻‍💼 ',facultyDoc['name'],' ✅')

                faculty = Faculty(
                    id=facultyDoc['_id'],
                    name=facultyDoc['name'],
                    email=facultyDoc['email']
                )

                facultyObject = {
                    'id':str(facultyDoc['_id']),
                    'name':str(facultyDoc['name']),
                    'email':facultyDoc['email']
                }
                staticData.addFaculty(faculty=faculty,facultyObject=facultyObject)

                return True
            else: 
                print('👉🏻 No Faculty Found with provided email & password 🔴...',email,password)
                return False
            
        except Exception as e:
            print(e)
            return False
 ##########################################################################################################################################

    def getFaclutyExams(self):
        facultyId = str(staticData.faculty.id)
        try:
            # print(facultyId)
            allExams = self.examCollection.find({"faculty_id":facultyId})
            # allExams = self.examCollection.find()
            if allExams != None:
                logI('faculty exams found')

                facultyExams = []
                facultyExamsObjects = []
                for exam in allExams :
                    # print(exam)
                    thisExam = FacultyExam(
                        id=exam['_id'],
                        branch=exam['branch'],
                        exam_name=exam['exam_name'],
                        date=exam['date'],
                        time=exam['time'],
                        batch=exam['batch'],
                        course_code=exam['course_code'],
                        duration=exam['duration'],
                        faculty_id=exam['faculty_id'],
                        year=exam['year'],
                        end_time=exam['end_time']
                    )

                    thisExamObject ={
                        'id':str(exam['_id']),
                        'branch':exam['branch'],
                        'exam_name':exam['exam_name'],
                        'date':exam['date'],
                        'time':exam['time'],
                        'batch':exam['batch'],
                        'end_time':exam['end_time'],
                        'course_code':exam['course_code'],
                        'duration':exam['duration'],
                        'faculty_id':exam['faculty_id'],
                        'year' :formatYear(exam['year'])
                        
                    }
                    # print(thisExamObject)
                    facultyExams.append(thisExam)
                    facultyExamsObjects.append(thisExamObject)

                staticData.addFacultyExams(facultyExamList=facultyExams,facultyExamsObjectList=facultyExamsObjects)
                
                return facultyExamsObjects

            else:
                logW('no exams found ! ')

        except Exception as e:
            logE(e)
            
 ##########################################################################################################################################

    def createExam(self):
        facultyId = str(staticData.faculty.id)
        examInfo = staticData.examInfo
        try: 
            # print(facultyId)

            
            data = {
                'exam_name':examInfo.exam_name,
                'date':examInfo.date,
                'time':toFormatTime( examInfo.startTime),
                'end_time':toFormatTime(examInfo.endTime),
                'batch':examInfo.batches,
                'course_code':examInfo.subjectCode,
                'year':examInfo.year,
                'branch':'cse',
                'duration':'na',
                'faculty_id':facultyId          
            }

           
            id=self.examCollection.insert_one(data)
            id=id.inserted_id 
            
            questionData={
                'exam_id':str(id),
                'no_of_questions':'0',
                'questions':[]
                
            }

            self.mcqQuestionCollection.insert_one(questionData)
            self.subjectiveQuestionCollection.insert_one(questionData)

            staticData.examInfo.id = id

           
            logI('Exam saved to db')
            # print(questionData)
            return questionData
            
        except Exception as e:
            logE(e)
            
            
 ##########################################################################################################################################
 
    def getExamQuestions(self,exam_id):
        try:
            # logI('finding exam with id '+exam_id)
            allExamQuestions =  self.mcqQuestionCollection.find_one({'exam_id':str(exam_id)})
            # print(allExamQuestions)
            examQuestionsObjectList = []
            
            if allExamQuestions != None:

                    mcqs = []
                    mcqs_object = []
                    for mcq in allExamQuestions['questions']:

                        thisMcq = Mcq(
                            
                            question_no=mcq['question_no'],
                            question_text=mcq['question_text'],
                            option1=mcq['option1'],
                            option2=mcq['option2'],
                            option3=mcq['option3'],
                            option4=mcq['option4'],
                            question_id=str(mcq['question_id']),
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
                        mcqs_object.append(thisQuestion)
                        mcqs.append(thisMcq)
                    
                    examBson = {
                    'id':str(allExamQuestions['_id']),
                    'exam_id':allExamQuestions['exam_id'],
                    'no_of_questions':allExamQuestions['no_of_questions'],
                    'questions':mcqs_object
                            }
                    examQuestionsObjectList.append(examBson)
                    # print(examBson)
                    
                    return examBson
            else:
                logW('No Exam Question Found!')

                return {
                    "questions":[]
                }

        except Exception as e:
            logE('getExamQuestion: :')
            logE(e)
 
 ##########################################################################################################################################
 
 
    def addQuestion(self,exam_id,exam_info):
        try:
            # print(exam_id,exam_info)
            query  = { 'exam_id':str(exam_id)}

            alreadySavedQuestion = self.mcqQuestionCollection.find_one(query)
            if alreadySavedQuestion != None:
                length= len(alreadySavedQuestion['questions'])  + 1
                alreadySavedQuestion['questions'].append({
                    'question_no':str(length),
                    'question_text':exam_info['question_text'],
                    'option1':exam_info['option1'],
                    'option2':exam_info['option2'],
                    'option3':exam_info['option3'],
                    'option4':exam_info['option4'],
                    'correct_option':exam_info['correct_option'],
                    'question_id':ObjectId()
                })

                alreadySavedQuestion['no_of_questions'] =str(length)
            

                reponse = self.mcqQuestionCollection.update_one(query,{"$set":alreadySavedQuestion}, upsert=True)

                if reponse != None:
                    logI('addQuestion: added question')
                    return {
                        'success':True,
                        'msg':'Question Added Successfully'
                    }
                    
                else:
                    logW('addQuestion: error in updating')
                    return {
                        'success':False,
                        'msg':'Error adding question'
                    }



            else:

                    logW('addQuestion: No question with id found while adding question')
                    return {
                        'success':False,
                        'msg':'Oops! No exam found with this id'
                    }
                


        except Exception as e :
            logE('addQuestion: ')
            logE(e)
            return {
                        'success':False,
                        'msg':e
                    }
 ##########################################################################################################################################
 
    def addSubjectiveQuestion(self, exam_id, exam_info):
        try:
            # print(exam_id,exam_info)
            query  = { 'exam_id':str(exam_id)}

            alreadySavedQuestion = self.subjectiveQuestionCollection.find_one(query)
            if alreadySavedQuestion != None:
                length= len(alreadySavedQuestion['questions'])  + 1
                alreadySavedQuestion['questions'].append({
                    'question_no':str(length),
                    'subjective_question_text':exam_info['subjective_question_text'],
                    'sample_answer_text':exam_info['sample_answer_text'] 
                })

                alreadySavedQuestion['no_of_questions'] =str(length)
            

                reponse = self.subjectiveQuestionCollection.update_one(query,{"$set":alreadySavedQuestion}, upsert=True)

                if reponse != None:
                    logI('addQuestion: added question')
                    return {
                        'success':True,
                        'msg':'Question Added Successfully'
                    }
                    
                else:
                    logW('addQuestion: error in updating')
                    return {
                        'success':False,
                        'msg':'Error adding question'
                    }



            else:

                    logW('addQuestion: No question with id found while adding question')
                    return {
                        'success':False,
                        'msg':'Oops! No exam found with this id'
                    }
                


        except Exception as e :
            logE('addQuestion: ')
            logE(e)
            return {
                        'success':False,
                        'msg':e
                    }
 
 
 ##########################################################################################################################################

    def deleteQuestion(self,exam_id,question_id):

        logW('trying to delete question with id : '+exam_id)

        try:
           questionOfExam =  self.mcqQuestionCollection.find_one({'exam_id':exam_id})
           if questionOfExam!=None:
                allQuestions = questionOfExam['questions']
                updatedQuestion = []

                for question in allQuestions:
                    if str(question['question_id']) != str(question_id):
                        updatedQuestion.append(question)
                questionOfExam['questions'] = updatedQuestion
                questionOfExam['no_of_questions'] = len(updatedQuestion)
                query = {'exam_id':exam_id}
                self.mcqQuestionCollection.update_one(query,{"$set":questionOfExam}, upsert=True)
                logI('deleteQuestion: question deleted successfully')
                return {
                    'success':True,
                    'msg':'Deleted..'
                }
                

           else:
               logW('DeleteQuestion: No question found ')
               return {
                    'success':False,
                    'msg':'Question not found..'
                }
               

        except Exception as e:
            logE('deleteQuestion: ')
            logE(e)
            return {
                    'success':False,
                    'msg':e
                }

    def deleteExam(self,exam_id):
        try:
            self.mcqQuestionCollection.delete_one({'exam_id':exam_id})
            logW('deleted quesions of exam')
            result = self.examCollection.delete_one({'_id':ObjectId(exam_id)})
            if result.deleted_count == 0 :
                logW('no exam found')
            else:
                logW('deleted exam after deleting questions')
            return True
        except Exception as e:
            print(e)
            return False





    def getAllStudentResult(self,exam_id):

        try:    
            print(exam_id)

            result = self.resultsCollection.find({'exam_id':str(exam_id)})
            allStudentData = []
            if result != None:
                for studentResultData in result:
                    allStudentData.append(studentResultData)
            
                return allStudentData

            else:
                logW('No result found, Exam might not be conducted ')


        except Exception as E:
            print(e)


class StaticData:
    def __init__(self):
        self.faculty=None
        self.facultyObject = None
        self.facultyExams = None
        self.facultyExamsObjectList = None
        self.examInfo = None
        self.examInfoObject = None

        pass

    def addFaculty(self,faculty,facultyObject):
       self.faculty  = faculty
       self.facultyObject  = facultyObject

    def addFacultyExams(self,facultyExamList,facultyExamsObjectList):
        self.facultyExams = facultyExamList
        self.facultyExamsObjectList = facultyExamsObjectList


    def addExamInfo(self,examInfo,examInfoObejct):
        self.examInfo = examInfo
        self.examInfoObject = examInfoObejct

db = Database()
staticData = StaticData()