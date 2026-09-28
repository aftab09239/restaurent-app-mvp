// Q3 implementation lives in App.js for this compact MVP.
// This module documents the screen contract used by the assignment.
export const loginScreenRequirements = {
  hooks: ['useState', 'useEffect', 'useContext'],
  inputs: ['email', 'password', 'fullName', 'confirmPassword', 'role'],
  validation: ['valid email', '8+ chars', 'at least one digit', 'matching passwords'],
  mockSource: '../data/users.js',
};
export default function LoginScreen() { return null; }
