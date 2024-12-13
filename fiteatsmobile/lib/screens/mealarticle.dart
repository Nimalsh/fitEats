import 'package:flutter/material.dart';
import '../models/meal_article_model.dart';
import '../services/meal_article_service.dart';


class MealArticleScreen extends StatefulWidget {
  @override
  _MealArticleScreenState createState() => _MealArticleScreenState();
}

class _MealArticleScreenState extends State<MealArticleScreen> {
  final MealArticleService _articleService = MealArticleService();
  late Future<List<MealArticle>> _articles;

  @override
  void initState() {
    super.initState();
    _articles = _articleService.fetchAllArticles();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Meal Articles'),
      ),
      body: FutureBuilder<List<MealArticle>>(
        future: _articles,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No articles available'));
          } else {
            final articles = snapshot.data!;
            return ListView.builder(
              itemCount: articles.length,
              itemBuilder: (context, index) {
                final article = articles[index];
                return Card(
                  child: ListTile(
                    title: Text(article.title),
                    subtitle: Text('By ${article.author}'),
                    onTap: () {
                      // Handle article tap
                    },
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
