import 'package:flutter/material.dart';

class ViewPlanPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('View Plan'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Diet Goals',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              '1. Maintain weight\n2. Eat balanced meals\n3. Avoid processed foods',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            Text(
              'Duration: 3 Months',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            Text(
              'Nutritionist Recommendations',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              '1. Drink at least 8 glasses of water daily\n2. Include vegetables in every meal\n3. Reduce sugar intake',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            Text(
              'Diet Plan',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Expanded(
              child: SingleChildScrollView(
                child: DataTable(
                  columns: [
                    DataColumn(label: Text('Day', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
                    DataColumn(label: Text('Meal', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
                    DataColumn(label: Text('Details', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
                  ],
                  rows: [
                    DataRow(cells: [
                      DataCell(Text('Monday')),
                      DataCell(Text('Breakfast')),
                      DataCell(Text('Oatmeal and fruit')),
                    ]),
                    DataRow(cells: [
                      DataCell(Text('Monday')),
                      DataCell(Text('Lunch')),
                      DataCell(Text('Grilled chicken salad')),
                    ]),
                    DataRow(cells: [
                      DataCell(Text('Monday')),
                      DataCell(Text('Dinner')),
                      DataCell(Text('Salmon and vegetables')),
                    ]),
                    DataRow(cells: [
                      DataCell(Text('Tuesday')),
                      DataCell(Text('Breakfast')),
                      DataCell(Text('Smoothie and toast')),
                    ]),
                    DataRow(cells: [
                      DataCell(Text('Tuesday')),
                      DataCell(Text('Lunch')),
                      DataCell(Text('Turkey sandwich')),
                    ]),
                    DataRow(cells: [
                      DataCell(Text('Tuesday')),
                      DataCell(Text('Dinner')),
                      DataCell(Text('Stir-fry with tofu')),
                    ]),
                    // Add more rows as needed
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
