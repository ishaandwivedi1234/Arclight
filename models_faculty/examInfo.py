class ExamInfo:
    def __init__(self,id,examName,startTime,endTime,date,batches,subjectCode,year):
        self.id=id
        self.exam_name = examName
        self.startTime = startTime
        self.date = date
        self.endTime = endTime
        self.batches=batches
        self.subjectCode = subjectCode
        self.year = year
        pass
        