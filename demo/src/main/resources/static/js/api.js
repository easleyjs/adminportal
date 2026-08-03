/* api.js
 * All fetch() calls live here, plus one shared error type/handler.
 * Every other file talks to the backend through App.api — nothing else
 * should call fetch() directly. Point API_BASE at your real backend and
 * these are ready to go as-is.
 */
window.App = window.App || {};

(function () {

  const API_BASE = "/api";

  class ApiError extends Error {
    constructor(message, status) {
      super(message);
      this.name = "ApiError";
      this.status = status || 0;
    }
  }

  // Shared request wrapper: handles JSON encode/decode, credentials,
  // and turns both network failures and non-2xx responses into ApiError.
  async function request(path, options = {}) {
    let res;
    try {
      res = await fetch(API_BASE + path, {
        credentials: "include",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
    } catch (err) {
      throw new ApiError("Network error — check your connection and try again.", 0);
    }

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (_) {
        data = text;
      }
    }

    if (!res.ok) {
      const message = (data && data.message) || `Request failed (${res.status})`;
      throw new ApiError(message, res.status);
    }

    return data;
  }

  const api = {
    ApiError,

    // --- Auth ---
    login(username, password) {
      return request("/auth/login", { method: "POST", body: { username, password } });
    },
    logout() {
      return request("/auth/logout", { method: "POST" });
    },
    getCurrentUser() {
      return request("/auth/me", { method: "GET" });
    },

    // --- Members ---
    getMembers(params = {}) {
      const query = new URLSearchParams(params).toString();
      return request(`/members${query ? `?${query}` : ""}`, { method: "GET" });
    },
    getMember(id) {
      return request(`/members/${id}`, { method: "GET" });
    },

    // --- Admin actions ---
    updateMemberStatus(id, status) {
      return request(`/members/${id}/status`, { method: "PATCH", body: { status } });
    },
    setMemberRole(id, role) {
      return request(`/members/${id}/role`, { method: "PATCH", body: { role } });
    },
    reissueQr(id) {
      return request(`/members/${id}/qr/reissue`, { method: "POST" });
    },

    // --- Door check-in ---
    checkIn(qrPayload) {
      return request("/door/check-in", { method: "POST", body: { qrPayload } });
    },
  };

  window.App.api = api;

})();
