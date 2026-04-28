import 'package:firebase_core/firebase_core.dart';

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    return android;
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789000:android:abcdefghijklmnopqrst',
    messagingSenderId: '123456789000',
    projectId: 'lifeline-ai',
    databaseURL: 'https://lifeline-ai.firebaseio.com',
    storageBucket: 'lifeline-ai.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789000:ios:abcdefghijklmnopqrst',
    messagingSenderId: '123456789000',
    projectId: 'lifeline-ai',
    databaseURL: 'https://lifeline-ai.firebaseio.com',
    storageBucket: 'lifeline-ai.appspot.com',
    iosBundleId: 'com.lifeline.ai',
  );

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789000:web:abcdefghijklmnopqrst',
    messagingSenderId: '123456789000',
    projectId: 'lifeline-ai',
    databaseURL: 'https://lifeline-ai.firebaseio.com',
    storageBucket: 'lifeline-ai.appspot.com',
    authDomain: 'lifeline-ai.firebaseapp.com',
  );
}
