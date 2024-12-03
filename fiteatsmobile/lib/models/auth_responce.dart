class AuthResponse {
  final String jwt;
  final String message;
  final String role;

  AuthResponse({required this.jwt, required this.message, required this.role});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      jwt: json['jwt'],
      message: json['message'],
      role: json['role'],
    );
  }
}
