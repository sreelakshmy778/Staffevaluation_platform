from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from .serializers import EvaluationSerializer
from . serializers import LeaveSerializer
from . serializers import TaskSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from . serializers import AdminSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from .serializers import AdminSerializer
from rest_framework.generics import ListAPIView
from . models import LeaveRequest
from rest_framework.generics import RetrieveUpdateAPIView
from  . models import Evaluation
from . serializers import UserTaskSerializer
from rest_framework import generics
from . models import TaskAssignment
from . serializers import RequestSerializer
from . models import Request
from . serializers import TeamEvaluaterSerializer
from . serializers import HrTeamEvaluationSerializer
from . serializers import AttendanceSerializer
from . models import Attendance


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# evaluation views......................

class EvaluationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EvaluationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(evaluater=request.user)  # Set the logged-in user as evaluator
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class EvaluationView(ListAPIView):
    
    serializer_class=EvaluationSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return Evaluation.objects.filter(evaluatee=self.request.user).order_by('-creation')

class TeamEvaluaterView(APIView):
    # serializer_class=TeamEvaluaterSerializer
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        serializer=TeamEvaluaterSerializer(data=request.data,many=True)
        if serializer.is_valid():
            serializer.save(evaluater=request.user)# Set the logged-in user as evaluator
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
   

class TeamLeadEvaluationsView(ListAPIView):
    serializer_class = TeamEvaluaterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Evaluation.objects.filter(
            evaluatee=self.request.user,
            evaluater__userdata__role='TeamLeader'  # Or adjust to 'Team Lead' if that's in your DB
        ).order_by('-creation')
        
        print("✅ Evaluations by TeamLead for current user:", queryset)
        print("👤 Current user:", self.request.user.username)
        print("📋 All Evaluation records:")

        for e in Evaluation.objects.all():
            print(
                f"Evaluatee: {e.evaluatee.username}, "
                f"Evaluater: {e.evaluater.username}, "
                f"Role: {e.evaluater.userdata.role}"
            )

        return queryset



class HrTeamEvaluaterView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=HrTeamEvaluationSerializer(data=request.data,many=True)
        if serializer.is_valid():
            serializer.save(evaluater=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class HREvaluatedTeamView(ListAPIView):
    serializer_class = HrTeamEvaluationSerializer

    def get_queryset(self):
     return Evaluation.objects.filter(evaluatee=self.request.user)

   
   
   # Le
   
   # Leave viwes............................

class LeaveView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):

        serializer=LeaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    

# Task Creating.....................................................................
class TaskViewSets(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        serializer=TaskSerializer(data=request.data)
        if serializer.is_valid():
            task=serializer.save(user=request.user)
            return Response({
                "message": "Task assigned successfully!",
                "task": TaskSerializer(task).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UserTaskView(ListAPIView):   #username getting in for team lead
    queryset=User.objects.all()
    serializer_class=UserTaskSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(userdata__role='Staff')
    

class RetriveTaskView(ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['pk']
        return TaskAssignment.objects.filter(staff_id=user_id).order_by('-current_date', '-id')

    def list(self, request, *args, **kwargs):
        user_id = self.kwargs['pk']
        print(f"📥 Fetching tasks for staff ID: {user_id}")

        all_tasks = self.get_queryset()  # ✅ Use ordered queryset
        new_task_ids = list(all_tasks.filter(is_new=True).values_list('id', flat=True))

        print(f"🆕 New task IDs before update: {new_task_ids}")

        serializer = self.get_serializer(all_tasks, many=True)

        if new_task_ids:
            TaskAssignment.objects.filter(id__in=new_task_ids).update(is_new=False)
            print(f"✅ Marked these task IDs as seen: {new_task_ids}")
        else:
            print("ℹ️ No new tasks found.")

        return Response({
            "tasks": serializer.data,
            "new_task_ids": new_task_ids
        })


class TaskStatusUpdateView(RetrieveUpdateAPIView):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'


class TaskStatusView(ListAPIView):   #team lead check the status
   
   serializer_class=TaskSerializer

   def get(self, request):
        summary = []
        staff_users = User.objects.filter(userdata__role='Staff')

        for user in staff_users:
            tasks = TaskAssignment.objects.filter(staff=user)
            
            task_details = [
                {
                    'title': task.title,
                    'status': task.status
                }
                for task in tasks
            ]
            summary.append({
                'firstname':user.first_name,
                'username': user.username,
                'position':user.userdata.position,
                'tasks':task_details,
                'completed': tasks.filter(status='Completed').count(),
                'pending': tasks.filter(status='Pending').count(),
                'in_progress': tasks.filter(status='In Progress').count()
            })

        return Response(summary)
    

       

# Admin views........................................................................

class AdminListView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminSerializer



class AdminUserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer

class AdminHrView(ListAPIView):
    # queryset=User.objects.all()
    serializer_class=AdminSerializer

    def get_queryset(self):
        return User.objects.filter(userdata__role='HR')

class AdminManagerView(ListAPIView):
    queryset=User.objects.all()
    serializer_class=AdminSerializer

    def get_queryset(self):
        return User.objects.filter(userdata__role='Manager')
    

class AdminTeamView(ListAPIView):
    queryset=User.objects.all()
    serializer_class=AdminSerializer

    def get_queryset(self):
        return User.objects.filter(userdata__role='TeamLeader')
    

class AdminStaffView(ListAPIView):
    queryset=User.objects.all()
    serializer_class=AdminSerializer

    def get_queryset(self):
        return User.objects.filter(userdata__role='Staff')
    

# leave................................................................
class LeaveRequestView(ListAPIView):
    queryset=LeaveRequest.objects.all()
    serializer_class=LeaveSerializer   
    permission_classes=[IsAuthenticated]

    # def get_queryset(self):
    #     user = self.request.user
    #     print(f"User accessing leave list: {user.username}, staff={user.is_staff}, superuser={user.is_superuser}")
    #     if user.is_staff or user.is_superuser:  # For HR/Admin users
    #         return LeaveRequest.objects.all()
    #     return LeaveRequest.objects.filter(user=user)  # For normal users


class LeaveDetailView(RetrieveUpdateAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

class LeaveStatusView(ListAPIView):
    queryset=LeaveRequest.objects.all()
    serializer_class=LeaveSerializer
    permission_classes=[IsAuthenticated]


# Request cereated..........................................................

class RequestView(APIView):
    def post(self,request):
        serializer=RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"request created sucessfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class RequestRetriveView(ListAPIView):
    queryset=Request.objects.all()
    serializer_class=RequestSerializer
    def get_queryset(self):
        return Request.objects.filter(user__userdata__role='Manager')

class TeamLeadRequestView(ListAPIView):
    queryset=Request.objects.all()
    serializer_class=RequestSerializer

    def get_queryset(self):
        return Request.objects.filter(user__userdata__role='HR')
    
from datetime import date

class AttendanceCreateView(APIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        today = date.today()

        # ✅ Check if already marked
        if Attendance.objects.filter(user=user, date=today, is_present=True).exists():
            return Response(
                {"message": "⚠️ Attendance already marked for today."},
                status=status.HTTP_200_OK
            )

        # ✅ Mark attendance
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user, date=today, is_present=True)
            return Response(
                {"message": "✅ Attendance marked successfully!"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AttendanceView(ListAPIView):
    serializer_class=AttendanceSerializer
    queryset=Attendance.objects.all()

    def get_queryset(self):
        return Attendance.objects.all()
    
    