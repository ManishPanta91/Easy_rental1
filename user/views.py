from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=RegisterSerializer,
        responses={
            201: UserSerializer,
            400: OpenApiResponse(
                description="Bad Request",
                response=RegisterSerializer,
            ),
        },
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.save()

        return Response(
            {
                "message": "User registered successfully.",
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    
    @extend_schema(
        request=LoginSerializer,
        responses={
            200: OpenApiResponse(
                description="Login successful",
                response=UserSerializer,
            ),
            400: OpenApiResponse(
                description="Bad Request",
                response=LoginSerializer,
            ),
            401: OpenApiResponse(
                description="Unauthorized",
                response=LoginSerializer,
            ),
        },
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(
            request=request,
            email=email,
            password=password,
        )

        if user is None:
            return Response(
                {
                    "detail": "Invalid email or password."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Login successful.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class RefreshTokenAPIView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=OpenApiResponse(
    
            description="Refresh token request",
            response={
                200: OpenApiResponse(
                    description="Token refreshed successfully",
                    response={
                        "access": "string",
                    },
                ),
                400: OpenApiResponse(
                    description="Bad Request",
                    response={
                        "detail": "Refresh token is required."
                    },
                ),
                401: OpenApiResponse(
                    description="Unauthorized",
                    response={
                        "detail": "Invalid or expired refresh token."
                    },
                ),
            },
        ),
    )
    

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {
                    "detail": "Refresh token is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            refresh = RefreshToken(refresh_token)

            return Response(
                {
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_200_OK,
            )

        except TokenError:
            return Response(
                {
                    "detail": "Invalid or expired refresh token."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            UserSerializer(request.user).data,
            status=status.HTTP_200_OK,
        )