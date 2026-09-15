from rest_framework import serializers

from .models import Club, Player, Competition, Transfer, TimelineEvent


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = "__all__"


class PlayerSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(
        source="club.name",
        read_only=True
    )

    class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "country",
            "position",
            "shirt_number",
            "club",
            "club_name",
            "appearances",
            "goals",
            "assists",
            "trophies",
            "image",
        ]


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = "__all__"


class TransferSerializer(serializers.ModelSerializer):
    player_name = serializers.CharField(
        source="player.name",
        read_only=True
    )

    player_position = serializers.CharField(
        source="player.position",
        read_only=True
    )

    class Meta:
        model = Transfer
        fields = [
            "id",
            "player",
            "player_name",
            "player_position",
            "from_club",
            "to_club",
            "season",
            "fee",
            "transfer_type",
        ]


class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = "__all__"