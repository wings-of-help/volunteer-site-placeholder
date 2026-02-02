from rest_framework.permissions import SAFE_METHODS, BasePermission

from user.models import User


class IsOwnerOrReadOnly(BasePermission):
    """
    Allow read-only access to anyone,
    write access only to the owner.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj == request.user


class UserAccessPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == "list":
            return request.user.is_authenticated and request.user.is_staff and request.user.role == User.Role.ADMIN

        return True

    def has_object_permission(self, request, view, obj):
        if view.action == "retrieve":
            return True

        if request.user.is_staff:
            return True

        if view.action in ["update", "partial_update", "destroy"]:
            return obj == request.user

        return False