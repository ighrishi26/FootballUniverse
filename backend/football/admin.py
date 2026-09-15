from django.contrib import admin

from .models import (
    Club,
    Player,
    Competition,
    Transfer,
    TimelineEvent,
)


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "country",
        "league",
        "stadium",
        "founded",
        "trophies",
    )

    search_fields = (
        "name",
        "country",
        "league",
        "stadium",
    )

    list_filter = (
        "country",
        "league",
    )

    ordering = ("name",)


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "country",
        "position",
        "club",
        "shirt_number",
        "appearances",
        "goals",
        "assists",
        "trophies",
    )

    search_fields = (
        "name",
        "country",
        "club__name",
    )

    list_filter = (
        "position",
        "country",
        "club",
    )

    ordering = ("name",)


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "country",
        "type",
        "founded",
        "teams",
    )

    search_fields = (
        "name",
        "country",
    )

    list_filter = (
        "type",
        "country",
    )

    ordering = ("name",)


@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):

    list_display = (
        "player",
        "from_club",
        "to_club",
        "season",
        "fee",
        "transfer_type",
    )

    search_fields = (
        "player__name",
        "from_club",
        "to_club",
        "season",
    )

    list_filter = (
        "season",
        "transfer_type",
    )

    ordering = ("-id",)


@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):

    list_display = (
        "year",
        "category",
        "title",
    )

    search_fields = (
        "title",
        "description",
    )

    list_filter = (
        "category",
        "year",
    )

    ordering = ("year",)