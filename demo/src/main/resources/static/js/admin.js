/* admin.js
 * Status changes, staff/role management, and reissuing a member's QR.
 *
 * These aren't wired to any buttons yet since that UI doesn't exist in
 * the member cards/detail view yet — call them once those controls are
 * built, e.g. from App.members.openDetail().
 */
window.App = window.App || {};

(function () {

  async function changeStatus(memberId, status) {
    try {
      const updated = await App.api.updateMemberStatus(memberId, status);
      // TODO: refresh the affected card/detail view with `updated`
      return updated;
    } catch (err) {
      console.error("Failed to update member status:", err.message);
      throw err;
    }
  }

  async function setRole(memberId, role) {
    try {
      const updated = await App.api.setMemberRole(memberId, role);
      // TODO: refresh the affected card/detail view with `updated`
      return updated;
    } catch (err) {
      console.error("Failed to update member role:", err.message);
      throw err;
    }
  }

  async function reissueQr(memberId) {
    try {
      const result = await App.api.reissueQr(memberId);
      // TODO: display the new QR code to the admin
      return result;
    } catch (err) {
      console.error("Failed to reissue QR code:", err.message);
      throw err;
    }
  }

  window.App.admin = { changeStatus, setRole, reissueQr };

})();
