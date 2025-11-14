// import { User } from "lucide-react"; huh when did i do this bruh. (^^*)

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

  const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return {
      success: true,
      user: userWithoutPassword
    };
};

/**
 * Login user
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const login = async (email, password) => {
  // Simulate network delay
  await delay(500);

  // Validate inputs
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  // Find user
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'Invalid email' };
  }

  // Verify password
  const decodedPassword = atob(user.password);
  if (decodedPassword !== password) {
    return { success: false, error: 'Invalid password' };
  }

  // Generate new token
  const token = generateToken(user.id, user.email);
  localStorage.setItem('authToken', token);

  // Store current user (without password)
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

  return {
    success: true,
    user: userWithoutPassword
  };
};

/**
 * Logout current user
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

/**
 * Validate current token and restore session
 * @returns {Promise<{valid: boolean, user?: object}>}
 */

export const validateToken = async () => {
  // Simulate network delay
  await delay(300);

  const token = localStorage.getItem('authToken');

  if (!token) {
    return { valid: false };
  }

  // Decode token
  const payload = decodeToken(token);
  if (!payload || !payload.userId || !payload.email) {
    // Invalid token format
    logout();
    return { valid: false };
  }

  // Check if user still exists
  const users = getUsers();
  const user = users.find(u => u.id === payload.userId);

  if (!user) {
    // User no longer exists
    logout();
    return { valid: false };
  }

  // Get current user from localStorage
  const currentUserStr = localStorage.getItem('currentUser');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  if (!currentUser) {
    // No current user stored, reconstruct from token
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return { valid: true, user: userWithoutPassword };
  }

  return { valid: true, user: currentUser };
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {object} updates - Fields to update (name, email)
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const updateUser = async (userId, updates) => {
  await delay(500);

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }

  // Validate updates
  if (updates.name && updates.name.trim().length < 2) {
    return { success: false, error: 'Name must be at least 2 characters' };
  }

  if (updates.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Check if email is taken by another user
    const emailExists = users.find(u => u.id !== userId && u.email.toLowerCase() === updates.email.toLowerCase());
    if (emailExists) {
      return { success: false, error: 'Email already in use' };
    }
  }

  // Update user
  const user = users[userIndex];
  if (updates.name) user.name = updates.name.trim();
  if (updates.email) user.email = updates.email.toLowerCase();
  user.updatedAt = new Date().toISOString();

  users[userIndex] = user;
  saveUsers(users);

  // Update current user in localStorage
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

  // Generate new token if email changed
  if (updates.email) {
    const token = generateToken(user.id, user.email);
    localStorage.setItem('authToken', token);
  }

  return {
    success: true,
    user: userWithoutPassword
  };
};