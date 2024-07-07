import 'package:flutter/material.dart';
import 'light_mode.dart' as lightModeFile;
import 'dark_mode.dart' as darkModeFile;

class ThemeProvider extends ChangeNotifier {
  ThemeData _themeData = lightModeFile.lightMode;

  ThemeData get themeData => _themeData;

  void toggleTheme() {
    _themeData = _themeData == lightModeFile.lightMode ? darkModeFile.darkMode : lightModeFile.lightMode;
    notifyListeners();
  }
}
