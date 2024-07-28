import 'package:flutter/material.dart';

class PersonalizePlanPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Personalize Plan'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'New Plan'),
              Tab(text: 'My Plan'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            NewPlanSection(),
            MyPlanSection(),
          ],
        ),
      ),
    );
  }
}

class NewPlanSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Top Image
          Container(
            height: MediaQuery.of(context).size.height * 0.5,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/image/nutrigoals.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          // New Plan Section
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  'New Plan',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 16),
                buildGoalRow(context),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildGoalRow(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        buildGoalButton(context, 'Weight\n Loss\nGoal', Icons.trending_down),
        buildGoalButton(context, 'Weight\n Gain\nGoal', Icons.trending_up),
        buildGoalButton(context, 'Other\nGoal\n', Icons.more_horiz),
      ],
    );
  }

  Widget buildGoalButton(BuildContext context, String title, IconData icon) {
    return ElevatedButton(
      onPressed: () {
        // Handle button press
      },
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.all(16.0),
        backgroundColor: Colors.greenAccent, // Button color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        iconColor: Colors.white, // Text and icon color
        textStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        minimumSize: Size(120, 120), // Set a minimum size for the button
        shadowColor: Colors.black, // Add shadow color for hover effect
        elevation: 10, // Elevation for the button
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 40),
          SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class MyPlanSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Map<String, String>> plans = [
      {
        'id': '1',
        'requestPlan': 'Weight Loss',
        'nutritionist': 'John Doe',
        'requestDate': '2023-07-10',
        'status': 'Pending'
      },
      {
        'id': '2',
        'requestPlan': 'Weight Gain',
        'nutritionist': 'Jane Smith',
        'requestDate': '2023-06-20',
        'status': 'In Progress'
      },
      {
        'id': '3',
        'requestPlan': 'Other',
        'nutritionist': 'Emily Davis',
        'requestDate': '2023-05-15',
        'status': 'Completed'
      },
      {
        'id': '4',
        'requestPlan': 'Weight Gain',
        'nutritionist': 'Jane Smith',
        'requestDate': '2023-06-20',
        'status': 'In Progress'
      },
      {
        'id': '5',
        'requestPlan': 'Weight Gain',
        'nutritionist': 'Jane Smith',
        'requestDate': '2023-06-20',
        'status': 'Completed'
      },
    ];

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'My Plan',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            ...plans.map((plan) {
              return Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                ),
                elevation: 5,
                margin: EdgeInsets.symmetric(vertical: 8.0),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('ID: ${plan['id']}', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                      SizedBox(height: 8),
                      Text('Request Plan: ${plan['requestPlan']}', style: TextStyle(fontSize: 14)),
                      Text('Nutritionist: ${plan['nutritionist']}', style: TextStyle(fontSize: 14)),
                      Text('Request Date: ${plan['requestDate']}', style: TextStyle(fontSize: 14)),
                      Text(
                        'Status: ${plan['status']}',
                        style: TextStyle(
                          fontSize: 14,
                          color: _getStatusColor(plan['status']),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      if (plan['status'] == 'Completed') // Conditionally display the button
                        Align(
                          alignment: Alignment.centerRight,
                          child: ElevatedButton(
                            onPressed: () {
                              // Handle view button press
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.greenAccent,
                            ),
                            child: Text('View'),
                          ),
                        ),
                       //add the else part 
                    ],
                  ),
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(String? status) {
    switch (status) {
      case 'Pending':
        return Colors.orange;
      case 'In Progress':
        return Colors.blue;
      case 'Completed':
        return Colors.green;
      default:
        return Colors.black;
    }
  }
}
