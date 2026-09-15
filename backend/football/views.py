from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import (
    Club,
    Player,
    Competition,
    Transfer,
    TimelineEvent,
)

from .serializers import (
    ClubSerializer,
    PlayerSerializer,
    CompetitionSerializer,
    TransferSerializer,
    TimelineEventSerializer,
)


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class CompetitionViewSet(viewsets.ModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer


class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer


class TimelineEventViewSet(viewsets.ModelViewSet):
    queryset = TimelineEvent.objects.all()
    serializer_class = TimelineEventSerializer


@api_view(["GET"])
def api_home(request):
    return Response({
        "message": "Football Universe API is running",
        "status": "success",
        "endpoints": {
            "players": "/api/players/",
            "clubs": "/api/clubs/",
            "competitions": "/api/competitions/",
            "transfers": "/api/transfers/",
            "timeline": "/api/timeline/"
        }
    })
    
    
@api_view(["GET"])
def dashboard_stats(request):

    players = Player.objects.all()

    total_goals = sum(
        player.goals for player in players
    )

    total_assists = sum(
        player.assists for player in players
    )

    top_scorer = players.order_by("-goals").first()
    top_assister = players.order_by("-assists").first()

    return Response({
        "players": Player.objects.count(),
        "clubs": Club.objects.count(),
        "competitions": Competition.objects.count(),
        "transfers": Transfer.objects.count(),
        "timeline_events": TimelineEvent.objects.count(),

        "total_goals": total_goals,
        "total_assists": total_assists,

        "top_scorer": {
            "name": top_scorer.name,
            "goals": top_scorer.goals,
        } if top_scorer else None,

        "top_assister": {
            "name": top_assister.name,
            "assists": top_assister.assists,
        } if top_assister else None,
    })