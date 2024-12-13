// next_page.dart (Screen)

import 'package:flutter/material.dart';
import '../models/nutritionist.dart';


class NextPage extends StatelessWidget {
  final Nutritionist selectedNutritionist;

  NextPage({required this.selectedNutritionist});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(selectedNutritionist.name),
      ),
      body: Center(
        child: Text('Details about ${selectedNutritionist.name}'),
      ),
    );
  }
}
