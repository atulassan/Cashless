export  function  authHeader() {
    const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }


export function authHeaderNew() {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (user && user.token) {
      return {
        "authorization": user.token,
      };
    } else {
      return {};
    }    
}  
