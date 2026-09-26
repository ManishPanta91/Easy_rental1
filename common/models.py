import uuid

from django.db import models


class BaseModel(models.Model):
    """
    Abstract base model that provides:
      - id: UUID primary key (auto-generated)
      - created_at: timestamp set once on creation
      - updated_at: timestamp updated on every save
    All app models should inherit from this instead of models.Model.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
