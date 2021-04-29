import React from "react";
import { isEqual } from "lodash/lang";

export const createSelector = ({ context }) => (
  selector = (storeState) => storeState
) => {
  const [, forceRender] = React.useReducer((counter) => counter + 1, 0);
  const store = React.useContext(context);

  const selectedValueRef = React.useRef(selector(store.getState()));

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      const latestSelectedValue = selector(storeState);

      if (!isEqual(latestSelectedValue, selectedValueRef.current)) {
        selectedValueRef.current = latestSelectedValue;
        forceRender();
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.toString()]);

  return selectedValueRef.current;
};
