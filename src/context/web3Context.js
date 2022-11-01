import React, { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  account: "",
  provider: null,
};

const actions = {
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.UPDATE_ACCOUNT: {
      const provider = action.provider || state.provider;
      const { account } = action;
      return {
        ...state,
        provider,
        account,
      };
    }
    default:
      return state;
  }
}

const Web3Context = createContext({
  state: INITIAL_STATE,
  updateAccount: (data) => {},
});

export function useWeb3Context() {
  return useContext(Web3Context);
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function updateAccount(data) {
    dispatch({
      type: actions.UPDATE_ACCOUNT,
      ...data,
    });
  }

  return (
    <Web3Context.Provider
      value={useMemo(
        () => ({
          state,
          updateAccount,
        }),
        [state]
      )}
    >
      {children}
    </Web3Context.Provider>
  );
};
