import * as R from "ramda";

const prefix = "/work/";
const addPrefix = R.map((i) => R.assocPath(["src"], `${prefix}${i.src}`, i));

export const ftprtu = [
  { src: "1_DSCF7931.jpg" },
  { src: "2_DSCF7930.jpg" },
  { src: "3_DSCF8416.jpg" },
  { src: "4_DSCF8007.jpg" },
  { src: "5_DSCF8405.jpg" },
  { src: "6_DSCF7887.jpg" },
  { src: "7_DSCF7961.jpg" },
  { src: "8_DSCF7944.jpg" },
];

const home = [
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
];

const otr = [
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
];

const sots = [
  { src: "DSCF2648.jpg" },
  { src: "DSCF2743.jpg" },
  { src: "DSCF2788.jpg" },
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
];

export const homeImages = addPrefix(home);
export const ftprtuImages = addPrefix(ftprtu);
export const otrImages = addPrefix(otr);
export const sotsImages = addPrefix(sots);
