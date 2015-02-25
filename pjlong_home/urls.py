from django.conf import settings
from django.conf.urls import include, url, patterns
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin

from ngMain.views import IndexView, TemplateView


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pjlong_home.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/?', include(admin.site.urls)),
    url(r'^blog/?', include('blog.urls')),
    url(r'^ng/(?P<template_name>[\w-]+)/?$', TemplateView.as_view()),
    url(r'^', IndexView.as_view())
) #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)