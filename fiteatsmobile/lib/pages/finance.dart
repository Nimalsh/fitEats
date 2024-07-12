import 'package:flutter/material.dart';

class FinancePage extends StatefulWidget {
  const FinancePage({super.key});

  @override
  State<FinancePage> createState() => _FinancePageState();
}

class _FinancePageState extends State<FinancePage> {
  double totalEarnings = 1500.0;
  double tipsReceived = 200.0;
  int cashDeliveries = 15;
  int onlineDeliveries = 30;
  double amountLeftToTransfer = 500.0;
  double earningsThisMonth = 800.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Finance'),
      ),
      body: Container(
        padding: const EdgeInsets.all(20.0),
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/Background_image.png'), // Replace with your background image path
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                _buildGroupedFinanceCard('Financial Summary', [
                  _buildFinanceDetail('Total Earnings', '\$${totalEarnings.toStringAsFixed(2)}'),
                  _buildFinanceDetail('Tips Received', '\$${tipsReceived.toStringAsFixed(2)}'),
                  _buildFinanceDetail('Amount Left to Transfer', '\$${amountLeftToTransfer.toStringAsFixed(2)}'),
                  _buildFinanceDetail('Earnings This Month', '\$${earningsThisMonth.toStringAsFixed(2)}'),
                ]),
                _buildGroupedFinanceCard('Delivery Summary', [
                  _buildFinanceDetail('Cash Deliveries', '$cashDeliveries'),
                  _buildFinanceDetail('Online Deliveries', '$onlineDeliveries'),
                ]),
                ElevatedButton(
                  onPressed: () {
                    // Add your transfer logic here
                    setState(() {
                      // Update state upon transfer
                      amountLeftToTransfer = 0.0;
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Amount transferred successfully')),
                    );
                  },
                  child: const Text('Transfer'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFinanceDetail(String title, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          Text(
            value,
            style: const TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildGroupedFinanceCard(String title, List<Widget> details) {
    return Card(
      elevation: 5,
      margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 10),
            Column(
              children: details,
            ),
          ],
        ),
      ),
    );
  }
}
