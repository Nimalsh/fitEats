class Request {
  final String id;
  final String goal;
  final String status;

  Request({required this.id, required this.goal, required this.status});

  factory Request.fromJson(Map<String, dynamic> json) {
    return Request(
      id: json['id'],
      goal: json['goal'],
      status: json['status'],
    );
  }
}
