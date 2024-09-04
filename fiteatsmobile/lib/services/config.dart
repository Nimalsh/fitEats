// lib/config.dart

class Config {
  static const String defaultBaseUrl = 'http://10.0.3.2:8080'; // Default base URL
  static const String previewBaseUrl = 'http://localhost:8080'; // Base URL for Device Preview or other environments

  static String getBaseUrl() {
    if (const bool.fromEnvironment('USE_EMULATOR')) {
      return 'http://10.0.3.2:8080'; // Base URL for Genymotion emulator
    } else if (const bool.fromEnvironment('USE_PREVIEW')) {
      return previewBaseUrl; // Base URL for Device Preview
    }
    return defaultBaseUrl;
  }
}
