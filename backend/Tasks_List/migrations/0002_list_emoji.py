# Generated by Django 5.0.4 on 2024-08-26 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tasks_List', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='emoji',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
