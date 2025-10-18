// src/utils/imagekit.js
const endpoint = (import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "").trim();

// Ensure single trailing slash
const IK_ENDPOINT = endpoint.endsWith("/") ? endpoint : endpoint + "/";

/**
 * Build a full ImageKit URL from a library path.
 * - Automatically URL-encodes spaces, apostrophes, etc.
 * - Supports optional transformations as an object.
 *
 * @param {string} path e.g. "/Eventimages/Awards2025/1.jpg"
 * @param {object} tr e.g. { w: 800, h: 600, q: 80, fo: "face" }
 * @returns {string} full URL
 */
export function ikUrl(path = "", tr = null) {
  // Remove leading slash so we don’t end up with double slashes
  const clean = (path || "").replace(/^\/+/, "");
  const encoded = encodeURI(clean); // handles spaces, apostrophes, etc.

  // Build transformation string if provided
  let trQuery = "";
  if (tr && typeof tr === "object") {
    // Convert { w: 800, h: 600, q: 80 } => "w-800,h-600,q-80"
    const pairs = Object.entries(tr)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${k}-${v}`);
    if (pairs.length) trQuery = `?tr=${pairs.join(",")}`;
  }

  return `${IK_ENDPOINT}${encoded}${"".concat(trQuery)}`;
}
