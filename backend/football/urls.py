from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    api_home,
    dashboard_stats,
    ClubViewSet,
    PlayerViewSet,
    CompetitionViewSet,
    TransferViewSet,
    TimelineEventViewSet,
)

router = DefaultRouter()

router.register("players", PlayerViewSet)
router.register("clubs", ClubViewSet)
router.register("competitions", CompetitionViewSet)
router.register("transfers", TransferViewSet)
router.register("timeline", TimelineEventViewSet)

urlpatterns = [
    path("", api_home),
    path("dashboard/", dashboard_stats),
    path("", include(router.urls)),
]