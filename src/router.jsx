import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import FirstTheyPassed from "./work/FirstTheyPassed";
import OnTheRoad from "./work/OnTheRoad";
import SoundOfTheSea from "./work/SoundOfTheSea";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/:id?" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="work">
        <Route path="ftprtu/:id?" element={<FirstTheyPassed />} />
        <Route path="ontheroad/:id?" element={<OnTheRoad />} />
        <Route path="soundofthesea/:id?" element={<SoundOfTheSea />} />
      </Route>
      <Route path="about" element={<About />} />
    </Route>,
  ),
);

export default router;
