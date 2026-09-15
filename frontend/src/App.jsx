import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Players from "./pages/Players";
import Clubs from "./pages/Clubs";
import Competitions from "./pages/Competitions";
import Transfers from "./pages/Transfers";
import Compare from "./pages/Compare";
import TimelinePage from "./pages/TimelinePage";
import Formations from "./pages/Formations";
import Explore from "./pages/Explore";
import PlayerDetails from "./pages/PlayerDetails";
import ClubDetails from "./pages/ClubDetails";
import CompetitionDetails from "./pages/CompetitionDetails";
import Analytics from "./pages/Analytics";
import PlayerForm from "./pages/PlayerForm";
import ClubForm from "./pages/ClubForm";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/players" element={<Players />} />

    <Route
        path="/players/:id"
        element={<PlayerDetails />}
    />

    <Route path="/clubs" element={<Clubs />} />

    <Route
    path="/clubs/:id"
    element={<ClubDetails />}
/>

<Route path="/clubs/new" element={<ClubForm />} />
<Route path="/clubs/:id/edit" element={<ClubForm />} />
<Route
    path="/competitions/:id"
    element={<CompetitionDetails />}
/>

<Route path="/analytics" element={<Analytics />} />

<Route path="/players/new" element={<PlayerForm />} />
<Route path="/players/:id/edit" element={<PlayerForm />} />

    <Route
        path="/competitions"
        element={<Competitions />}
    />

    <Route
        path="/transfers"
        element={<Transfers />}
    />

    <Route
        path="/compare"
        element={<Compare />}
    />

    <Route
        path="/timeline"
        element={<TimelinePage />}
    />

    <Route
        path="/formations"
        element={<Formations />}
    />

    <Route
        path="/explore"
        element={<Explore />}
    />

</Routes>
        </BrowserRouter>
    );
}

export default App;