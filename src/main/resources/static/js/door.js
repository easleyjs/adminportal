/* door.js
 * Camera scanner and check-in result.
 * TODO: camera scanning itself is still a placeholder — this is a
 * stub so router.js has something to call when the Door view is shown.
 */
window.App = window.App || {};

(function () {

  function init() {
    // TODO: start the camera scanner, read a QR code, and call
    // App.api.checkIn(qrPayload) with the result. Show the check-in
    // outcome (member name, status, allow/deny) in the Door view.
  }

  // Manual check-in — triggered from the member detail modal when a scan
  // didn't work or someone's doing a manual search at the door.
  async function checkInMember(member) {
    try {
      const result = await App.api.checkInManual(member.id);
      // TODO: show a proper check-in confirmation, same as the scan flow will
      return result;
    } catch (err) {
      console.error("Manual check-in failed:", err.message);
      throw err;
    }
  }

  window.App.door = { init, checkInMember };

})();
