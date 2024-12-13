class UserDetails {
  final int id;
  final int userId;
  final String username;
  final double currentWeight;
  final int age;
  final double height;
  final double bmi;
  final String gender;
  final String dietaryPreferences;
  final String dietaryRestrictions;
  final String specials;
  final String activityLevel;

  UserDetails({
    required this.id,
    required this.userId,
    required this.username,
    required this.currentWeight,
    required this.age,
    required this.height,
    required this.bmi,
    required this.gender,
    required this.dietaryPreferences,
    required this.dietaryRestrictions,
    required this.specials,
    required this.activityLevel,
  });

  factory UserDetails.fromJson(Map<String, dynamic> json) {
    return UserDetails(
      id: json['id'],
      userId: json['userId'],
      username: json['username'],
      currentWeight: json['currentWeight'],
      age: json['age'],
      height: json['height'],
      bmi: json['bmi'],
      gender: json['gender'],
      dietaryPreferences: json['dietaryPreferences'],
      dietaryRestrictions: json['dietaryRestrictions'],
      specials: json['specials'],
      activityLevel: json['activityLevel'],
    );
  }
}
