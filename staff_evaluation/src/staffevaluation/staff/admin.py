from django.contrib import admin
from . models import UserData
from . models import Evaluation
from . models import TaskAssignment
from . models import Attendance
from . models import Request
# Register your models here.
admin.site.register(UserData)
admin.site.register(Evaluation)
admin.site.register(TaskAssignment)
admin.site.register(Attendance)
admin.site.register(Request)