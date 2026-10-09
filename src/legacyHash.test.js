import test from "node:test";
import assert from "node:assert/strict";
import { migrateLegacyHash } from "./legacyHash.js";

function fakeHistory() {
  const calls = [];
  return { calls, replaceState: (...args) => calls.push(args) };
}

test("rewrites a hash route to a path", () => {
  const h = fakeHistory();
  const changed = migrateLegacyHash({ hash: "#/work/ftprtu/winter-couplet" }, h);
  assert.equal(changed, true);
  assert.deepEqual(h.calls, [[null, "", "/work/ftprtu/winter-couplet"]]);
});

test("rewrites the bare root hash", () => {
  const h = fakeHistory();
  assert.equal(migrateLegacyHash({ hash: "#/" }, h), true);
  assert.deepEqual(h.calls, [[null, "", "/"]]);
});

test("ignores empty hash", () => {
  const h = fakeHistory();
  assert.equal(migrateLegacyHash({ hash: "" }, h), false);
  assert.equal(h.calls.length, 0);
});

test("ignores non-route hash such as an in-page anchor", () => {
  const h = fakeHistory();
  assert.equal(migrateLegacyHash({ hash: "#section" }, h), false);
  assert.equal(h.calls.length, 0);
});
