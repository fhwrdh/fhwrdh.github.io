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
const defaultTitle = "untitled";
const defaultImageSchema = {
  title: "",
  display: {
    title: "",
    geotime: "",
    exif: "",
  },
  meta: {
    film: "",
    camera: "",
    location: "",
    time: "",
  },
};

const buildDisplayTitle = (i) => {
  return i.title;
};

const buildDisplayGeoTime = (i) => {
  // TODO handle just time or just location
  if (!i.meta.location && !i.meta.time) return null;
  return `${i.meta.location}, ${i.meta.time}`;
};

const buildDisplayExif = (i) => {
  // todo handle just film or just camera
  if (!i.meta.film && !i.meta.camera) return null;
  return `${i.meta.film}, ${i.meta.camera}`;
};

const buildDisplay = R.map((i) => {
  return R.pipe(
    R.assocPath(["display", "title"], buildDisplayTitle(i)),
    R.assocPath(["display", "geotime"], buildDisplayGeoTime(i)),
    R.assocPath(["display", "exif"], buildDisplayExif(i)),
  )(i);
});

const buildSlugs = R.map((i) => {
  const slugs = [i.id];
  if (i.title !== defaultTitle && i.title !== "") {
    // put the title first, use it first
    slugs.unshift(slugify(i.title));
  }
  return R.assocPath(["slugs"], slugs, i);
});

const addDefaults = R.map(R.mergeDeepRight(defaultImageSchema));
const addPath = R.map((i) => R.assocPath(["path"], `${prefix}${i.src}`, i));
const addId = R.map((i) => R.assocPath(["id"], getId(i.src), i));

const buildImages = R.pipe(
  addDefaults,
  addPath,
  addId,
  buildSlugs,
  buildDisplay,
);
//------------

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
  {
    src: "DSCF7931.jpg",
    title: "winter couplet",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "Seattle, Washington",
      time: "2024",
    },
    link: {
      href: "https://steveroden.bandcamp.com/album/winter-couplet",
      text: "Steve Roden Bandcamp",
    },
  },
  {
    src: "DSCF7930.jpg",
    title: "the spaces contained in each",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "Seattle, Washington",
      time: "2024",
    },
    link: {
      href: "https://stephenvitiello.bandcamp.com/album/the-spaces-contained-in-each",
      text: "Stephen Vitello Bandcamp",
    },
  },
  {
    src: "DSCF8416.jpg",
    title: "if here, not there, if not there, then here",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "San Francisco, California",
      time: "2024",
    },
    link: {
      href: "https://yuionodera.bandcamp.com/track/if-here-not-there-if-not-there-then-here",
      text: "Yui Onodera Bandcamp",
    },
  },
  {
    src: "DSCF8007.jpg",
    title: "winds through bleak timber",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "Olympia, Washington",
      time: "2024",
    },
    link: {
      href: "https://12kmusic.bandcamp.com/track/winds-through-bleak-timber",
      text: "12k Bandcamp",
    },
  },
  {
    src: "DSCF8405.jpg",
    title: "proximities",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "San Francisco, California",
      time: "2024",
    },
    link: {
      href: "https://steveroden.bandcamp.com/album/proximities",
      text: "Steve Roden Bandcamp",
    },
  },
  {
    src: "DSCF7887.jpg",
    title: "airforms",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "Seattle, Washington",
      time: "2024",
    },
    link: {
      href: "https://lineimprint.bandcamp.com/album/airforms",
      text: "Line Bandcamp",
    },
  },
  {
    src: "DSCF7961.jpg",
    title: "transmissions",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "Seattle, Washington",
      time: "2024",
    },
    link: {
      href: "https://steveroden.bandcamp.com/album/transmissions-voices-of-objects-and-skies",
      text: "Steve Roden Bandcamp",
    },
  },
  {
    src: "DSCF7944.jpg",
    title: "two hands behind glass",
    meta: {
      film: "Ilford HP5+",
      camera: "Mamiya 7",
      location: "Seattle, Washington",
      time: "2024",
    },
    link: {
      href: "https://steveroden.bandcamp.com/track/two-hands-behind-glass",
      text: "Steve Roden Bandcamp",
    },
  },
]);

// angle of repose
export const aorImages = buildImages([
  { src: "DSCF8651.jpg" },
  { src: "DSCF2585.jpg" },
  { src: "DSCF0348.jpg" },
  { src: "DSCF4225.jpg" },
  { src: "DSCF5127.jpg" },
  { src: "DSCF5963.jpg" },
  { src: "DSCF5219.jpg" },
  { src: "DSCF5950.jpg" },
  { src: "DSCF6281.jpg" },
  { src: "DSCF9194.jpg" },
  { src: "DSCF5255.jpg" },
  { src: "DSCF6450.jpg" },
  { src: "DSCF7376.jpg" },
  { src: "DSCF8153.jpg" },
  { src: "DSCF8284.jpg" },
  { src: "DSCF8357.jpg" },
  { src: "DSCF8653.jpg" },
  { src: "DSCF8144.jpg" },
  { src: "DSCF8845.jpg" },
  { src: "DSCF9028.jpg" },
]);

// if you can't see my mirrors
export const iycsmmImages = buildImages([
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
