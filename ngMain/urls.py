from django.conf.urls import include, url, patterns
from django.views.generic import TemplateView

from .views import NgTemplateView, NgIndexView

urlpatterns = patterns('ngMain.views',
    url(r'^isitpicnicday/?', TemplateView.as_view(template_name="ngMain/pd.html")),
    url(r'^ng/(?P<template_name>[\w-]+)/?$', NgTemplateView.as_view()),
    url(r'^', NgIndexView.as_view())
)