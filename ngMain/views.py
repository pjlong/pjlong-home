__author__ = 'phil'

from django.views import generic


## Angular Views
class IndexView(generic.TemplateView):
    template_name = 'ngMain/index.html'


class TemplateView(generic.TemplateView):

    def get_template_names(self):
        template = ["{0}.html".format(self.kwargs['template_name'])]
        return template