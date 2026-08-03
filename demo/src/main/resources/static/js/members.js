/* members.js
 * Search, filter chips, the member card list, pagination, and the user
 * menu. Also the entry point for opening a member's detail view.
 */
window.App = window.App || {};

(function () {

  // Sample data — replace with App.api.getMembers() once the backend exists:
  //   const members = await App.api.getMembers({ filter: activeFilter, q: searchTerm });
  const members = [
    { id: 1,  name: "Jane Doe",       role: "admin",  status: "active" },
    { id: 2,  name: "Mike Chen",      role: "staff",  status: "active" },
    { id: 3,  name: "Sam Rivera",     role: "member", status: "inactive" },
    { id: 4,  name: "Priya Anand",    role: "member", status: "active" },
    { id: 5,  name: "Wren Sokolov",   role: "member", status: "active" },
    { id: 6,  name: "Devon Blake",    role: "staff",  status: "inactive" },
    { id: 7,  name: "Terra Nguyen",   role: "member", status: "active" },
    { id: 8,  name: "Alex Ferro",     role: "member", status: "inactive" },
    { id: 9,  name: "Jarrett Cole",   role: "member", status: "active" },
    { id: 10, name: "Nina Ostrov",    role: "staff",  status: "active" },
    { id: 11, name: "Owen Marsh",     role: "member", status: "active" },
    { id: 12, name: "Ivy Calloway",   role: "member", status: "inactive" },
    { id: 13, name: "Leo Bautista",   role: "staff",  status: "active" },
    { id: 14, name: "Ruth Ellison",   role: "member", status: "active" },
    { id: 15, name: "Callum Reyes",   role: "member", status: "inactive" },
    { id: 16, name: "Freya Holt",     role: "member", status: "active" },
    { id: 17, name: "Marcus Diallo",  role: "staff",  status: "active" },
    { id: 18, name: "Talia Novak",    role: "member", status: "inactive" },
    { id: 19, name: "Roman Kessler",  role: "member", status: "active" },
    { id: 20, name: "Esme Whitlock",  role: "admin",  status: "active" },
    { id: 21, name: "Gideon Park",    role: "member", status: "active" },
    { id: 22, name: "Aria Fontaine",  role: "member", status: "inactive" },
    { id: 23, name: "Otis Bramwell",  role: "member", status: "active" },
    { id: 24, name: "Lena Marchetti", role: "staff",  status: "inactive" },
  ];

  let activeFilter = "all";
  let searchTerm = "";
  let pageSize = 10;
  let currentPage = 1;
  let mode = "door"; // "door" | "admin" — Door is the default; Admin requires the admin role

  function initials(name) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  }

  function matchesFilter(m) {
    if (mode === "door" && (activeFilter === "admin" || activeFilter === "staff")) {
      return true; // shouldn't happen, but fail open to "all" behavior
    }
    if (activeFilter === "all") return true;
    if (activeFilter === "admin") return m.role === "admin";
    if (activeFilter === "staff") return m.role === "staff";
    if (activeFilter === "active") return m.status === "active";
    if (activeFilter === "inactive") return m.status === "inactive";
    return true;
  }

  function matchesSearch(m) {
    return m.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
  }

  // Placeholder — wire this up to an actual detail view/panel.
  function openDetail(member) {
    console.log("Open member:", member.name);
  }

  function setMode(newMode) {
    // Admin mode is only reachable by users with the admin role — silently
    // refuse and stay put otherwise (defends against direct App.members.setMode calls too).
    if (newMode === "admin" && !App.auth.isAdmin()) {
      console.warn("Admin mode requires the admin role.");
      newMode = "door";
    }

    mode = newMode;

    const body = document.body;
    const chips = document.getElementById("chips");
    const scanBtn = document.getElementById("scanBtn");
    const switchModeBtn = document.getElementById("switchModeBtn");
    const title = document.querySelector(".header-top h1");

    const isDoor = mode === "door";

    body.classList.toggle("door-mode", isDoor);
    chips.classList.toggle("door-mode", isDoor);
    scanBtn.classList.toggle("visible", isDoor);
    switchModeBtn.textContent = isDoor ? "Switch to Admin" : "Switch to Door";
    switchModeBtn.style.display = App.auth.isAdmin() ? "" : "none";
    document.title = `Admin Portal · ${isDoor ? "Door" : "Admin"}`;
    if (title) {
      title.firstChild.textContent = isDoor ? "Door" : "Admin";
    }

    // Admin/Staff aren't valid filters in Door mode — fall back to All.
    if (isDoor && (activeFilter === "admin" || activeFilter === "staff")) {
      activeFilter = "all";
      document.querySelectorAll(".chip").forEach((c) => {
        c.classList.toggle("active", c.dataset.filter === "all");
      });
    }

    currentPage = 1;
    render();
  }

  function render() {
    const list = document.getElementById("list");
    const empty = document.getElementById("empty");
    const count = document.getElementById("count");
    const pagination = document.getElementById("pagination");
    const pageInfo = document.getElementById("pageInfo");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    if (!list) return; // members view isn't on this page

    const filtered = members.filter((m) => matchesFilter(m) && matchesSearch(m));

    count.textContent = ` (${filtered.length})`;
    list.innerHTML = "";

    if (filtered.length === 0) {
      empty.style.display = "block";
      pagination.style.display = "none";
      return;
    }
    empty.style.display = "none";
    pagination.style.display = "flex";

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPage.disabled = currentPage <= 1;
    nextPage.disabled = currentPage >= totalPages;

    pageItems.forEach((m) => {
      const card = document.createElement("div");
      card.className = "card";
      card.tabIndex = 0;

      const statusLabel = m.status === "active" ? "Active" : "Inactive";
      const roleBadge =
        m.role === "admin"
          ? `<span class="badge badge-role badge-role-admin">Admin</span>`
          : m.role === "staff"
          ? `<span class="badge badge-role">Staff</span>`
          : "";

      card.innerHTML = `
        <div class="avatar">${initials(m.name)}</div>
        <div class="card-body">
          <div class="card-name">${m.name}</div>
          <div class="card-tags">
            ${roleBadge}
            <span class="badge badge-status is-${m.status}">
              <span class="dot"></span>${statusLabel}
            </span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openDetail(m));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(m);
        }
      });

      list.appendChild(card);
    });
  }

  function bindEvents() {
    const chips = document.getElementById("chips");
    const search = document.getElementById("search");
    const clearSearch = document.getElementById("clearSearch");
    const perPage = document.getElementById("perPage");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const addBtn = document.getElementById("addBtn");
    const userMenuBtn = document.getElementById("userMenuBtn");
    const userDropdown = document.getElementById("userDropdown");
    const profileBtn = document.getElementById("profileBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const switchModeBtn = document.getElementById("switchModeBtn");
    const scanBtn = document.getElementById("scanBtn");

    if (!chips) return; // members view isn't on this page

    chips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      currentPage = 1;
      render();
    });

    search.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      clearSearch.classList.toggle("visible", searchTerm.length > 0);
      currentPage = 1;
      render();
    });

    clearSearch.addEventListener("click", () => {
      search.value = "";
      searchTerm = "";
      clearSearch.classList.remove("visible");
      currentPage = 1;
      search.focus();
      render();
    });

    perPage.addEventListener("change", (e) => {
      pageSize = parseInt(e.target.value, 10);
      currentPage = 1;
      render();
    });

    prevPage.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        render();
      }
    });

    nextPage.addEventListener("click", () => {
      currentPage++;
      render();
    });

    addBtn.addEventListener("click", () => {
      // Placeholder — open an "add member" form here
      console.log("Add member clicked");
    });

    // User menu dropdown
    function closeUserMenu() {
      userDropdown.classList.remove("open");
      userMenuBtn.setAttribute("aria-expanded", "false");
    }

    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = userDropdown.classList.toggle("open");
      userMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!userDropdown.contains(e.target) && e.target !== userMenuBtn) {
        closeUserMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeUserMenu();
    });

    profileBtn.addEventListener("click", () => {
      // Placeholder — navigate to profile page here
      console.log("Profile clicked");
      closeUserMenu();
    });

    logoutBtn.addEventListener("click", () => {
      closeUserMenu();
      App.auth.logout();
    });

    switchModeBtn.addEventListener("click", () => {
      closeUserMenu();
      setMode(mode === "door" ? "admin" : "door");
    });

    scanBtn.addEventListener("click", () => {
      // Placeholder — this will launch the scan popup later
      console.log("Scan clicked");
    });
  }

  function init() {
    bindEvents();
    setMode(mode);
  }

  window.App.members = { init, openDetail, setMode };

  document.addEventListener("DOMContentLoaded", init);

})();
