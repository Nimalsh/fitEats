import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DeliveryTrackingPage extends StatefulWidget {
  
    final int userId;


  const DeliveryTrackingPage({super.key, required this.userId
   
  });

  @override
  _DeliveryTrackingPageState createState() => _DeliveryTrackingPageState();
}

class _DeliveryTrackingPageState extends State<DeliveryTrackingPage> {
  late GoogleMapController _mapController;
  final LatLng _initialPosition = const LatLng(37.7749, -122.4194); // Sample coordinates

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Delivery Tracking'),
      ),
      body: Column(
        children: [
          // Map Section
          Expanded(
            child: GoogleMap(
              initialCameraPosition: CameraPosition(
                target: _initialPosition,
                zoom: 14,
              ),
              onMapCreated: (controller) {
                _mapController = controller;
              },
              // Add markers, routes, and other map-related data here
            ),
          ),
          // Details Section
          Container(
            padding: EdgeInsets.all(16.0.w),
            color: Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Customer: ',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 0.01.sh),
                Text(
                  'Address: ',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 0.01.sh),
                Text(
                  'Order Details: ',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 0.02.sh),
                Center(
                  child: ElevatedButton(
                    onPressed: () {
                      // Implement status update logic
                    },
                    child: const Text('Update Delivery Status'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
