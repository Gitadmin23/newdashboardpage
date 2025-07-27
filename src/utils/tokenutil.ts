// utils/auth.js
export function setTokenInCookies() {
    const token = localStorage.getItem('token');
    if (token) {
      document.cookie = `token=${token}; path=/;`;
    }
  }