import 'dart:async';
import 'package:http/http.dart' as http;
import 'dart:convert';

class NotificationService {
  final String baseUrl;
  final int driverId;
  late Timer _timer;

  NotificationService({required this.baseUrl, required this.driverId});

  // Poll the server every 5 seconds
  void startPollingNotifications(Function(String) onNotificationReceived) {
    _timer = Timer.periodic(Duration(seconds: 5), (Timer timer) async {
      try {
        final response = await http.get(
          Uri.parse('$baseUrl/api/notifications/driver/$driverId'),
        );

        // Print the response body to debug the API structure
        print('Response body: ${response.body}');

        if (response.statusCode == 200) {
          // Check if the response is a list or a map
          final parsed = jsonDecode(response.body);
          
          if (parsed is List) {
            // Iterate over the list if it's a List
            for (var notification in parsed) {
              if (notification is Map<String, dynamic> && notification.containsKey('message')) {
                onNotificationReceived(notification['message']);
              }
            }
          } else if (parsed is Map<String, dynamic> && parsed.containsKey('message')) {
            // Handle a single notification if the response is a Map
            onNotificationReceived(parsed['message']);
          } else {
            print('Unexpected response format: $parsed');
          }
        } else {
          print('Failed to fetch notifications: ${response.statusCode}');
        }
      } catch (e) {
        print('Error while polling notifications: $e');
      }
    });
  }
 

  Future<void> respondToNotification(String status) async {
  try {
    final response = await http.post(
      Uri.parse('$baseUrl/api/notifications/driver-response'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'driverId': driverId,
        'status': status,
      }),
    );

    if (response.statusCode == 200) {
      print('Response recorded successfully: ${response.body}');
    } else {
      print('Failed to record response with status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  } catch (e) {
    print('Error sending response: $e');
  }
}



  void stopPollingNotifications() {
    _timer.cancel();
  }
}
