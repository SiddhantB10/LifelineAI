import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'firebase_options.dart';
import 'screens/auth/login_screen.dart';
import 'screens/citizen/citizen_dashboard.dart';
import 'screens/driver/driver_dashboard.dart';
import 'screens/hospital/hospital_dashboard.dart';
import 'services/firebase_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Initialize FCM
  await FirebaseService.initFCM();

  runApp(const LifelineAIApp());
}

class LifelineAIApp extends StatelessWidget {
  const LifelineAIApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lifeline AI',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFDC2626), // Red for emergency theme
          brightness: Brightness.light,
        ),
        fontFamily: 'Poppins',
      ),
      home: const AuthChecker(),
    );
  }
}

/// Checks authentication state and routes to appropriate screen
class AuthChecker extends StatelessWidget {
  const AuthChecker({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        }

        // Not authenticated
        if (!snapshot.hasData) {
          return const LoginScreen();
        }

        // User is authenticated - route based on role
        final user = snapshot.data!;
        return FutureBuilder<String?>(
          future: FirebaseService.getUserRole(user.uid),
          builder: (context, roleSnapshot) {
            if (roleSnapshot.connectionState == ConnectionState.waiting) {
              return const Scaffold(
                body: Center(
                  child: CircularProgressIndicator(),
                ),
              );
            }

            final role = roleSnapshot.data ?? 'citizen';

            // Route based on user role
            switch (role) {
              case 'driver':
                return const DriverDashboard();
              case 'hospital':
                return const HospitalDashboard();
              case 'admin':
                return const Scaffold(
                  body: Center(
                    child: Text('Admin Dashboard - Coming Soon'),
                  ),
                );
              default:
                return const CitizenDashboard();
            }
          },
        );
      },
    );
  }
}
