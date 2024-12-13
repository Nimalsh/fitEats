// nutritionist.dart (Model)

class Nutritionist {
  final int id;
  final String name;
  final String photo;
  final String qualifications;
  final List<String> specializations;

  Nutritionist({
    required this.id,
    required this.name,
    required this.photo,
    required this.qualifications,
    required this.specializations,
  });

  factory Nutritionist.fromJson(Map<String, dynamic> json) {
    return Nutritionist(
      id: json['id'],
      name: json['name'],
      photo: json['photo'],
      qualifications: json['qualifications'],
      specializations: List<String>.from(json['specializations']),
    );
  }
}
