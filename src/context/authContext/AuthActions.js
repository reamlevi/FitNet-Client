export const LoginStart = (userCredentials) => ({
    type: 'LOGIN_START',
});
  
export const LoginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});
  
export const LoginFailure = () => ({
    type: 'LOGIN_FAILURE',
});

export const LogOut = () => ({
    type: 'LOGOUT',
});
  
export const Follow = (userId) => ({
    type: 'FOLLOW',
    payload: userId,
});
  
export const Unfollow = (userId) => ({
    type: 'UNFOLLOW',
    payload: userId,
});

export const updateUser = (user) => ({ 
    type: 'UPDATE_USER',
    payload: user,  
});
  