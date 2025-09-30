from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users (Superhelden)
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='Marvel'),
            User(email='captainamerica@marvel.com', name='Captain America', team='Marvel'),
            User(email='spiderman@marvel.com', name='Spider-Man', team='Marvel'),
            User(email='batman@dc.com', name='Batman', team='DC'),
            User(email='superman@dc.com', name='Superman', team='DC'),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team='DC'),
        ]
        User.objects.bulk_create(users)

        # Activities
        activities = [
            Activity(user='Iron Man', type='Running', duration=30, date=date(2025, 9, 29)),
            Activity(user='Captain America', type='Cycling', duration=45, date=date(2025, 9, 28)),
            Activity(user='Spider-Man', type='Swimming', duration=25, date=date(2025, 9, 27)),
            Activity(user='Batman', type='Running', duration=40, date=date(2025, 9, 29)),
            Activity(user='Superman', type='Cycling', duration=60, date=date(2025, 9, 28)),
            Activity(user='Wonder Woman', type='Swimming', duration=35, date=date(2025, 9, 27)),
        ]
        Activity.objects.bulk_create(activities)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=100)
        Leaderboard.objects.create(team='DC', points=120)

        # Workouts
        workouts = [
            Workout(name='Hero HIIT', description='High intensity interval training for heroes.', difficulty='Hard'),
            Workout(name='Power Yoga', description='Yoga for strength and flexibility.', difficulty='Medium'),
            Workout(name='Speed Run', description='Sprint training for speedsters.', difficulty='Easy'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Testdaten erfolgreich in octofit_db eingefügt.'))
