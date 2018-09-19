from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api.views import GenerateTokenView, VerifyTokenView, LinkView

router = DefaultRouter()
router.register('links', LinkView)


urlpatterns = [
    url('login/generate', GenerateTokenView.as_view()),
    url('login/verify', VerifyTokenView.as_view()),
    url('^', include(router.urls)),
]