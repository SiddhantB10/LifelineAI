import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class FirebaseService {
  static final _auth = FirebaseAuth.instance;
  static final _firestore = FirebaseFirestore.instance;
  static final _messaging = FirebaseMessaging.instance;

  static Future<void> initFCM() async {
    await _messaging.requestPermission(alert: true, badge: true, sound: true);
    await _messaging.getToken();
  }

  static Future<String?> getUserRole(String uid) async {
    final directSnapshot = await _firestore.collection('users').doc(uid).get();
    final directData = directSnapshot.data();
    if (directData != null && directData['role'] is String) {
      return directData['role'] as String;
    }

    final uidQuery = await _firestore.collection('users').where('uid', isEqualTo: uid).limit(1).get();
    if (uidQuery.docs.isNotEmpty) {
      final data = uidQuery.docs.first.data();
      if (data['role'] is String) {
        return data['role'] as String;
      }
    }

    final idQuery = await _firestore.collection('users').where('id', isEqualTo: uid).limit(1).get();
    if (idQuery.docs.isNotEmpty) {
      final data = idQuery.docs.first.data();
      if (data['role'] is String) {
        return data['role'] as String;
      }
    }

    final currentUserEmail = _auth.currentUser?.email;
    if (currentUserEmail != null) {
      final emailQuery = await _firestore.collection('users').where('email', isEqualTo: currentUserEmail).limit(1).get();
      if (emailQuery.docs.isNotEmpty) {
        final data = emailQuery.docs.first.data();
        if (data['role'] is String) {
          return data['role'] as String;
        }
      }
    }

    return 'citizen';
  }

  static Future<UserCredential> signInWithEmailAndPassword(
    String email,
    String password,
  ) {
    return _auth.signInWithEmailAndPassword(email: email, password: password);
  }

  static Future<UserCredential> registerWithEmailAndPassword(
    String email,
    String password,
  ) {
    return _auth.createUserWithEmailAndPassword(email: email, password: password);
  }

  static Future<void> signOut() => _auth.signOut();
}