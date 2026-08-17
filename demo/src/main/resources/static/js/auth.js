/* auth.js
 * Current user, role checks, login/logout.
 *
 * NOTE: currentUser lives in memory only, so it resets on every full page
 * load (going from login.html to members.html, a refresh, etc). That's
 * fine for wiring up the UI now, but for real persistence you'll want the
 * backend to issue a session cookie (App.api already sends credentials:
 * "include") or a token you re-check via App.api.getCurrentUser() on load.
 */
window.App = window.App || {};

(function () {

  const ROLES = { ADMIN: "admin", STAFF: "staff", MEMBER: "member" };

  // TEMP (dev/testing only): defaulting to a fake admin so Admin mode is
  // reachable without a real login flow yet. Once App.api login/session
  // checking is wired up, change this back to `let currentUser = null;`
  // and let requireAuth()/getCurrentUser() do their job for real.
  let currentUser = { id: "demo-user", name: "Demo Admin", role: ROLES.ADMIN }; // { id, name, role }

  async function login(username, password) {
    // DEMO ONLY — there's no backend yet, so this fakes a network call.
    // Once App.api.login() hits a real endpoint, replace this whole body
    // with:
    //   currentUser = await App.api.login(username, password);
    //   return currentUser;
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!username || !password) {
      throw new App.api.ApiError("Incorrect username or password.", 401);
    }

    currentUser = { id: "demo-user", name: username, role: ROLES.ADMIN };
    return currentUser;
  }

  async function logout() {
    currentUser = null;
    try {
      // await App.api.logout();
    } finally {
      window.location.href = "login.html";
    }
  }

  function getCurrentUser() {
    return currentUser;
  }

  function isAuthenticated() {
    return currentUser !== null;
  }

  function isAdmin() {
    return currentUser?.role === ROLES.ADMIN;
  }

  // Staff screens (like door check-in) should be reachable by admins too.
  function isStaff() {
    return currentUser?.role === ROLES.ADMIN || currentUser?.role === ROLES.STAFF;
  }

  // Call at the top of any page that requires a signed-in user.
  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.href = "login.html";
    }
  }

  window.App.auth = {
    ROLES,
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    isAdmin,
    isStaff,
    requireAuth,
  };

})();
