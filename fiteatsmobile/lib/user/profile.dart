import 'package:flutter/material.dart';
import 'calories_count.dart';
import 'cartDetails.dart';
import 'diet_plan.dart';
import 'feedback.dart';
import 'menu.dart';
import 'status.dart';


class ProfilePage extends StatefulWidget {
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  int _selectedIndex = 0;
  PageController _pageController = PageController();

  static final List<Widget> _widgetOptions = <Widget>[
    Center(child: ProfileContent()),
    DailyCaloriesPage(),
    StatusPage(),
    DietPlanPage(),
    FeedbackPage(),
    // CartItem(foodItem: null, customizations: []),
    // Center(child: Text('Feedbacks')),
  ];
  


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    _pageController.jumpToPage(index);
    
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.green,
        title: const Text("My Profile"),
        leading: Builder(
          builder: (BuildContext context) {
            return IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
            );
          },
        ),
      ),
      drawer: MenuDrawer(),
      body: PageView(
        controller: _pageController,
        
        children: _widgetOptions,
        onPageChanged: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home,),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_dining ,),
            label: 'Daily Calorie',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.details_outlined,),
            label: 'Status',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.food_bank),
            label: 'diet plan',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.feedback),
            label: 'Feedbacks',
          ),
        ],
         currentIndex: _selectedIndex,
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
      ),
    );
  }
}





class ProfileContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 40,
                backgroundImage: AssetImage("assets/image/profile.jpg"),
              ),
              SizedBox(width: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Thushi',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    'Age: 23',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                ],
              ),
            ],
          ),
          SizedBox(height: 20),
          Text(
            'Calorie Count: 2000',
            style: TextStyle(fontSize: 18),
          ),
          Text(
            'BMI: 22.5',
            style: TextStyle(fontSize: 18),
          ),
          Text(
            'Diet Goal: Maintain weight',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(height: 20),
          Expanded(child: Container()),
           // Filler to push bottom nav bar down
        ],
      ),
    );
  }
}
