/**
 * @description This function is used to find the remote URL from remotes by remoteName
 */
export const findRemoteUrl = (remoteName, remotes) => {
  const remote = remotes.find((r) => r.name === remoteName);
  return remote?.url || '';
};

export const fetchRemote = (url, remoteName) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onerror = (err) => {
      console.error(err);
      reject(new Error(`Failed to fetch remote: ${remoteName}`));
    };

    script.onload = () => {
      const moduleProxy = {
        get: (request) => window[remoteName].get(request),
        init: (arg) => {
          try {
            return window[remoteName].init(arg);
          } catch (e) {
            console.error(e);
            console.error(`Failed to initialize remote: ${remoteName}`);
            reject(e);
          }
        },
      };

      resolve(moduleProxy);
    };

    document.head.appendChild(script);
  });

export const loadComponent =
  (remoteName, remoteUrl, moduleName, scope = 'default') =>
  async () => {
    if (!(remoteName in window)) {
      // eslint-disable-next-line no-undef
      await __webpack_init_sharing__(scope);
      const fetchedContainer = await fetchRemote(`${remoteUrl.replace(/\/$/, '')}/remoteEntry.js`, remoteName);
      // eslint-disable-next-line no-undef
      await fetchedContainer.init(__webpack_share_scopes__[scope]);
    }

    const container = window[remoteName];
    const factory = await container.get(moduleName);
    const Module = factory();
    return Module;
  };
