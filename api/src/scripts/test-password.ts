import * as bcrypt from 'bcryptjs';

async function testPassword() {
  const storedHash = '$2b$10$.M.6sbr6JAyU7YjDXdjSqeh4/aW7URLODDL/D6r9GdDO.v4ZmLUAS';
  const testPassword = 'Password@123';

  try {
    const isMatch = await bcrypt.compare(testPassword, storedHash);
    console.log('Password match:', isMatch);
    
    // Generate a new hash for comparison
    const newHash = await bcrypt.hash(testPassword, 10);
    console.log('New hash:', newHash);
    console.log('New hash match:', await bcrypt.compare(testPassword, newHash));
  } catch (error) {
    console.error('Error:', error);
  }
}

testPassword(); 