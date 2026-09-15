from django.db import models


class Club(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    league = models.CharField(max_length=100)
    stadium = models.CharField(max_length=150)
    founded = models.IntegerField()
    trophies = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    colors = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Player(models.Model):
    POSITION_CHOICES = [
    ("GK", "Goalkeeper"),

    ("LB", "Left Back"),
    ("CB", "Center Back"),
    ("RB", "Right Back"),
    ("LWB", "Left Wing Back"),
    ("RWB", "Right Wing Back"),

    ("CDM", "Defensive Midfielder"),
    ("CM", "Central Midfielder"),
    ("CAM", "Attacking Midfielder"),
    ("LM", "Left Midfielder"),
    ("RM", "Right Midfielder"),

    ("LW", "Left Winger"),
    ("RW", "Right Winger"),
    ("ST", "Striker"),
    ("CF", "Center Forward"),
]

    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    position = models.CharField(
    max_length=5,
    choices=POSITION_CHOICES
    )
    shirt_number = models.IntegerField(default=0)

    club = models.ForeignKey(
        Club,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="players"
    )

    appearances = models.IntegerField(default=0)
    goals = models.IntegerField(default=0)
    assists = models.IntegerField(default=0)
    trophies = models.IntegerField(default=0)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Competition(models.Model):
    TYPE_CHOICES = [
        ("Club", "Club"),
        ("National", "National"),
    ]

    name = models.CharField(max_length=150)
    country = models.CharField(max_length=100)
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES
    )
    founded = models.IntegerField()
    teams = models.IntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Transfer(models.Model):
    TRANSFER_TYPES = [
        ("Transfer", "Transfer"),
        ("Return", "Return"),
        ("Loan", "Loan"),
    ]

    player = models.ForeignKey(
        Player,
        on_delete=models.CASCADE,
        related_name="transfers"
    )
    from_club = models.CharField(max_length=100)
    to_club = models.CharField(max_length=100)
    season = models.CharField(max_length=20)
    fee = models.CharField(max_length=50)

    transfer_type = models.CharField(
        max_length=20,
        choices=TRANSFER_TYPES
    )

    def __str__(self):
        return f"{self.player.name} - {self.to_club}"
    
    
class TimelineEvent(models.Model):
    CATEGORY_CHOICES = [
        ("Club", "Club"),
        ("World Cup", "World Cup"),
        ("Player", "Player"),
    ]

    year = models.IntegerField()
    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )
    title = models.CharField(max_length=200)
    description = models.TextField()

    class Meta:
        ordering = ["year"]

    def __str__(self):
        return f"{self.year} - {self.title}"