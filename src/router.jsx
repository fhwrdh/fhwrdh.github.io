import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import FirstTheyPassed from "./work/FirstTheyPassed";
import AngleOfRepose from "./work/AngleOfRepose";
import SoundOfTheSea from "./work/SoundOfTheSea";
import IfYouCantSeeMyMirrors from "./work/IfYouCantSeeMyMirrors";
import { migrateLegacyHash } from "./legacyHash";

// Must run before createBrowserRouter reads window.location.
migrateLegacyHash(window.location, window.history);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/:id?" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="work">
        <Route path="ftprtu/:id?" element={<FirstTheyPassed />} />
        <Route path="iycsmm/:id?" element={<IfYouCantSeeMyMirrors />} />
        <Route path="angleofrepose/:id?" element={<AngleOfRepose />} />
        <Route path="soundofthesea/:id?" element={<SoundOfTheSea />} />
      </Route>
      <Route path="about" element={<About />} />
    </Route>,
  ),
);

export default router;
