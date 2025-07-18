from django.contrib import admin
from django.urls import path,include
from . views import RegisterView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . views import EvaluationCreateView
from . views import LeaveView
from . views import TaskViewSets
from . views import AdminListView
from rest_framework_simplejwt.views import ( TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView
from .views import AdminUserDetailView
from . views import LeaveRequestView
from . views import LeaveDetailView
from . views import LeaveStatusView
from . views import EvaluationView
from . views import UserTaskView
from . views import RetriveTaskView
from . views import AdminHrView
from . views import AdminManagerView
from . views import AdminTeamView
from . views import AdminStaffView
from . views import RequestView
from . views import RequestRetriveView
from . views import TeamLeadRequestView
from . views import TeamEvaluaterView
from . views import HrTeamEvaluaterView
from . views import HREvaluatedTeamView
from . views import AttendanceCreateView
from . views import AttendanceView
from . views import TaskStatusUpdateView
from . views import TaskStatusView
from . views import TeamLeadEvaluationsView



router=DefaultRouter()
router.register("adminapi",AdminListView,basename="admin")
urlpatterns = [
    
    path("",include(router.urls)),
    path("register/",RegisterView.as_view(),name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain"),
    # path("token/",TokenObtainPairView.as_view(),name="token_obtain"),
    path("token/refresh",TokenRefreshView.as_view(),name="token_refresh"),

    path("evaluate/",EvaluationCreateView.as_view(),name="evluation"),
    path("evaluation/view/",EvaluationView.as_view(),name="evalutaion_view"),
    path("team/evaluate/staff",TeamEvaluaterView.as_view(),name="team_evalute_staff"),
    path("team/evaluate/staff/view",TeamLeadEvaluationsView.as_view(),name="team_evaluate_staff_view"),
    path('hr/team/evaluate',HrTeamEvaluaterView.as_view(),name="hrteam_evaluater_view"),
    path("hr/team/evaluate/team/",HREvaluatedTeamView.as_view(),name="hr_evaluate_team_view"),
    
    path("task/",TaskViewSets.as_view(),name="task_assign'"),
    path('api/adminapi/<int:pk>/', AdminUserDetailView.as_view()),
    path("admin/hr/",AdminHrView.as_view(),name="admin_hr"),
    path("admin/manager/",AdminManagerView.as_view(),name="admin_manager"),
    path("admin/team/",AdminTeamView.as_view(),name="admin_team"),
    path("admin/staff/",AdminStaffView.as_view(),name="admin_staff"),
   
    path("leave/",LeaveView.as_view(),name="leave_request"),
    path("leaveapi/",LeaveRequestView.as_view(),name="leave-request"),
    path("leaveapi/<int:pk>/", LeaveDetailView.as_view(), name="leave-details"),
    path("leave/statusview",LeaveStatusView.as_view(),name="leave_status"),

   
    path("team/taskuser/",UserTaskView.as_view(),name="user_viewtaask"),
    path('staff/taskview/<int:pk>/',RetriveTaskView.as_view(),name="staff_taskview"),
    path('staff/task/update/<int:id>/', TaskStatusUpdateView.as_view(), name="task-status-update"),
    path("task/status/view/",TaskStatusView.as_view(),name="task_status"),

    path("request/",RequestView.as_view(),name="request"),
    path("request/retrive/manager/",RequestRetriveView.as_view(),name="retrive_request"),
    path("request/retrive/teamlead/",TeamLeadRequestView.as_view(),name="teamrequest_view"),
    # path('admin-users/', AdminListView.as_view(), name='admin-users'),

    path("attendance/mark",AttendanceCreateView.as_view(),name="attendance"),
    path('attendance/view',AttendanceView.as_view(),name="attendance_view")
]