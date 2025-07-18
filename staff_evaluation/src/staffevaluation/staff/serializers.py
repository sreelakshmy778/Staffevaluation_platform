from rest_framework import serializers
from django.contrib.auth.models import User
from . models import UserData
from . models import LeaveRequest
from . models import Request
from . models import Evaluation
from . models import TaskAssignment
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . models import Attendance



class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)
    position=serializers.CharField(write_only=True)
    phone=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=('username','role','email','password','first_name','position','phone')
        extra_kwargs={'password':{'write_only':True}}


    def create(self,validated_data):
            role=validated_data.pop('role')
            position = validated_data.pop('position')
            phone = validated_data.pop('phone')

            user=User.objects.create_user(
                first_name=validated_data['first_name'],
                username=validated_data['username'],
                # role=validate_data['role'],
                email=validated_data['email'],
                password=validated_data['password']
                


            )
            UserData.objects.create(user=user, role=role,position=position,phone=phone)  # Link user with role
            return user
    
# evaluation........................................................................................


class EvaluationSerializer(serializers.ModelSerializer):
     evaluater_name=serializers.ReadOnlyField(source='evaluater.username')
     evaluatee_name=serializers.ReadOnlyField(source='evaluatee.username')
     evaluater_role = serializers.CharField(source='evaluater.userdata.role', read_only=True)

     class Meta:
          model=Evaluation
          fields=['id','evaluater','evaluater_name','evaluatee','evaluatee_name','career_score','attendance_score','comment','creation','evaluater_role']
          read_only_fields = ['evaluater','creation','taskperform_score','teamwork_score','communication_score','evaluater_role']


class TeamEvaluaterSerializer(serializers.ModelSerializer):
     # evaluater_name = serializers.ReadOnlyField(source='evaluater.username')
     evaluater_role = serializers.CharField(source='evaluater.userdata.role', read_only=True)
     class Meta:
          model=Evaluation
          fields=['id','comment','creation','taskperform_score','teamwork_score','communication_score','evaluatee','evaluater','evaluatee','evaluater_role']
          read_only_fields=['career_score', 'attendance_score', 'evaluater',  'creation','evaluater_role']


class HrTeamEvaluationSerializer(serializers.ModelSerializer):
     evaluater_name = serializers.CharField(source='evaluater.userdata.position', read_only=True)
     evaluatee_name = serializers.CharField(source='evaluater.position', read_only=True)
     class Meta:
          model=Evaluation
          fields=['id','comment','creation','leadership_score','employeedevlopment_score','communication_score','evaluatee','evaluater','evaluatee_name','evaluater_name']
          read_only_fields=['evaluater']
 
# leave//////////////////////////////////////////////////////////////////

class LeaveSerializer(serializers.ModelSerializer):
     username=serializers.CharField(source='user.username',read_only=True)
     
     class Meta:
          model=LeaveRequest
          fields=['id','user','username','reason','from_date','due_date','status']
          read_only_fields=['user']


# Task create....................................................................


class TaskSerializer(serializers.ModelSerializer):
     username = serializers.CharField(source='user.username', read_only=True)
     staffname=serializers.CharField(source='staff.username',read_only=True)
     class Meta:
          model=TaskAssignment
          fields=['id','title','detail','due_date','username','staffname','staff','current_date','status','is_new']
          

class UserTaskSerializer(serializers.ModelSerializer):
     class Meta:
          model=User
          fields=['id','username']


# Token Obtains.................................................................
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add role from linked user data
        data['role'] = self.user.userdata.role  # Adjust if you store it differently
        data['user_id']=self.user.id

        return data
    


class AdminSerializer(serializers.ModelSerializer):
     role = serializers.CharField(source='userdata.role')
     position=serializers.CharField(source='userdata.position')
     phone=serializers.CharField(source='userdata.phone')
     class Meta:
          model=User
          fields=['id', 'username', 'email', 'is_staff', 'is_superuser','role','password','position','phone','first_name']

     def update(self, instance, validated_data):
        # Pop nested userdata data safely
        userdata_data = validated_data.pop('userdata', {})

        # Update User fields
        for attr, value in validated_data.items():
            if attr == 'password':
                if value:
                    instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()

        # Update related UserData fields
        userdata = instance.userdata
        for attr, value in userdata_data.items():
            if value is not None:
                setattr(userdata, attr, value)
        userdata.save()

        return instance
     

# Request...............................................................

class RequestSerializer(serializers.ModelSerializer):
     class Meta:
          model=Request
          fields=['title','description']
 
 
 
 # Attendance...............................................................

class AttendanceSerializer(serializers.ModelSerializer):
     user_name = serializers.CharField(source='user.username', read_only=True)
    
     class Meta:
          model=Attendance
          fields=['user','date','is_present','user_name']
          read_only_fields=['user','user_name']
          
          
          