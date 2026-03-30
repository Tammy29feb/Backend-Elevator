const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const addUserData = async () => {
  try {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const users = [
      ['demo_user', 'demo@example.com', hashedPassword],
      ['premium_buyer', 'premium@example.com', hashedPassword],
      ['style_guru', 'style@example.com', hashedPassword]
    ];

    for (const [username, email, pass] of users) {
      await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
        [username, email, pass]
      );
    }

    console.log('Sample users added successfully.');
  } catch (err) {
    console.error('Error adding sample users:', err);
  } finally {
    await pool.end();
  }
};

addUserData();
