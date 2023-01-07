export const readTokenFromStorage = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const readAllFromStorage = () => {
  const token = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate');
  const userId = localStorage.getItem('userId');
  return { token, expiryDate, userId };
};

export const saveToStorage = (token: string, userId: string) => {
  localStorage.setItem('userId', userId);
  localStorage.setItem('token', token);
  const expiryDate = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
  localStorage.setItem('expiryDate', expiryDate);
};

export const removeStorageValues = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
};
