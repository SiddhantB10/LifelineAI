import { randomUUID } from 'node:crypto';
import { demoUsers } from '../data/demo.js';

export async function signup(req, res) {
  const { name, email, phone, role = 'citizen' } = req.body ?? {};

  const user = {
    id: randomUUID(),
    name: name || 'New User',
    phone: phone || '+91 90000 00000',
    email: email || `${Date.now()}@lifeline.test`,
    role,
    created_at: new Date().toISOString(),
  };

  demoUsers.push(user);

  res.status(201).json({ message: 'Account created', user, token: `demo.${user.id}.token` });
}

export async function login(req, res) {
  const { email, role = 'citizen' } = req.body ?? {};
  const user = demoUsers.find((entry) => entry.email === email && entry.role === role) ?? demoUsers[0];

  res.json({ message: 'Signed in', user, token: `demo.${user.id}.token` });
}
