/* MadFood frontend/backend integration bridge.
 * Loaded before page scripts. Adds JWT automatically to fetch requests and
 * stores tokens returned by the API. The existing UI can continue using its
 * current apiFetch helpers while authenticated requests are authorized.
 */
(function () {
  const originalFetch = window.fetch.bind(window);
  window.MADFOOD_API = window.MADFOOD_API || '/api';
  window.madfoodToken = function () { return localStorage.getItem('mad_token') || ''; };
  window.madfoodSetSession = function (data) {
    if (data && data.token) localStorage.setItem('mad_token', data.token);
    if (data && data.user) localStorage.setItem('mad_user', JSON.stringify(data.user));
    if (data && data.restaurant) localStorage.setItem('mad_restaurant', JSON.stringify(data.restaurant));
  };
  window.madfoodLogout = function () {
    ['mad_token','mad_user','mad_restaurant'].forEach(k => localStorage.removeItem(k));
  };
  window.fetch = async function (input, init) {
    init = init || {};
    const headers = new Headers(init.headers || {});
    const token = window.madfoodToken();
    if (token && !headers.has('Authorization')) headers.set('Authorization', 'Bearer ' + token);
    if (init.body && typeof init.body === 'string' && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    init.headers = headers;
    const response = await originalFetch(input, init);
    try {
      const clone = response.clone();
      const data = await clone.json();
      if (data && data.token) window.madfoodSetSession(data);
    } catch (_) {}
    return response;
  };
})();
