
from datetime import datetime
from doctest import OutputChecker

def toFormatTime(time):
    hrsMins = time.split(':')
    hrs = int(hrsMins[0])
    min = int(hrsMins[1])
    ampm = ''
    if hrs == 12:
        ampm = 'PM'
    elif hrs >= 13 :
        hrs = abs(hrs - 12)
        ampm = 'PM'

    else:
        ampm='AM'

    if hrs == 0 :
        fTime = '00:'+str(min)+' '+ampm
        return fTime
    else:
        fTime =str(hrs )+":"+str(min)+' '+ampm
        return fTime


    

def formatToTime(time):
    dTime = ''
    ampm = ''
    for c in time:
        if c!=' ' and  c != 'A' and c!= 'P' and c!= 'M':
            dTime+=c
        elif c== 'A':
            ampm = "am"
        elif c == 'P':
            ampm = 'pm'

    hrsMin = dTime.split(':')
    print(hrsMin)
    hrs = hrsMin[0]
    min = hrsMin[1]

    if ampm == "pm":
        hour = int(hrs)
        minutes = int(min)

        hour += 12
        hrsMin=str(hour)+':'+str(minutes)
    


    
    return hrsMin



def tweleveToTwentyfour(time):
    try:

        in_time = datetime.strptime(time, "%I:%M %p")
        out_time = datetime.strftime(in_time, "%H:%M")
        return out_time
    except Exception as e:
    
        return time