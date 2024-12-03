import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/meal_article_model.dart';


class MealArticleService {
  final String baseUrl = 'http://10.0.3.2:5454/articles';

  Future<List<MealArticle>> fetchAllArticles() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => MealArticle.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch articles');
    }
  }

  Future<MealArticle> fetchArticleById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return MealArticle.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to fetch article');
    }
  }

  Future<void> deleteArticle(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete article');
    }
  }
}
