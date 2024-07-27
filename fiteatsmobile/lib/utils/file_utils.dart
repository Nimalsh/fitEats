// lib/utils/file_utils.dart

import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'package:path/path.dart'; // Import to use the basename function

Future<String> saveImagePermanently(String imagePath) async {
  final directory = await getApplicationDocumentsDirectory();
  final name = basename(imagePath);
  final image = File('${directory.path}/$name');

  return File(imagePath).copy(image.path).then((File newImage) {
    return newImage.path;
  });
}
