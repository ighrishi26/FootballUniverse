from django.core.management.base import BaseCommand

from football.models import Club, Player


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        players_data = [
            {
                "name": "Alisson Becker",
                "country": "Brazil",
                "position": "Goalkeeper",
                "shirt_number": 1,
                "club": "Liverpool",
                "appearances": 300,
                "goals": 0,
                "assists": 5,
                "trophies": 8,
            },
            {
                "name": "Thibaut Courtois",
                "country": "Belgium",
                "position": "Goalkeeper",
                "shirt_number": 1,
                "club": "Real Madrid",
                "appearances": 450,
                "goals": 0,
                "assists": 2,
                "trophies": 12,
            },

            {
                "name": "Sergio Ramos",
                "country": "Spain",
                "position": "Defender",
                "shirt_number": 4,
                "club": "Paris Saint-Germain",
                "appearances": 750,
                "goals": 120,
                "assists": 45,
                "trophies": 30,
            },
            {
                "name": "Rúben Dias",
                "country": "Portugal",
                "position": "Defender",
                "shirt_number": 3,
                "club": "Manchester City",
                "appearances": 350,
                "goals": 15,
                "assists": 10,
                "trophies": 12,
            },
            {
                "name": "Trent Alexander-Arnold",
                "country": "England",
                "position": "Defender",
                "shirt_number": 66,
                "club": "Liverpool",
                "appearances": 350,
                "goals": 25,
                "assists": 95,
                "trophies": 8,
            },
            {
                "name": "Achraf Hakimi",
                "country": "Morocco",
                "position": "Defender",
                "shirt_number": 2,
                "club": "Paris Saint-Germain",
                "appearances": 400,
                "goals": 45,
                "assists": 75,
                "trophies": 12,
            },
            {
                "name": "Antonio Rüdiger",
                "country": "Germany",
                "position": "Defender",
                "shirt_number": 22,
                "club": "Real Madrid",
                "appearances": 450,
                "goals": 25,
                "assists": 10,
                "trophies": 12,
            },

            {
                "name": "Toni Kroos",
                "country": "Germany",
                "position": "Midfielder",
                "shirt_number": 8,
                "club": "Real Madrid",
                "appearances": 750,
                "goals": 80,
                "assists": 180,
                "trophies": 34,
            },
            {
                "name": "Rodri",
                "country": "Spain",
                "position": "Midfielder",
                "shirt_number": 16,
                "club": "Manchester City",
                "appearances": 400,
                "goals": 45,
                "assists": 40,
                "trophies": 12,
            },
            {
                "name": "Jude Bellingham",
                "country": "England",
                "position": "Midfielder",
                "shirt_number": 5,
                "club": "Real Madrid",
                "appearances": 300,
                "goals": 65,
                "assists": 45,
                "trophies": 6,
            },
            {
                "name": "Pedri",
                "country": "Spain",
                "position": "Midfielder",
                "shirt_number": 8,
                "club": "FC Barcelona",
                "appearances": 250,
                "goals": 35,
                "assists": 45,
                "trophies": 5,
            },
            {
                "name": "Bernardo Silva",
                "country": "Portugal",
                "position": "Midfielder",
                "shirt_number": 20,
                "club": "Manchester City",
                "appearances": 500,
                "goals": 110,
                "assists": 100,
                "trophies": 15,
            },

            {
                "name": "Erling Haaland",
                "country": "Norway",
                "position": "Forward",
                "shirt_number": 9,
                "club": "Manchester City",
                "appearances": 350,
                "goals": 280,
                "assists": 60,
                "trophies": 8,
            },
            {
                "name": "Mohamed Salah",
                "country": "Egypt",
                "position": "Forward",
                "shirt_number": 11,
                "club": "Liverpool",
                "appearances": 600,
                "goals": 320,
                "assists": 150,
                "trophies": 10,
            },
            {
                "name": "Vinícius Júnior",
                "country": "Brazil",
                "position": "Forward",
                "shirt_number": 7,
                "club": "Real Madrid",
                "appearances": 350,
                "goals": 100,
                "assists": 80,
                "trophies": 10,
            },
            {
                "name": "Harry Kane",
                "country": "England",
                "position": "Forward",
                "shirt_number": 9,
                "club": "Bayern Munich",
                "appearances": 600,
                "goals": 400,
                "assists": 100,
                "trophies": 5,
            },
            {
                "name": "Robert Lewandowski",
                "country": "Poland",
                "position": "Forward",
                "shirt_number": 9,
                "club": "FC Barcelona",
                "appearances": 750,
                "goals": 600,
                "assists": 150,
                "trophies": 30,
            },
            {
                "name": "Lamine Yamal",
                "country": "Spain",
                "position": "Forward",
                "shirt_number": 10,
                "club": "FC Barcelona",
                "appearances": 150,
                "goals": 35,
                "assists": 40,
                "trophies": 3,
            },
        ]


        created = 0
        skipped = 0


        for data in players_data:
            club = None

            if data["club"]:
                club = Club.objects.filter(
                    name=data["club"]
                ).first()

                if club is None and data["club"] == "Manchester City":
                    club = Club.objects.create(
                        name="Manchester City",
                        country="England",
                        league="Premier League",
                        stadium="Etihad Stadium",
                        founded=1880,
                        trophies=35,
                        description="English football club based in Manchester.",
                        colors="Sky Blue"
                    )

            if Player.objects.filter(
                name=data["name"]
            ).exists():
                skipped += 1
                continue

            if club is None:
                skipped += 1
                continue

            Player.objects.create(
                name=data["name"],
                country=data["country"],
                position=data["position"],
                shirt_number=data["shirt_number"],
                club=club,
                appearances=data["appearances"],
                goals=data["goals"],
                assists=data["assists"],
                trophies=data["trophies"],
            )

            created += 1


        self.stdout.write(
            self.style.SUCCESS(
                f"Created {created} players."
            )
        )

        self.stdout.write(
            f"Skipped {skipped} existing players."
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Additional player data added successfully!"
            )
        )