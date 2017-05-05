from rest_framework import serializers
from models import Transaction


class TransactionSerializer(serializers.Serializer):
    t_id = serializers.CharField(required=True)
    name = serializers.CharField(required=True, max_length=128)
    detail = serializers.CharField(required=True, max_length=2048)
    finish = serializers.BooleanField(required=True)
    expire_date = serializers.DateTimeField()
    priority = serializers.IntegerField()
    update_at = serializers.DateTimeField()

    def create(self, validated_data):
        """
        Create and return a new `Transaction` instance, given the validated data.
        """
        return Transaction.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Transaction` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.detail = validated_data.get('detail', instance.detail)
        instance.finish = validated_data.get('finish', instance.finish)
        instance.expire_date = validated_data.get('expire_date', instance.expire_date)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.update_at = validated_data.get('update_at', instance.update_at)
        instance.save()
        return instance
