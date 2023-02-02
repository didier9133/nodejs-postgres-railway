const bcrypt = require('bcrypt');

async function password() {
  const pass = 'admin123';
  const hash = await bcrypt.hash(pass, 10);

  console.log(hash);
}

password();

async function checking() {
  const pass = 'admin123';
  const hash = '$2b$10$OOwgZsSI6tM72MwWEer/4eOzthv3kE.0HYsyvo.4L4Q8TLSTzkCca';
  const isMatch = await bcrypt.compare(pass, hash);
  console.log(isMatch);
}

checking();
