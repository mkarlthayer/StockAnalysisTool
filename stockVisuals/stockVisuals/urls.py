from django.contrib import admin
from django.urls import path

from visualizer.views import stockAPIView

urlpatterns = [
    path('visualizer/', stockAPIView.as_view(), name = "visualizerData"), # go straight to visualizer application
    path('admin/', admin.site.urls),
]
