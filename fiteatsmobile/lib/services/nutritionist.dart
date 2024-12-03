// nutritionist_service.dart (Service)

import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/nutritionist.dart';


class NutritionistService {
  final String baseUrl;

  NutritionistService({required this.baseUrl});

  // Fetch all nutritionists from the backend
  Future<List<Nutritionist>> fetchNutritionists() async {
    final response = await http.get(Uri.parse('$baseUrl/api/nutritionists'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Nutritionist.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load nutritionists');
    }
  }

  // Fetch nutritionist by ID
  Future<Nutritionist> fetchNutritionistById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/api/nutritionists/$id'));

    if (response.statusCode == 200) {
      return Nutritionist.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load nutritionist');
    }
  }
}
