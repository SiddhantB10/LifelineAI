import { randomUUID } from 'node:crypto';
import admin from 'firebase-admin';

// WARNING: Auth controller should be fully integrated with Firebase Authentication
// Current implementation is placeholder and needs proper Firebase Auth integration

export async function signup(req, res) {
  try {
    const { name, email, password, phone, role = 'citizen' } = req.body ?? {};

    // This should use Firebase Auth: admin.auth().createUser()
    // For now, this is a placeholder endpoint
    const user = {
      id: randomUUID(),
      name: name || 'New User',
      phone: phone || '+91 90000 00000',
      email: email || `${Date.now()}@lifeline.test`,
      role,
      created_at: new Date().toISOString(),
    };

    // Should store user in Firestore instead
    res.status(201).json({ 
      message: 'Account created - integrate with Firebase Auth', 
      user,
      warning: 'Demo mode: Use Firebase Authentication for production'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role = 'citizen' } = req.body ?? {};

    // This should use Firebase Auth: admin.auth().getUserByEmail()
    // For now, this is a placeholder endpoint
    res.json({ 
      message: 'Login endpoint - integrate with Firebase Auth',
      warning: 'Demo mode: Use Firebase Authentication for production',
      requestedEmail: email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
