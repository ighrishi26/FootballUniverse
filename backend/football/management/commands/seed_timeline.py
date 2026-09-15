from django.core.management.base import BaseCommand

from football.models import TimelineEvent


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        print("Clearing old timeline events...")

        TimelineEvent.objects.all().delete()

        timeline_data = [
            {
                "year": 1955,
                "category": "Club",
                "title": "European Cup Begins",
                "description": "The first European Cup tournament begins, creating the foundation for what would become the UEFA Champions League.",
            },
            {
                "year": 1966,
                "category": "World Cup",
                "title": "England Win the World Cup",
                "description": "England win their first FIFA World Cup on home soil after defeating West Germany in the final.",
            },
            {
                "year": 1970,
                "category": "World Cup",
                "title": "Brazil Win the World Cup",
                "description": "Brazil win the FIFA World Cup in Mexico, led by the legendary Pelé.",
            },
            {
                "year": 1986,
                "category": "World Cup",
                "title": "Argentina Win the World Cup",
                "description": "Argentina win the World Cup in Mexico with Diego Maradona producing one of football's most famous tournament performances.",
            },
            {
                "year": 1992,
                "category": "Club",
                "title": "Premier League Begins",
                "description": "The English Premier League begins its first season, becoming one of the world's most popular football competitions.",
            },
            {
                "year": 1999,
                "category": "Club",
                "title": "Manchester United Complete Historic Treble",
                "description": "Manchester United win the Premier League, FA Cup and UEFA Champions League in the same season.",
            },
            {
                "year": 2005,
                "category": "Club",
                "title": "Liverpool Istanbul Miracle",
                "description": "Liverpool recover from a 3-0 half-time deficit to defeat AC Milan on penalties in the Champions League final.",
            },
            {
                "year": 2009,
                "category": "Club",
                "title": "Barcelona Win Historic Sextuple",
                "description": "Barcelona become the first club to win six major trophies in a calendar year under Pep Guardiola.",
            },
            {
                "year": 2010,
                "category": "World Cup",
                "title": "Spain Win Their First World Cup",
                "description": "Spain win their first FIFA World Cup after Andrés Iniesta scores the winning goal against the Netherlands.",
            },
            {
                "year": 2012,
                "category": "Player",
                "title": "Messi Scores 91 Goals",
                "description": "Lionel Messi finishes the calendar year with 91 goals, setting an extraordinary scoring record.",
            },
            {
                "year": 2014,
                "category": "World Cup",
                "title": "Germany Win the World Cup",
                "description": "Germany defeat Argentina in extra time to win the FIFA World Cup in Brazil.",
            },
            {
                "year": 2015,
                "category": "Club",
                "title": "Barcelona Complete Another Treble",
                "description": "Barcelona win La Liga, Copa del Rey and Champions League to complete another historic treble.",
            },
            {
                "year": 2018,
                "category": "World Cup",
                "title": "France Become World Champions",
                "description": "France defeat Croatia 4-2 in Moscow to win their second FIFA World Cup.",
            },
            {
                "year": 2020,
                "category": "Club",
                "title": "Bayern Munich Win the Treble",
                "description": "Bayern Munich win the Bundesliga, DFB-Pokal and Champions League during a dominant season.",
            },
            {
                "year": 2022,
                "category": "World Cup",
                "title": "Argentina Win the World Cup",
                "description": "Argentina defeat France on penalties in Qatar as Lionel Messi wins his first FIFA World Cup.",
            },
            {
                "year": 2024,
                "category": "Player",
                "title": "Football Enters a New Era",
                "description": "A new generation of players continues to reshape world football while established stars remain influential.",
            },
        ]

        for event in timeline_data:
            TimelineEvent.objects.create(**event)

        print(f"Created {len(timeline_data)} timeline events.")
        print("Timeline data seeded successfully!")