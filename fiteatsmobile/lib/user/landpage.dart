import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class LandingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Fit Eats Overview'),
        actions: [
          IconButton(
            icon: Icon(Icons.person),
            onPressed: () {
              // Navigate to profile page or show profile info
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Overview Section
              Text(
                'Welcome to Fit Eats',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'Fit Eats is your personal nutrition assistant, helping you track your meals, plan your diet, and maintain a healthy lifestyle.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 16),
              
              // Orders, Meal Plan, Complaints Section
            SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  child: Row(
    children: [
      buildInfoCard('All Orders', '120', Icons.shopping_cart),
      buildInfoCard('Meal Plans', '85', Icons.restaurant),
      buildInfoCard('Complaints', '3', Icons.report_problem),
    ],
  ),
),
              SizedBox(height: 16),

            Padding(
  padding: const EdgeInsets.all(3.0),
  child: Container(
    height: 200,
    child: LineChart(
      LineChartData(
        gridData: FlGridData(show: true),
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            axisNameWidget: Text(
              'Progress',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
            ),
            axisNameSize: 30,
            sideTitles: SideTitles(
              showTitles: true,
              interval: 10,
              getTitlesWidget: (value, meta) {
                return Text(
                  '${value.toInt()}%',
                  style: TextStyle(fontSize: 10),
                );
              },
            ),
          ),
          bottomTitles: AxisTitles(
            axisNameWidget: Text(
              'Weeks',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
            ),
            axisNameSize: 30,
            sideTitles: SideTitles(
              showTitles: true,
              interval: 1,
              getTitlesWidget: (value, meta) {
                return Text(
                  'Week ${value.toInt()}',
                  style: TextStyle(fontSize: 10),
                );
              },
            ),
          ),
        ),
        borderData: FlBorderData(show: true),
        lineBarsData: [
          LineChartBarData(
            spots: [
              FlSpot(1, 10),
              FlSpot(2, 20),
              FlSpot(3, 30),
              FlSpot(4, 40),
              FlSpot(5, 50),
              FlSpot(6, 60),
              FlSpot(7, 70),
            ],
            isCurved: true,
            color: Colors.blue,
            barWidth: 3,
            belowBarData: BarAreaData(show: false),
          ),
        ],
      ),
    ),
  ),
),
              // Orders Pie Chart Section
              Text(
                'Most Ordered Items ',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Container(
                height: 200,
                child: PieChart(
                  PieChartData(
                    sections: [
                      PieChartSectionData(
                        value: 40,
                        title: 'Burger',
                        color: Colors.red,
                      ),
                      PieChartSectionData(
                        value: 30,
                        title: 'Pizza',
                        color: Colors.green,
                      ),
                      PieChartSectionData(
                        value: 20,
                        title: 'Salad',
                        color: Colors.blue,
                      ),
                      PieChartSectionData(
                        value: 5,
                        title: 'Pasta',
                        color: Colors.yellow,
                      ),
                      PieChartSectionData(
                        value: 5,
                        title: 'Soda',
                        color: Colors.orange,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

Widget buildInfoCard(String title, String count, IconData icon) {
  return Card(
    elevation: 4,
    margin: EdgeInsets.all(8),
    child: Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 40,
            color: Colors.green,
          ),
          SizedBox(height: 8),
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 4),
          Text(
            count,
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    ),
  );
}
 
}
