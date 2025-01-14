# Generated by Django 4.0.4 on 2022-06-03 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Spending',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, default='')),
                ('amount', models.IntegerField(blank=True, default=0)),
                ('spent_at', models.CharField(blank=True, default='0000-00-00T00:00:00', max_length=19)),
                ('currency', models.CharField(blank=True, default='USD', max_length=3)),
            ],
        ),
    ]
