class MealArticle {
  final int id;
  final String title;
  final String content;
  final String author;
  final String publishedDate;
  final String? image;

  MealArticle({
    required this.id,
    required this.title,
    required this.content,
    required this.author,
    required this.publishedDate,
    this.image,
  });

  factory MealArticle.fromJson(Map<String, dynamic> json) {
    return MealArticle(
      id: json['id'],
      title: json['title'],
      content: json['content'],
      author: json['author'],
      publishedDate: json['publishedDate'],
      image: json['image'], // Base64 string or null
    );
  }
}
