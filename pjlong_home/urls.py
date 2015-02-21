from django.conf.urls import patterns, include, url
from django.contrib import admin

from ngMain.views import IndexView, TemplateView


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pjlong_home.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^ng/(?P<template_name>[\w-]+)/?$', TemplateView.as_view()),
    url(r'^', IndexView.as_view())
)
