// Old URLs looked like https://fhwrdh.net/#/work/ftprtu (hash router, a
// GitHub Pages workaround). Rewrite them to real paths before the router reads
// the location, so bookmarks and shared links keep working.
export function migrateLegacyHash(location, history) {
  const { hash } = location;
  if (!hash.startsWith("#/")) return false;
  history.replaceState(null, "", hash.slice(1));
  return true;
}
