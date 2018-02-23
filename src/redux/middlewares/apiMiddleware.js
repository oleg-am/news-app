let clearStorageTimeoutId = null;

const apiMiddleware = api => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { types, promise, schema, schemaOptions, localStorageKey, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [REQUEST, SUCCESS, FAILURE] = types;

  let localStorageData = null;
  let parsedData = {};
  let localResponse = null;

  if (localStorageKey) {
    localStorageData = window.localStorage.getItem('data');
    if (localStorageData) {
      parsedData = JSON.parse(localStorageData);
      localResponse = parsedData[localStorageKey];
    }
  }

  if (localResponse) {
    return next({
      type: SUCCESS,
      ...rest,
      response: localResponse,
      result: localResponse.data.data || localResponse.data,
    });
  }

  next({ ...rest, type: REQUEST });

  return promise(api).then(
    (response) => {
      if (localStorageKey) {
        window.localStorage.setItem('data', JSON.stringify({
          ...parsedData,
          [localStorageKey]: response,
        }));
      }

      clearStorageTimeoutId && clearTimeout(clearStorageTimeoutId);

      clearStorageTimeoutId = setTimeout(() => {
        window.localStorage.removeItem('data');
      }, 20 * 60 * 1000);

      next({
        type: SUCCESS,
        ...rest,
        response,
        result: response.data.data || response.data,
      });
    },
    error => next({
      type: FAILURE,
      ...rest,
      error,
      errors: error.response.data.errors,
    }),
  ).catch(error => next({
    error,
    type: FAILURE,
  }));
};

export default apiMiddleware;
