const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert some sample data if the table is empty
    const checkProducts = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(checkProducts.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO products (name, price, description, image_url) VALUES
        ('Premium Headphones', 199.99, 'High-quality wireless headphones with noise cancellation.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'),
        ('Smart Watch', 299.00, 'Stay connected with this sleek and modern smart watch.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'),
        ('Camera Lens', 450.00, 'Professional grade camera lens for stunning photography.', 'https://images.unsplash.com/photo-1526170315870-ef6d82f5839d?w=500&q=80'),
        ('Laptop Backpack', 75.50, 'Durable and stylish backpack for your daily commute.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'),
        ('Mechanical Keyboard', 120.00, 'Tactile and responsive mechanical keyboard for gaming and work.', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80'),
        ('Wireless Mouse', 45.00, 'Ergonomic wireless mouse for smooth navigation.', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80');
      `);
      console.log('Sample products inserted.');
    }

    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
};

initDb();
