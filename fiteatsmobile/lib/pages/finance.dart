import 'package:flutter/material.dart';

class FinancePage extends StatefulWidget {
  final int userId;

  const FinancePage({super.key, required this.userId});

  @override
  State<FinancePage> createState() => _FinancePageState();
}

class _FinancePageState extends State<FinancePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 251, 251, 251),
        elevation: 5,
        title: const Text(
          "Finance",
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
                    // Combined container for earnings
                    
                    // Container for deliveries
                    _buildDeliveriesContainer(
                      completedToday: 5, // Replace with dynamic data
                      completedThisWeek: 25, // Replace with dynamic data
                      completedThisMonth: 100, // Replace with dynamic data
                      cancelled: 3, // Replace with dynamic data
                    ),
                    const SizedBox(height: 20),
                    
                    // Container for amount paid
                    _buildAmountPaidContainer(
                      paidByCash: "\$300.00", // Replace with dynamic data
                      paidByCard: "\$700.00", // Replace with dynamic data
                    ),
                    const SizedBox(height: 20),

                    // Container for tips
                    _buildTipsContainer(
                      tipsGiven: "\$50.00", // Replace with dynamic data
                    ),
                    const SizedBox(height: 20),
                    
                    // Container for amount left to be transferred
                    _buildAmountLeftContainer(
                      amountLeft: "\$500.00", // Replace with dynamic data
                    ),
                    const SizedBox(height: 20),
                    
                    // Button for transferring earnings
                    Align(
                      alignment: Alignment.center,
                      child: ElevatedButton(
                        onPressed: () {
                          // Add your transfer logic here
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(255, 20, 193, 49),
                        ),
                        child: const Text(
                          'Transfer Earnings',
                          style: TextStyle(
                            fontFamily: 'Poppins',
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCombinedEarningsContainer({
    required String todayEarnings,
    required String weekEarnings,
    required String monthEarnings,
  }) {
    return Container(
      padding: const EdgeInsets.all(16.0),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Earnings",
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          _buildEarningsDetailRow('Today\'s Earnings', todayEarnings),
          _buildEarningsDetailRow('This Week\'s Earnings', weekEarnings),
          _buildEarningsDetailRow('Current Month\'s Earnings', monthEarnings),
        ],
      ),
    );
  }

  Widget _buildDeliveriesContainer({
    required int completedToday,
    required int completedThisWeek,
    required int completedThisMonth,
    required int cancelled,
  }) {
    return Container(
      padding: const EdgeInsets.all(16.0),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Deliveries",
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          _buildDeliveriesDetailRow('Completed Today', completedToday.toString()),
          _buildDeliveriesDetailRow('Completed This Week', completedThisWeek.toString()),
          _buildDeliveriesDetailRow('Completed This Month', completedThisMonth.toString()),
          _buildDeliveriesDetailRow('Cancelled Deliveries', cancelled.toString()),
        ],
      ),
    );
  }

  Widget _buildAmountPaidContainer({
    required String paidByCash,
    required String paidByCard,
  }) {
    return Container(
      padding: const EdgeInsets.all(16.0),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Payments",
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          _buildPaymentDetailRow('Amount Paid by Cash', paidByCash),
          _buildPaymentDetailRow('Amount Paid by Card', paidByCard),
        ],
      ),
    );
  }

  Widget _buildTipsContainer({required String tipsGiven}) {
    return Container(
      padding: const EdgeInsets.all(16.0),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Tips",
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            tipsGiven,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color.fromARGB(255, 20, 193, 49),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAmountLeftContainer({required String amountLeft}) {
    return Container(
      padding: const EdgeInsets.all(16.0),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Amount Left to be Transferred",
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            amountLeft,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color.fromARGB(255, 20, 193, 49),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEarningsDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDeliveriesDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }
}
