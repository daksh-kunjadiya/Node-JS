// Mock data for demonstration
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'Electronics',
    stock: 50,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug with custom design',
    price: 15.99,
    category: 'Home & Kitchen',
    stock: 100,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily exercise',
    price: 89.99,
    category: 'Sports',
    stock: 75,
    createdAt: new Date().toISOString()
  }
];

export const productService = {
  // Get all products with optional filtering
  getAllProducts: async ({ page = 1, limit = 10, category, minPrice, maxPrice }) => {
    let filteredProducts = [...products];
    
    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply price range filter
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    
    return filteredProducts.slice(startIndex, endIndex);
  },

  // Get product by ID
  getProductById: async (id) => {
    return products.find(product => product.id === id);
  },

  // Create new product
  createProduct: async (productData) => {
    const newProduct = {
      id: (products.length + 1).toString(),
      ...productData,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    return newProduct;
  },

  // Update product
  updateProduct: async (id, updateData) => {
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return null;
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return products[productIndex];
  },

  // Delete product
  deleteProduct: async (id) => {
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return false;
    }
    
    products.splice(productIndex, 1);
    return true;
  }
};