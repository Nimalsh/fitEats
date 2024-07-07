import 'package:delivery/components/my_button.dart';
import 'package:flutter/material.dart';
import '../components/my_textfield.dart';

class RegisterDetailsPage extends StatefulWidget {
  final void Function() onBack;
  final void Function() onNext;

  RegisterDetailsPage({
    Key? key,
    required this.onBack,
    required this.onNext,
  }) : super(key: key);

  @override
  State<RegisterDetailsPage> createState() => _RegisterDetailsPageState();
}

class _RegisterDetailsPageState extends State<RegisterDetailsPage> {
  final TextEditingController nationalIdController = TextEditingController();
  final TextEditingController vehicleNameController = TextEditingController();
  final TextEditingController vehicleModelController = TextEditingController();
  final TextEditingController plateNumberController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              "assets/images/Background_image.png",
              fit: BoxFit.cover,
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                padding: const EdgeInsets.fromLTRB(24.0, 40.0, 0, 0), // Adjust left padding for back icon
                child: IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: widget.onBack,
                  iconSize: 32, // Adjust icon size as needed
                ),
              ),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(24.0, 16.0, 24.0, 24.0),
                  child: Container(
                    padding: const EdgeInsets.all(24.0),
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 70, 70, 70).withOpacity(0.6), // Semi-transparent background color
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Image.asset(
                          "assets/images/logo.jpg",
                          width: 100,
                          height: 100,
                        ),
                        const SizedBox(height: 25),
                        Text(
                          "Register Details",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.surface,
                          ),
                        ),
                        const SizedBox(height: 25),
                        MyTextField(
                          controller: nationalIdController,
                          hintText: 'National ID',
                          obscureText: false,
                          prefixIcon: Icons.perm_identity,
                        
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: vehicleNameController,
                          hintText: 'Vehicle Name',
                          obscureText: false,
                          prefixIcon: Icons.directions_car,
                         
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: vehicleModelController,
                          hintText: 'Vehicle Model',
                          obscureText: false,
                          prefixIcon: Icons.car_rental,
                         
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: plateNumberController,
                          hintText: 'Plate Number',
                          obscureText: false,
                          prefixIcon: Icons.confirmation_number,
                         
                        ),
                         const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () {
                        // Add your upload image logic here
                      },
                      child: const Text("Upload License Image"),
                    ),
                        const SizedBox(height: 24),
                   MyButton(
                      text: "Next",
                      onTap: widget.onNext, // Call the method here
                    ),
                      
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
