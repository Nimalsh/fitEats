import 'package:flutter/material.dart';

class MyDropdown extends StatelessWidget {
  final String? value;
  final String hintText;
  final List<String> items;
  final IconData prefixIcon;
  final void Function(String?) onChanged;

  const MyDropdown({
    Key? key,
    required this.value,
    required this.hintText,
    required this.items,
    required this.prefixIcon,
    required this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.2),
        border: Border.all(color: Colors.white),
        borderRadius: BorderRadius.circular(20),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          isExpanded: true,
          hint: Row(
            children: [
              Icon(prefixIcon, color: const Color.fromARGB(255, 8, 7, 7)),
              const SizedBox(width: 12),
              Text(
                hintText,
                style: const TextStyle(color: Color.fromARGB(255, 250, 249, 249)),
              ),
            ],
          ),
          items: items.map((String value) {
            return DropdownMenuItem<String>(
              value: value,
              child: Text(value),
            );
          }).toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }
}
