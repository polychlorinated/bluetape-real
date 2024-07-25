import { useCallback } from "react";

import api from "../../../shared/utils/api";
import useMergeState from "../../../shared/hooks/mergeState";
import { useHistory, useRouteMatch } from "react-router-dom";

const useMutation = (method, url) => {
  const history = useHistory();
  const match = useRouteMatch();
  const [state, mergeState] = useMergeState({
    data: null,
    error: null,
    isWorking: false
  });

  const makeRequest = useCallback(
    (variables = {}) =>
      new Promise((resolve, reject) => {
        mergeState({ isWorking: true });

        api[method](url, variables).then(
          data => {
            resolve(data);
            mergeState({ data, error: null, isWorking: false });
          },
          error => {
            if (error.code === 401 && error.message === "Please authenticate") {
              if (match.path !== "signup") history.push("/signin");
            }
            reject(error);
            mergeState({ error, data: null, isWorking: false });
          }
        );
      }),
    [history, method, url, mergeState, match.path]
  );

  return [
    {
      ...state,
      [isWorkingAlias[method]]: state.isWorking
    },
    makeRequest
  ];
};

const isWorkingAlias = {
  post: "isCreating",
  put: "isUpdating",
  patch: "isUpdating",
  delete: "isDeleting"
};

export default useMutation;
