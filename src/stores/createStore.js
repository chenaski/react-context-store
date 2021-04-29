import React from "react";
import { createSelector } from "./createSelector";
import { cloneDeep, merge, uniqueId } from "lodash";

class Store {
  state = {};

  subscribers = {};

  constructor(initialState = {}) {
    this.state = cloneDeep(initialState);
  }

  subscribe = (cb) => {
    const subscriberId = uniqueId("selector-");

    this.subscribers[subscriberId] = cb;
    return this.unsubscribe(subscriberId);
  };

  unsubscribe(subscriberId) {
    return () => {
      delete this.subscribers[subscriberId];
    };
  }

  onChange() {
    Object.values(this.subscribers).forEach((cb) => cb());
  }

  getState = () => {
    return this.state;
  };

  update = (data) => {
    this.state = merge(this.state, data);

    this.onChange();

    return this;
  };
}

export const createStore = ({ reducer, initialState, createActions }) => {
  const store = new Store(initialState);
  const StateContext = React.createContext();
  const ActionsContext = React.createContext();

  const StoreProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, {
      subscribe: store.subscribe,
      getState: store.getState,
      update: store.update,
    });

    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={createActions({ dispatch })}>
          {children}
        </ActionsContext.Provider>
      </StateContext.Provider>
    );
  };

  const useStoreData = createSelector({ context: StateContext });
  const useStoreActions = () => React.useContext(ActionsContext);

  return {
    StoreProvider,
    useStoreData,
    useStoreActions,
  };
};
