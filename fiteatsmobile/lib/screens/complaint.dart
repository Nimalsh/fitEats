import 'package:flutter/material.dart';

class ComplaintPage extends StatefulWidget {
  @override
  _ComplaintPageState createState() => _ComplaintPageState();
}

class _ComplaintPageState extends State<ComplaintPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Form Controllers
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _complainController = TextEditingController();

  // Sample Complaint History
  final List<Map<String, String>> complaintHistory = [
    {'description': 'Late delivery of food', 'status': 'Resolved'},
    {'description': 'Wrong order received', 'status': 'Pending'},
    {'description': 'Missing item in delivery', 'status': 'Resolved'},
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Complaints'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Complaint Form'),
            Tab(text: 'Complaint History'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildComplaintForm(),
          _buildComplaintHistory(),
        ],
      ),
    );
  }

  // Complaint Form UI
  Widget _buildComplaintForm() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Name', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          SizedBox(height: 8),
          TextField(
            controller: _nameController,
            decoration: InputDecoration(
              hintText: 'Enter your name',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            ),
          ),
          SizedBox(height: 16),
          Text('Email', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          SizedBox(height: 8),
          TextField(
            controller: _emailController,
            decoration: InputDecoration(
              hintText: 'Enter your email',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            ),
          ),
          SizedBox(height: 16),
          Text('Description', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          SizedBox(height: 8),
          TextField(
            controller: _complainController,
            decoration: InputDecoration(
              hintText: 'Describe your complaint',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            ),
            maxLines: 5,
          ),
          SizedBox(height: 20),
          Align(
            alignment: Alignment.center,
            child: ElevatedButton(
              onPressed: _submitComplaint,
              child: Text('Submit'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Complaint History UI
  Widget _buildComplaintHistory() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: ListView.builder(
        itemCount: complaintHistory.length,
        itemBuilder: (context, index) {
          final complaint = complaintHistory[index];
          return Card(
            elevation: 4.0,
            margin: EdgeInsets.symmetric(vertical: 8.0),
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    complaint['description']!,
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Status: ${complaint['status']}',
                    style: TextStyle(
                      color: complaint['status'] == 'Resolved' ? Colors.green : Colors.orange,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  // Handle Complaint Submission
  void _submitComplaint() {
    final name = _nameController.text;
    final email = _emailController.text;
    final description = _complainController.text;

    if (name.isNotEmpty && email.isNotEmpty && description.isNotEmpty) {
      // Add logic to save complaint (e.g., send to backend)
      _showSuccessDialog();
    } else {
      _showErrorDialog();
    }
  }

  // Show Success Dialog
  void _showSuccessDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Success'),
          content: Text('Your complaint has been submitted.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                _clearForm();
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  // Show Error Dialog
  void _showErrorDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Error'),
          content: Text('Please fill out all fields before submitting.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  // Clear Form Fields
  void _clearForm() {
    _nameController.clear();
    _emailController.clear();
    _complainController.clear();
  }
}
