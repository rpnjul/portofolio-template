const bcryptjs = require('bcryptjs');

async function generateHash() {
  const password = '16766912cR@';
  const hash = await bcryptjs.hash(password, 10);

  console.log('=================================');
  console.log('Password:', password);
  console.log('Bcrypt Hash:', hash);
  console.log('=================================');
  console.log('\nSQL Query untuk insert/update user:');
  console.log(`UPDATE users SET password = '${hash}' WHERE username = 'admin';`);
  console.log('\nAtau untuk insert user baru:');
  console.log(`INSERT INTO users (username, password, name, avatar) VALUES ('admin', '${hash}', 'Administrator', NULL);`);
  console.log('=================================');
}

generateHash();
