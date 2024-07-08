import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import FirstTheyPassed from "./work/FirstTheyPassed";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="work">
        <Route path="ftprtu" element={<FirstTheyPassed />} />
        <Route path="2" element={<div>222</div>} />
      </Route>
      <Route path="about" element={<div>abOOOut</div>} />
    </Route>,
  ),
);

export default router;
