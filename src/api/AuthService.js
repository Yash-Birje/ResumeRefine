import { User } from "lucide-react";

//delay function to simulate network request
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//get user function
export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
}

// Generate simulated JWT token
const generateToken = (userId, email) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ userId, email, iat: Date.now() }));
  const signature = btoa('simulated & signed');
  return `${header}.${payload}.${signature}`;
};

//decode token function
const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

/**
 * Register new user
 * @param {string} name - Full name
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */

export const register = async (name, email, password) => {
  // Simulate network delay
  await delay(500);

  // Validate name
  if (!name || name.trim().length < 2) {
    return { success: false, error: 'Name is required and must be at least 2 characters' };
  }
  if (name.length > 50) {
    return { success: false, error: 'Name must be less than 50 characters' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // Validate password
  if (password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long' };
  }
  if (!/\d/.test(password)) {
    return { success: false, error: 'Password must have at least one number' };
  }
  if (!/[A-Z]/.test(password)) {
    return { success: false, error: 'Password must have at least one uppercase letter' };
  }

  // Check if email already exists
  const users = getUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return { success: false, error: 'Email already registered' };
  }
}

 // Create new user
  const newUser = {
    id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase(),
    password: btoa(password), // NOT secure - for demo only
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Save user
  users.push(newUser);
  saveUsers(users);

  // Generate token
  const token = generateToken(newUser.id, newUser.email);
  localStorage.setItem('authToken', token);