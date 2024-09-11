import * as R from "ramda";
import slugify from "slugify";

export const prefix = "/work/";
export const addPrefix = R.map((i) =>
  R.assocPath(["src"], `${prefix}${i.src}`, i),
);
export const getId = R.pipe(R.replace(prefix, ""), R.split("."), R.head);

export const findIndex = (slug, items) =>
  items.findIndex((item) => item.slugs.includes(slug));

//------------
//
const addPath = R.map((i) => R.assocPath(["path"], `${prefix}${i.src}`, i));
const addId = R.map((i) => R.assocPath(["id"], getId(i.src), i));
const buildTitles = R.map((i) =>
  R.assocPath(["title"], i.title || "untitled", i),
);
const buildSlugs = R.map((i) => {
  const slugs = [i.id];
  if (i.title !== "untitled") {
    // put the title first, use it first
    slugs.unshift(slugify(i.title));
  }

  return R.assocPath(["slugs"], slugs, i);
});
const buildImages = R.pipe(addPath, addId, buildTitles, buildSlugs);

//------------
//

export const homeImages = buildImages([
  { src: "DSCF0156.jpg" },
  { src: "DSCF2215.jpg" },
  { src: "DSCF0445.jpg" },
  { src: "DSCF1777-2.jpg" },
  { src: "DSCF1193.jpg" },
  { src: "DSCF1982.jpg" },
  { src: "DSCF2310.jpg" },
  { src: "DSCF3071.jpg" },
  { src: "DSCF4083.jpg" },
  { src: "DSCF4104.jpg" },
  { src: "DSCF4105.jpg" },
  { src: "DSCF4250.jpg" },
  { src: "DSCF4654.jpg" },
  { src: "DSCF4676.jpg" },
  { src: "DSCF4941.jpg" },
  { src: "DSCF5080.jpg" },
  { src: "DSCF5228.jpg" },
  { src: "DSCF5950.jpg" },
  { src: "DSCF7089-2.jpg" },
  { src: "DSCF7483.jpg" },
  { src: "DSCF9833.jpg" },
  { src: "DSCF8079.jpg" },
  { src: "DSCF8289.jpg" },
  { src: "DSCF8410.jpg" },
]);

// first they passed right through us
export const ftprtuImages = buildImages([
  { src: "DSCF7931.jpg", title: "winter couplet" },
  { src: "DSCF7930.jpg", title: "the spaces contained in each" },
  { src: "DSCF8416.jpg", title: "if here, not there, if not there, then here" },
  { src: "DSCF8007.jpg", title: "winds through bleak timber" },
  { src: "DSCF8405.jpg", title: "proximities" },
  { src: "DSCF7887.jpg", title: "airforms" },
  { src: "DSCF7961.jpg", title: "transmissions" },
  { src: "DSCF7944.jpg", title: "two hands behind glass" },
]);

// on the road
export const otrImages = buildImages([
  { src: "DSCF0409.jpg" },
  { src: "DSCF0456.jpg" },
  { src: "DSCF0419.jpg" },
  { src: "DSCF5465.jpg" },
  { src: "DSCF0614.jpg" },
  { src: "DSCF0621.jpg" },
  { src: "DSCF1627.jpg" },
  { src: "DSCF1068-2.jpg" },
  { src: "DSCF1077.jpg" },
  { src: "DSCF1090.jpg" },
  { src: "DSCF1125.jpg" },
  { src: "DSCF1616.jpg" },
  { src: "DSCF5832.jpg" },
  { src: "DSCF6394.jpg" },
  { src: "DSCF7831.jpg" },
  { src: "DSCF6820.jpg" },
  { src: "DSCF8853.jpg" },
  { src: "DSCF8433.jpg" },
]);

// sound of the sea
export const sotsImages = buildImages([
  { src: "DSCF2788.jpg" },
  { src: "DSCF2648.jpg" },
  { src: "DSCF2743.jpg" },
  { src: "DSCF3050-2.jpg" },
  { src: "DSCF3056-2.jpg" },
  { src: "DSCF3825.jpg" },
  { src: "DSCF5385.jpg" },
  { src: "DSCF5623.jpg" },
  { src: "DSCF5750.jpg" },
  { src: "DSCF6559.jpg" },
  { src: "DSCF6573.jpg" },
  { src: "DSCF6847.jpg" },
  { src: "DSCF7321.jpg" },
  { src: "DSCF7696.jpg" },
  { src: "DSCF7856.jpg" },
  { src: "DSCF7857.jpg" },
  { src: "DSCF7970.jpg" },
  { src: "DSCF8392.jpg" },
  { src: "DSCF8641.jpg" },
  { src: "DSCF8647.jpg" },
  { src: "DSCF8653.jpg" },
  { src: "DSCF9697.jpg" },
  { src: "DSCF9860.jpg" },
]);

// console.log({ homeImages, ftprtuImages, otrImages, sotsImages });
