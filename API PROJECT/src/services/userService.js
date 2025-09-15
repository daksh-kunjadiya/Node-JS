// Mock data for demonstration
let users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 35,
    createdAt: new Date().toISOString()
  }
];

export const userService = {
  // Get all users with optional filtering
  getAllUsers: async ({ page = 1, limit = 10, search }) => {
    let filteredUsers = [...users];
    
    // Apply search filter
    if (search) {
      filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    
    return filteredUsers.slice(startIndex, endIndex);
  },

  // Get user by ID
  getUserById: async (id) => {
    return users.find(user => user.id === id);
  },

  // Create new user
  createUser: async (userData) => {
    const newUser = {
      id: (users.length + 1).toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    return newUser;
  },

  // Update user
  updateUser: async (id, updateData) => {
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return null;
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return users[userIndex];
  },

  // Delete user
  deleteUser: async (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return false;
    }
    
    users.splice(userIndex, 1);
    return true;
  }
};