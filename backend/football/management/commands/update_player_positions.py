from django.core.management.base import BaseCommand
from football.models import Player


class Command(BaseCommand):
    help = "Update players with exact football positions"

    positions = {
        "Manuel Neuer": "GK",
        "Alisson Becker": "GK",
        "Thibaut Courtois": "GK",

        "Virgil van Dijk": "CB",
        "Sergio Ramos": "CB",
        "Rúben Dias": "CB",
        "Antonio Rüdiger": "CB",

        "Trent Alexander-Arnold": "RB",
        "Achraf Hakimi": "RB",

        "Lionel Messi": "RW",
        "Cristiano Ronaldo": "ST",
        "Neymar Jr": "LW",
        "Kylian Mbappé": "LW",

        "Kevin De Bruyne": "CAM",
        "Luka Modrić": "CM",
        "Toni Kroos": "CM",
        "Rodri": "CDM",
        "Jude Bellingham": "CAM",
        "Pedri": "CM",
        "Bernardo Silva": "CAM",

        "Erling Haaland": "ST",
        "Mohamed Salah": "RW",
        "Vinícius Júnior": "LW",
        "Harry Kane": "ST",
        "Robert Lewandowski": "ST",
        "Lamine Yamal": "RW",
    }

    def handle(self, *args, **options):
        updated = 0

        for name, position in self.positions.items():
            try:
                player = Player.objects.get(name=name)
                player.position = position
                player.save()
                updated += 1

                self.stdout.write(
                    f"Updated {name} -> {position}"
                )

            except Player.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(
                        f"Player not found: {name}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Updated {updated} players."
            )
        )