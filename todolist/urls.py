"""todolist URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from app_todolist import views

urlpatterns = [
    url(r'^api/get-data', views.get_data),
    url(r'^api/add-data', views.add_data),
    url(r'^api/edit-data/(?P<t_id>(\w|-){36})', views.edit_data),
    url(r'api/delete-data/(?P<t_id1>(\w|-){36})',
        views.delete_data),
    url(r'^list/', views.index),
    url(r'^admin/', admin.site.urls),
]
