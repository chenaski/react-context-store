import { createStore } from "./createStore";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
};

export const createActions = ({ dispatch }) => ({
  login: ({ username, password }) =>
    dispatch({ type: ActionTypes.LOGIN, data: { username, password } }),
  logout: () => dispatch({ type: ActionTypes.LOGOUT }),
  updateUser: ({ user }) =>
    dispatch({ type: ActionTypes.UPDATE_USER, data: { user } }),
});

function reducer(store, action) {
  const action_data = action.data;

  switch (action.type) {
    case ActionTypes.LOGIN: {
      return store.update({
        isLoggedIn: true,
        user: {
          username: action_data.username,
          password: action_data.password,
        },
      });
    }

    case ActionTypes.LOGOUT: {
      return store.update({
        isLoggedIn: initialState.isLoggedIn,
        user: initialState.user,
      });
    }

    case ActionTypes.UPDATE_USER: {
      return store.update({
        user: {
          username: action_data.user.username || undefined,
          password: action_data.user.password || undefined,
        },
      });
    }

    default:
      throw new Error();
  }
}

const { StoreProvider, useStoreData, useStoreActions } = createStore({
  reducer,
  initialState,
  createActions,
});

export const UserStoreProvider = StoreProvider;
export const useUserStore = useStoreData;
export const useUserActions = useStoreActions;
