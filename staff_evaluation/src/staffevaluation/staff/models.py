from django.db import models

from django.contrib.auth.models import User
# Create your models here.



class UserData(models.Model):
    ROLE_CHOICES = [
         ('admin','Admin'),
        ('HR', 'HR'),
        ('Manager', 'Manager'),
        ('TeamLead', 'Team Lead'),
        ('Staff', 'Staff'),
    ]
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES) 
    phone=models.CharField(max_length=30,default='N/A')  
    position=models.CharField(max_length=30,default='N/A')  

    def __str__(self):
        return f"{self.user.username} - {self.role} - {self.position} - {self.phone}"
    
class Evaluation(models.Model):
    evaluater=models.ForeignKey(User,related_name='evaluation_given',on_delete=models.CASCADE)
    evaluatee=models.ForeignKey(User,related_name="evaluation_received",on_delete=models.CASCADE)
    career_score = models.IntegerField(default=0)
    attendance_score = models.IntegerField(default=0)

    taskperform_score=models.IntegerField(default=0)
    communication_score=models.IntegerField(default=0)
    teamwork_score=models.IntegerField(default=0)
    
    employeedevlopment_score=models.IntegerField(default=0)
    leadership_score=models.IntegerField(default=0)


    comment=models.TextField(blank=True)
    creation=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        creation_str = self.creation.strftime('%Y-%m-%d %H:%M') if self.creation else "No Date"
        return f"{self.evaluater.username} → {self.evaluatee.username} on {creation_str}"



class LeaveRequest(models.Model):
    STATUS_CHOICES=[
       
        ('Pending','Pending'),
        ('Approved','Approved'),
        ('Rejected','Rejected')
    ]
    user=models.ForeignKey(User,related_name='leaverequest_given',on_delete=models.CASCADE)
    reason=models.TextField()
    from_date=models.DateField()
    due_date=models.DateField()
    status=models.CharField(max_length=15,choices=STATUS_CHOICES,blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} | {self.from_date} | {self.due_date}"



class TaskAssignment(models.Model):
    STATUS=[
        ("Completed","Completed"),
        ("In Progress","In Progress"),
        ("Pending","Pending" )
    ]
    user=models.ForeignKey(User,related_name="task_assignment",on_delete=models.CASCADE)
    staff = models.ForeignKey(User, related_name="assigned_to", on_delete=models.CASCADE, null=True, blank=True)
    # staff=models.ForeignKey(User, related_name="assigned_to", on_delete=models.CASCADE,null=True,blank=True)
  
    title=models.CharField(max_length=20)
    detail=models.TextField()
    current_date=models.DateTimeField(auto_now_add=True)
    due_date=models.DateField()
    status=models.CharField(max_length=25,choices=STATUS,default='Pending')
    is_new = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} |{self.title} |{self.due_date} {self.status}"
    


class Request(models.Model):
    user=models.ForeignKey(User,related_name="request",on_delete=models.CASCADE)
    title=models.CharField(max_length=30)
    description=models.TextField()

    def __str__(self):
        return f"{self.title}-{self.description}"


class Attendance(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="attendence",default=1)
    date=models.DateField(auto_now_add=True)
    is_present = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'date')

    def __str__(self):
     username = self.user.username if self.user else "NoUser"
     return f"{username}-{self.date}-{self.is_present}"