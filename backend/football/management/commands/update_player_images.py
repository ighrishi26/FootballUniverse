from django.core.management.base import BaseCommand
from football.models import Player


PLAYER_IMAGES = {
    "Lionel Messi": "https://commons.wikimedia.org/wiki/Special:FilePath/Lionel%20Messi%20close-up.jpg",

    "Cristiano Ronaldo": "https://commons.wikimedia.org/wiki/Special:FilePath/Cristiano%20Ronaldo.jpg",

    "Neymar": "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Jr%20portrait.jpg",

    "Kylian Mbappé": "https://commons.wikimedia.org/wiki/Special:FilePath/Kylian%20Mbappe%202018.jpg",

    "Kevin De Bruyne": "https://commons.wikimedia.org/wiki/Special:FilePath/Kevin%20De%20Bruyne%202018.jpg",

    "Luka Modrić": "https://commons.wikimedia.org/wiki/Special:FilePath/Luka%20Modric%202018.jpg",

    "Virgil van Dijk": "https://commons.wikimedia.org/wiki/Special:FilePath/Virgil%20van%20Dijk%202019.jpg",

    "Manuel Neuer": "https://commons.wikimedia.org/wiki/Special:FilePath/Manuel%20Neuer%202018.jpg",

    "Alisson Becker": "https://commons.wikimedia.org/wiki/Special:FilePath/Alisson%20Becker.jpg",

    "Thibaut Courtois": "https://commons.wikimedia.org/wiki/Special:FilePath/Thibaut%20Courtois%202018.jpg",

    "Sergio Ramos": "https://commons.wikimedia.org/wiki/Special:FilePath/Sergio%20Ramos%202018.jpg",

    "Rúben Dias": "https://commons.wikimedia.org/wiki/Special:FilePath/Ruben%20Dias%202021.jpg",

    "Trent Alexander-Arnold": "https://commons.wikimedia.org/wiki/Special:FilePath/Trent%20Alexander-Arnold%202020.jpg",

    "Achraf Hakimi": "https://commons.wikimedia.org/wiki/Special:FilePath/Achraf%20Hakimi%202018.jpg",

    "Antonio Rüdiger": "https://commons.wikimedia.org/wiki/Special:FilePath/Antonio%20Rudiger%202021.jpg",

    "Toni Kroos": "https://commons.wikimedia.org/wiki/Special:FilePath/Toni%20Kroos%202018.jpg",

    "Rodri": "https://commons.wikimedia.org/wiki/Special:FilePath/Rodri%202019.jpg",

    "Jude Bellingham": "https://commons.wikimedia.org/wiki/Special:FilePath/Jude%20Bellingham%202023.jpg",

    "Pedri": "https://commons.wikimedia.org/wiki/Special:FilePath/Pedri%202022.jpg",

    "Bernardo Silva": "https://commons.wikimedia.org/wiki/Special:FilePath/Bernardo%20Silva%202018.jpg",

    "Erling Haaland": "https://commons.wikimedia.org/wiki/Special:FilePath/Erling%20Haaland%202022.jpg",

    "Mohamed Salah": "https://commons.wikimedia.org/wiki/Special:FilePath/Mohamed%20Salah%202021.jpg",

    "Vinícius Júnior": "https://commons.wikimedia.org/wiki/Special:FilePath/Vinicius%20Junior%202022.jpg",

    "Harry Kane": "https://commons.wikimedia.org/wiki/Special:FilePath/Harry%20Kane%202018.jpg",

    "Robert Lewandowski": "https://commons.wikimedia.org/wiki/Special:FilePath/Robert%20Lewandowski%202018.jpg",

    "Lamine Yamal": "https://commons.wikimedia.org/wiki/Special:FilePath/Lamine%20Yamal%202024.jpg",
}


class Command(BaseCommand):

    help = "Update player profile images"

    def handle(self, *args, **kwargs):

        updated = 0

        for name, image_url in PLAYER_IMAGES.items():

            player = Player.objects.filter(name=name).first()

            if player:
                player.image = image_url
                player.save(update_fields=["image"])

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Updated image: {name}"
                    )
                )

                updated += 1

            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Player not found: {name}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nUpdated {updated} player images."
            )
        )