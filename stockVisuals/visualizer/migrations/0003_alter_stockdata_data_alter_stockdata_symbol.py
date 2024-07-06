# Generated by Django 5.0.6 on 2024-07-04 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualizer', '0002_rename_financial_data_stockdata_data_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockdata',
            name='data',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='stockdata',
            name='symbol',
            field=models.TextField(default='IBM'),
            preserve_default=False,
        ),
    ]
