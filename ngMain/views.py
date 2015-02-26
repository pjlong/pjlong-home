__author__ = 'phil'

from django.views import generic


## Angular Views
class NgIndexView(generic.TemplateView):
    template_name = 'ngMain/index.html'


class NgTemplateView(generic.TemplateView):

    def get_template_names(self):
        template = ["ngMain/{0}.html".format(self.kwargs['template_name'])]
        return template