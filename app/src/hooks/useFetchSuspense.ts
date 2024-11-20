type Resource<Response = unknown> = {
  read: () => {
    data: Response | undefined;
    error: Error | undefined;
  };
};

const fetchCache: Record<string, Resource> = {};

const createResource = <Response>(
  promise: Promise<Response>,
): Resource<Response> => {
  let pending = true;
  let response: Response | undefined;
  let error: Error | undefined;

  promise
    .then((res) => (response = res))
    .catch((e) => (error = e))
    .finally(() => (pending = false));

  return {
    read: () => {
      if (pending) throw promise;

      return {
        data: response,
        error,
      };
    },
  };
};

const fetchResource = <Response>(url: string) => {
  if (!fetchCache[url]) {
    const resource = createResource(
      fetch(url).then((response) => response.json() as Promise<Response>),
    );
    fetchCache[url] = resource;
  }
  return fetchCache[url] as Resource<Response>;
};

export const useFetchSuspense = <Response>(url: string) => {
  const resource = fetchResource<Response>(url);
  return resource.read();
};
