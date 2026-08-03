/* router.js
 * Switches between the Door view and the Admin view within a single page.
 *
 * Usage: mark each view's container with data-view="door" or
 * data-view="admin", and any nav buttons with data-nav-to="door" /
 * data-nav-to="admin". Not wired into any page yet — this is ready for
 * whenever Door and Admin views are combined into one shell page.
 */
window.App = window.App || {};

(function () {

  function getViewEls() {
    return document.querySelectorAll("[data-view]");
  }

  function currentView() {
    return window.location.hash.replace("#", "") || "admin";
  }

  function show(viewName) {
    getViewEls().forEach((el) => {
      el.style.display = el.dataset.view === viewName ? "" : "none";
    });

    document.querySelectorAll("[data-nav-to]").forEach((el) => {
      el.classList.toggle("active", el.dataset.navTo === viewName);
    });

    if (window.location.hash.replace("#", "") !== viewName) {
      window.location.hash = viewName;
    }

    if (viewName === "door" && window.App.door?.init) window.App.door.init();
    if (viewName === "admin" && window.App.members?.init) window.App.members.init();
  }

  function init() {
    document.querySelectorAll("[data-nav-to]").forEach((btn) => {
      btn.addEventListener("click", () => show(btn.dataset.navTo));
    });
    window.addEventListener("hashchange", () => show(currentView()));
    show(currentView());
  }

  window.App.router = { init, show };

})();
