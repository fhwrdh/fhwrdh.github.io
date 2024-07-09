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
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="work">
        <Route path="ftprtu" element={<FirstTheyPassed />} />
        <Route path="ontheroad" element={<OnTheRoad />} />
        <Route path="soundofthesea" element={<SoundOfTheSea />} />
      </Route>
      <Route path="about" element={<About />} />
    </Route>,
  ),
);

export default router;
