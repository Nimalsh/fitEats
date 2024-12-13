import 'package:flutter/material.dart';

class PaymentPage extends StatefulWidget {
  @override
  _PaymentPageState createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  final TextEditingController _cardNumberController = TextEditingController();
  final TextEditingController _expiryDateController = TextEditingController();
  final TextEditingController _cvvController = TextEditingController();
  final TextEditingController _cardHolderController = TextEditingController();

  String selectedPaymentMethod = 'Credit Card';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Payment'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Select Payment Method',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            _buildPaymentMethodRadio('Credit Card', Icons.credit_card),
            _buildPaymentMethodRadio('Debit Card', Icons.credit_card),
            _buildPaymentMethodRadio('PayPal', Icons.account_balance_wallet),
            _buildPaymentMethodRadio('Google Pay', Icons.account_balance_wallet),
            SizedBox(height: 32),
            if (selectedPaymentMethod == 'Credit Card' || selectedPaymentMethod == 'Debit Card')
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Card Information',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 16),
                  _buildTextField(_cardNumberController, 'Card Number', Icons.credit_card),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: _buildTextField(_expiryDateController, 'Expiry Date', Icons.date_range),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: _buildTextField(_cvvController, 'CVV', Icons.lock),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  _buildTextField(_cardHolderController, 'Card Holder Name', Icons.person),
                  SizedBox(height: 32),
                ],
              ),
            Center(
              child: ElevatedButton(
                onPressed: () {
                  // Handle payment action
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
                  textStyle: TextStyle(fontSize: 18),
                ),
                child: Text('Pay Now'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPaymentMethodRadio(String method, IconData icon) {
    return RadioListTile<String>(
      value: method,
      groupValue: selectedPaymentMethod,
      title: Row(
        children: [
          Icon(icon, color: Colors.blue),
          SizedBox(width: 8),
          Text(method),
        ],
      ),
      onChanged: (String? value) {
        setState(() {
          selectedPaymentMethod = value!;
        });
      },
    );
  }

  Widget _buildTextField(TextEditingController controller, String label, IconData icon) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
      ),
      keyboardType: label == 'Card Number' || label == 'CVV' ? TextInputType.number : TextInputType.text,
    );
  }
}
