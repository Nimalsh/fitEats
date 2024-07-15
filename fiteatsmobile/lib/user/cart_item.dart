import 'food_ordering.dart'; // Make sure this is the correct import path to FoodItem class

class CartItem {
  final FoodItem foodItem;
  final List<String> customizations;

  CartItem({required this.foodItem, required this.customizations});
}
