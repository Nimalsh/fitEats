import 'package:flutter/material.dart';

class HelpPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 251, 251, 251),
        elevation: 5,
        title: const Text(
          "Help",
          style: TextStyle(
            color: Color.fromARGB(255, 3, 3, 3),
            fontFamily: 'Poppins',
            fontWeight: FontWeight.bold,
            fontSize: 24,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color.fromARGB(255, 3, 3, 3)),
          onPressed: () {
            Navigator.pop(context); // Navigate back to the previous screen
          },
        ),
      ),
      body: Stack(
        children: [
          // Background image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Background_image.png'), // Replace with your background image path
                fit: BoxFit.cover,
              ),
            ),
          ),
          // White container with some transparency to show the background image
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: SingleChildScrollView(
              child: Container(
                padding: const EdgeInsets.all(20.0),
                color: Colors.white.withOpacity(0.9),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildSectionTitle('FAQ'),
                    _buildHelpItem(context, 'General Questions', 'Learn more about using the app.'),
                    _buildHelpItem(context, 'Account Management', 'How to manage your account.'),
                    _buildHelpItem(context, 'Earnings and Payments', 'Understand your earnings.'),
                    _buildHelpItem(context, 'Order Handling', 'Instructions on handling orders.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Tutorial Videos'),
                    _buildHelpItem(context, 'Getting Started', 'Watch tutorials for new drivers.'),
                    _buildHelpItem(context, 'Advanced Features', 'Learn about advanced app features.'),
                    _buildHelpItem(context, 'Safety Tips', 'Safety measures and best practices.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Contact Support'),
                    _buildHelpItem(context, 'Live Chat', 'Chat with support.'),
                    _buildHelpItem(context, 'Email Support', 'Send an email to support.'),
                    _buildHelpItem(context, 'Phone Support', 'Call support directly.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Complaint Section'),
                    _buildHelpItem(context, 'File a Complaint', 'Submit a complaint.'),
                    _buildHelpItem(context, 'Complaint Status', 'Check the status of your complaint.'),
                    _buildHelpItem(context, 'Feedback', 'Provide your feedback.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Guides and Resources'),
                    _buildHelpItem(context, 'Delivery Best Practices', 'Tips for efficient deliveries.'),
                    _buildHelpItem(context, 'Legal and Safety Information', 'Legal and safety guidelines.'),
                    _buildHelpItem(context, 'Vehicle Maintenance Tips', 'Keep your vehicle in good condition.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Community Forum'),
                    _buildHelpItem(context, 'Discussion Boards', 'Connect with other drivers.'),
                    _buildHelpItem(context, 'Announcements', 'Updates and important news.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Troubleshooting'),
                    _buildHelpItem(context, 'Common Issues', 'Solutions to common issues.'),
                    _buildHelpItem(context, 'App Updates', 'Learn about the latest app updates.'),
                    _buildHelpItem(context, 'Network Problems', 'Tips for dealing with connectivity issues.'),

                    const SizedBox(height: 20),

                    _buildSectionTitle('Policy and Terms'),
                    _buildHelpItem(context, 'Terms of Service', 'Read the terms of service.'),
                    _buildHelpItem(context, 'Privacy Policy', 'Learn about our privacy policy.'),
                    _buildHelpItem(context, 'Community Guidelines', 'Read the community guidelines.'),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          fontFamily: 'Poppins',
        ),
      ),
    );
  }

  Widget _buildHelpItem(BuildContext context, String title, String description) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: ListTile(
        title: Text(
          title,
          style: const TextStyle(
            fontFamily: 'Poppins',
            fontWeight: FontWeight.bold,
          ),
        ),
        subtitle: Text(
          description,
          style: const TextStyle(
            fontFamily: 'Poppins',
          ),
        ),
        trailing: const Icon(Icons.arrow_forward_ios),
        onTap: () {
          // Navigate to detailed help item page
        },
      ),
    );
  }
}
