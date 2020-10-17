import * as actionTypes from "./types";

/* Veprimet e Perdoruesit */
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

/* Veprimet e Kanalit */
export const setCurrentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}

export const setPrivateChannel = isPrivateChannel =>{
  return{
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload:{
      isPrivateChannel
    }
  }
}

export const setUserPosts = userPosts =>{
  return{
    type : actionTypes.SET_USER_POSTS,
    payload : {
      userPosts
    }
  }
}

export const setColors = (primaryColor,secondaryColor) =>{
  return{
    type : actionTypes.SET_COLORS,
    payload :{
      primaryColor,
      secondaryColor
    }
  }
}