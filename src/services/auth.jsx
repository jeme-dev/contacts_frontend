export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now(); 
  } catch {
    return true; 
  }
};

export const getValidToken = () => {
  const token = localStorage.getItem("token");
  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
};
