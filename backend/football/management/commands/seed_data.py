from django.core.management.base import BaseCommand

from football.models import Club, Player, Competition, Transfer


class Command(BaseCommand):

    help = "Load demo Football Universe data"

    def handle(self, *args, **kwargs):

        self.stdout.write("Clearing old data...")

        Transfer.objects.all().delete()
        Player.objects.all().delete()
        Competition.objects.all().delete()
        Club.objects.all().delete()

        self.stdout.write("Creating clubs...")

        clubs_data = [
            {
                "name": "FC Barcelona",
                "country": "Spain",
                "league": "La Liga",
                "stadium": "Spotify Camp Nou",
                "founded": 1899,
                "trophies": 96,
                "description": "FC Barcelona is one of the most historic football clubs in Europe, known for its possession-based football and legendary players.",
                "colors": "Blue & Garnet",
            },
            {
                "name": "Real Madrid",
                "country": "Spain",
                "league": "La Liga",
                "stadium": "Santiago Bernabéu",
                "founded": 1902,
                "trophies": 105,
                "description": "Real Madrid is one of football's most successful clubs, famous for its European history and world-class players.",
                "colors": "White",
            },
            {
                "name": "Manchester United",
                "country": "England",
                "league": "Premier League",
                "stadium": "Old Trafford",
                "founded": 1878,
                "trophies": 68,
                "description": "Manchester United is one of England's most famous clubs with a long history of domestic and international success.",
                "colors": "Red & White",
            },
            {
                "name": "Liverpool",
                "country": "England",
                "league": "Premier League",
                "stadium": "Anfield",
                "founded": 1892,
                "trophies": 68,
                "description": "Liverpool is a historic English club known for its passionate supporters, European nights and successful history.",
                "colors": "Red",
            },
            {
                "name": "Bayern Munich",
                "country": "Germany",
                "league": "Bundesliga",
                "stadium": "Allianz Arena",
                "founded": 1900,
                "trophies": 84,
                "description": "Bayern Munich is Germany's most decorated football club and one of Europe's dominant teams.",
                "colors": "Red & White",
            },
            {
                "name": "AC Milan",
                "country": "Italy",
                "league": "Serie A",
                "stadium": "San Siro",
                "founded": 1899,
                "trophies": 50,
                "description": "AC Milan is an iconic Italian club with a rich European history and generations of legendary footballers.",
                "colors": "Red & Black",
            },
            {
                "name": "Inter Miami",
                "country": "USA",
                "league": "MLS",
                "stadium": "Chase Stadium",
                "founded": 2018,
                "trophies": 2,
                "description": "Inter Miami is a Major League Soccer club based in Miami, Florida.",
                "colors": "Pink & Black",
            },
            {
                "name": "Al Nassr",
                "country": "Saudi Arabia",
                "league": "Saudi Pro League",
                "stadium": "Al-Awwal Park",
                "founded": 1955,
                "trophies": 28,
                "description": "Al Nassr is one of Saudi Arabia's prominent football clubs.",
                "colors": "Yellow & Blue",
            },
            {
                "name": "Santos",
                "country": "Brazil",
                "league": "Brasileirão",
                "stadium": "Vila Belmiro",
                "founded": 1912,
                "trophies": 50,
                "description": "Santos is a historic Brazilian club famous for producing legendary footballers.",
                "colors": "Black & White",
            },
            {
                "name": "Napoli",
                "country": "Italy",
                "league": "Serie A",
                "stadium": "Stadio Diego Armando Maradona",
                "founded": 1926,
                "trophies": 14,
                "description": "Napoli is a historic Italian club based in Naples.",
                "colors": "Sky Blue",
            },
            {
                "name": "Paris Saint-Germain",
                "country": "France",
                "league": "Ligue 1",
                "stadium": "Parc des Princes",
                "founded": 1970,
                "trophies": 50,
                "description": "Paris Saint-Germain is one of France's most successful modern football clubs.",
                "colors": "Blue, Red & White",
            },
            {
                "name": "Al Hilal",
                "country": "Saudi Arabia",
                "league": "Saudi Pro League",
                "stadium": "Kingdom Arena",
                "founded": 1957,
                "trophies": 70,
                "description": "Al Hilal is one of Asia's most successful football clubs.",
                "colors": "Blue",
            },
            {
                "name": "Galatasaray",
                "country": "Turkey",
                "league": "Süper Lig",
                "stadium": "RAMS Park",
                "founded": 1905,
                "trophies": 85,
                "description": "Galatasaray is one of Turkey's most successful football clubs.",
                "colors": "Red & Yellow",
            },
            {
                "name": "Arsenal",
                "country": "England",
                "league": "Premier League",
                "stadium": "Emirates Stadium",
                "founded": 1886,
                "trophies": 48,
                "description": "Arsenal is a historic English football club based in London.",
                "colors": "Red & White",
            },
            {
                "name": "West Ham United",
                "country": "England",
                "league": "Premier League",
                "stadium": "London Stadium",
                "founded": 1895,
                "trophies": 6,
                "description": "West Ham United is an English football club based in London.",
                "colors": "Claret & Blue",
            },
            {
                "name": "Borussia Dortmund",
                "country": "Germany",
                "league": "Bundesliga",
                "stadium": "Signal Iduna Park",
                "founded": 1909,
                "trophies": 22,
                "description": "Borussia Dortmund is one of Germany's most famous football clubs.",
                "colors": "Yellow & Black",
            },
        ]

        clubs = {}

        for data in clubs_data:
            club = Club.objects.create(**data)
            clubs[data["name"]] = club

        self.stdout.write(
            self.style.SUCCESS(f"Created {len(clubs)} clubs.")
        )

        self.stdout.write("Creating players...")

        players_data = [
            {
                "name": "Lionel Messi",
                "country": "Argentina",
                "position": "Forward",
                "shirt_number": 10,
                "club": clubs["Inter Miami"],
                "appearances": 1089,
                "goals": 860,
                "assists": 380,
                "trophies": 45,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Cristiano Ronaldo",
                "country": "Portugal",
                "position": "Forward",
                "shirt_number": 7,
                "club": clubs["Al Nassr"],
                "appearances": 1300,
                "goals": 960,
                "assists": 260,
                "trophies": 35,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Neymar Jr",
                "country": "Brazil",
                "position": "Forward",
                "shirt_number": 10,
                "club": clubs["Santos"],
                "appearances": 700,
                "goals": 440,
                "assists": 280,
                "trophies": 30,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Kylian Mbappé",
                "country": "France",
                "position": "Forward",
                "shirt_number": 10,
                "club": clubs["Real Madrid"],
                "appearances": 500,
                "goals": 360,
                "assists": 150,
                "trophies": 20,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Kevin De Bruyne",
                "country": "Belgium",
                "position": "Midfielder",
                "shirt_number": 17,
                "club": clubs["Manchester City"] if "Manchester City" in clubs else None,
                "appearances": 600,
                "goals": 160,
                "assists": 260,
                "trophies": 19,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Luka Modrić",
                "country": "Croatia",
                "position": "Midfielder",
                "shirt_number": 10,
                "club": clubs["AC Milan"],
                "appearances": 900,
                "goals": 130,
                "assists": 180,
                "trophies": 28,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Virgil van Dijk",
                "country": "Netherlands",
                "position": "Defender",
                "shirt_number": 4,
                "club": clubs["Liverpool"],
                "appearances": 500,
                "goals": 50,
                "assists": 35,
                "trophies": 9,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Manuel Neuer",
                "country": "Germany",
                "position": "Goalkeeper",
                "shirt_number": 1,
                "club": clubs["Bayern Munich"],
                "appearances": 850,
                "goals": 0,
                "assists": 5,
                "trophies": 33,
                "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
            },
        ]

        for data in players_data:
            Player.objects.create(**data)

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(players_data)} players."
            )
        )

        self.stdout.write("Creating competitions...")

        competitions_data = [
            {
                "name": "UEFA Champions League",
                "country": "Europe",
                "type": "Club",
                "founded": 1955,
                "teams": 36,
                "description": "Europe's premier club football competition featuring the best teams from across the continent.",
            },
            {
                "name": "FIFA World Cup",
                "country": "International",
                "type": "National",
                "founded": 1930,
                "teams": 48,
                "description": "The world's biggest international football tournament contested by national teams.",
            },
            {
                "name": "Premier League",
                "country": "England",
                "type": "Club",
                "founded": 1992,
                "teams": 20,
                "description": "England's top-level football competition.",
            },
            {
                "name": "La Liga",
                "country": "Spain",
                "type": "Club",
                "founded": 1929,
                "teams": 20,
                "description": "Spain's top football division.",
            },
            {
                "name": "Bundesliga",
                "country": "Germany",
                "type": "Club",
                "founded": 1963,
                "teams": 18,
                "description": "Germany's top football division.",
            },
            {
                "name": "Serie A",
                "country": "Italy",
                "type": "Club",
                "founded": 1898,
                "teams": 20,
                "description": "Italy's premier football league.",
            },
            {
                "name": "Ligue 1",
                "country": "France",
                "type": "Club",
                "founded": 1932,
                "teams": 18,
                "description": "France's top-level football league.",
            },
            {
                "name": "UEFA Europa League",
                "country": "Europe",
                "type": "Club",
                "founded": 1971,
                "teams": 36,
                "description": "A major European club competition featuring teams from leagues across Europe.",
            },
        ]

        for data in competitions_data:
            Competition.objects.create(**data)

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(competitions_data)} competitions."
            )
        )

        self.stdout.write("Creating transfers...")

        players = {
            player.name: player
            for player in Player.objects.all()
        }

        transfers_data = [
            {
                "player": players["Neymar Jr"],
                "from_club": "Al Hilal",
                "to_club": "Santos",
                "season": "2025/26",
                "fee": "Free Transfer",
                "transfer_type": "Return",
            },
            {
                "player": players["Kylian Mbappé"],
                "from_club": "Paris Saint-Germain",
                "to_club": "Real Madrid",
                "season": "2024/25",
                "fee": "Free Transfer",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Luka Modrić"],
                "from_club": "Real Madrid",
                "to_club": "AC Milan",
                "season": "2025/26",
                "fee": "Free Transfer",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Kevin De Bruyne"],
                "from_club": "Manchester City",
                "to_club": "Napoli",
                "season": "2025/26",
                "fee": "Free Transfer",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Neymar Jr"],
                "from_club": "Santos",
                "to_club": "Al Hilal",
                "season": "2023/24",
                "fee": "€90M",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Neymar Jr"],
                "from_club": "Paris Saint-Germain",
                "to_club": "Al Hilal",
                "season": "2023/24",
                "fee": "€90M",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Virgil van Dijk"],
                "from_club": "Southampton",
                "to_club": "Liverpool",
                "season": "2017/18",
                "fee": "€84M",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Luka Modrić"],
                "from_club": "Tottenham Hotspur",
                "to_club": "Real Madrid",
                "season": "2012/13",
                "fee": "€35M",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Kylian Mbappé"],
                "from_club": "AS Monaco",
                "to_club": "Paris Saint-Germain",
                "season": "2017/18",
                "fee": "€180M",
                "transfer_type": "Transfer",
            },
            {
                "player": players["Cristiano Ronaldo"],
                "from_club": "Manchester United",
                "to_club": "Real Madrid",
                "season": "2009/10",
                "fee": "€94M",
                "transfer_type": "Transfer",
            },
        ]

        for data in transfers_data:
            Transfer.objects.create(**data)

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(transfers_data)} transfers."
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "\nFootball Universe database seeded successfully!"
            )
        )