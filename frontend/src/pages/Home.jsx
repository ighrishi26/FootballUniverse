import { useEffect, useState } from "react";
import {
    Search,
    ArrowRight,
    Trophy,
    Users,
    Shield,
    CalendarDays,
    Target,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
    getPlayers,
    getClubs,
    getCompetitions,
    getTimelineEvents,
    getDashboardStats,
    getTransfers,
} from "../services/api";


function Home() {

    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [stats, setStats] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const loadHomeData = async () => {
            try {
                const [
                    playersResponse,
                    clubsResponse,
                    competitionsResponse,
                    timelineResponse,
                    statsResponse,
                    transfersResponse,
                ] = await Promise.all([
                    getPlayers(),
                    getClubs(),
                    getCompetitions(),
                    getTimelineEvents(),
                    getDashboardStats(),
                    getTransfers(),
                ]);

                setPlayers(playersResponse.data.results || playersResponse.data);
                setClubs(clubsResponse.data.results || clubsResponse.data);
                setCompetitions(
                    competitionsResponse.data.results || competitionsResponse.data
                );

                setTimeline(
                    timelineResponse.data.results ||
                    timelineResponse.data
                );

                setTransfers(
                    transfersResponse.data.results || transfersResponse.data
                );

                setStats(statsResponse.data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to connect to the Football Universe server."
                );

            } finally {

                setLoading(false);

            }
        };


        loadHomeData();

    }, []);


    const searchText = search.toLowerCase().trim();

const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchText) ||
    player.country.toLowerCase().includes(searchText) ||
    (player.club_name || "").toLowerCase().includes(searchText) ||
    player.position.toLowerCase().includes(searchText)
);

const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchText) ||
    club.country.toLowerCase().includes(searchText) ||
    club.league.toLowerCase().includes(searchText)
);

const filteredCompetitions = competitions.filter((competition) =>
    competition.name.toLowerCase().includes(searchText) ||
    competition.country.toLowerCase().includes(searchText) ||
    competition.type.toLowerCase().includes(searchText)
);

const filteredTransfers = transfers.filter((transfer) =>
    transfer.player_name.toLowerCase().includes(searchText) ||
    transfer.from_club.toLowerCase().includes(searchText) ||
    transfer.to_club.toLowerCase().includes(searchText) ||
    transfer.season.toLowerCase().includes(searchText)
);


    const featuredPlayers = filteredPlayers.slice(0, 4);

    const popularClubs = clubs.slice(0, 6);

    const featuredCompetitions = competitions.slice(0, 4);

    const latestTimeline = [...timeline]
        .sort((a, b) => b.year - a.year)
        .slice(0, 4);


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading Football Universe...
                </div>

            </main>
        );
    }


    if (error) {

        return (
            <main className="page-container">

                <div className="error-state">
                    {error}
                </div>

            </main>
        );
    }


    return (

        <main>

            {/* HERO */}

            <section className="home-hero">

                <div className="hero-content">

                    <p className="hero-label">
                        THE WORLD OF FOOTBALL
                    </p>

                    <h1>
                        EXPLORE
                        <span> FOOTBALL.</span>
                    </h1>

                    <p className="hero-description">
                        Discover players, clubs, competitions,
                        transfers and the history of the beautiful game.
                    </p>


                    <div className="home-search">

                        <Search size={20} />

                        <input
                            type="text"
                            placeholder="Search players..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

            </section>


            {/* DATABASE STATS */}

            {stats && (

                <section className="home-stats">

                    <div className="home-stat-card">

                        <Users size={22} />

                        <strong>
                            {stats.players}
                        </strong>

                        <span>
                            Players
                        </span>

                    </div>


                    <div className="home-stat-card">

                        <Shield size={22} />

                        <strong>
                            {stats.clubs}
                        </strong>

                        <span>
                            Clubs
                        </span>

                    </div>


                    <div className="home-stat-card">

                        <Trophy size={22} />

                        <strong>
                            {stats.competitions}
                        </strong>

                        <span>
                            Competitions
                        </span>

                    </div>


                    <div className="home-stat-card">

                        <Target size={22} />

                        <strong>
                            {stats.total_goals}
                        </strong>

                        <span>
                            Goals
                        </span>

                    </div>

                </section>

            )}


            {/* FEATURED PLAYERS */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <p>
                            DATABASE
                        </p>

                        <h2>
                            FEATURED PLAYERS
                        </h2>

                    </div>

                    <Link to="/players">
                        View all
                        <ArrowRight size={16} />
                    </Link>

                </div>


                <div className="player-grid">

                    {featuredPlayers.map((player) => (

                        <Link
                            to={`/players/${player.id}`}
                            className="player-card"
                            key={player.id}
                        >

                            <div className="player-image">

                                {player.image ? (

                                    <img
                                        src={player.image}
                                        alt={player.name}
                                    />

                                ) : (

                                    <div className="image-placeholder">
                                        {player.name.charAt(0)}
                                    </div>

                                )}

                            </div>


                            <div className="player-card-content">

                                <span>
                                    {player.position}
                                </span>

                                <h3>
                                    {player.name}
                                </h3>

                                <p>
                                    {player.club_name || "No club"}
                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>


            {/* CLUBS */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <p>
                            CLUB DATABASE
                        </p>

                        <h2>
                            POPULAR CLUBS
                        </h2>

                    </div>

                    <Link to="/clubs">
                        View all
                        <ArrowRight size={16} />
                    </Link>

                </div>


                <div className="club-grid">

                    {popularClubs.map((club) => (

                        <Link
                            to={`/clubs/${club.id}`}
                            className="club-card"
                            key={club.id}
                        >

                            <div className="club-card-icon">
                                {club.name.charAt(0)}
                            </div>

                            <div>

                                <h3>
                                    {club.name}
                                </h3>

                                <p>
                                    {club.league}
                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>


            {/* COMPETITIONS */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <p>
                            TOURNAMENTS
                        </p>

                        <h2>
                            COMPETITIONS
                        </h2>

                    </div>

                    <Link to="/competitions">
                        View all
                        <ArrowRight size={16} />
                    </Link>

                </div>


                <div className="competition-grid">

                    {featuredCompetitions.map((competition) => (

                        <Link
                            to={`/competitions/${competition.id}`}
                            className="competition-card"
                            key={competition.id}
                        >

                            <Trophy size={26} />

                            <div>

                                <h3>
                                    {competition.name}
                                </h3>

                                <p>
                                    {competition.type}
                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>


            {/* TIMELINE */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <p>
                            FOOTBALL HISTORY
                        </p>

                        <h2>
                            TIMELINE
                        </h2>

                    </div>

                    <Link to="/timeline">
                        View full timeline
                        <ArrowRight size={16} />
                    </Link>

                </div>


                <div className="home-timeline">

                    {latestTimeline.map((event) => (

                        <Link
                            to="/timeline"
                            className="home-timeline-item"
                            key={event.id}
                        >

                            <div className="timeline-year">
                                {event.year}
                            </div>

                            <div className="timeline-content">

                                <span>
                                    {event.category}
                                </span>

                                <h3>
                                    {event.title}
                                </h3>

                                <p>
                                    {event.description}
                                </p>

                            </div>

                            <CalendarDays size={20} />

                        </Link>

                    ))}

                </div>

            </section>


            {/* SEARCH RESULT */}

            {searchText && (

    <section className="home-search-results">

        <h2>
            SEARCH RESULTS
        </h2>


        {filteredPlayers.length > 0 && (

            <div className="search-result-group">

                <h3>
                    Players
                </h3>

                {filteredPlayers.slice(0, 5).map((player) => (

                    <Link
                        key={player.id}
                        to={`/players/${player.id}`}
                        className="search-result-item"
                    >

                        <div>
                            <strong>
                                {player.name}
                            </strong>

                            <span>
                                {player.position} •{" "}
                                {player.club_name || "No club"}
                            </span>
                        </div>

                        <ArrowRight size={16} />

                    </Link>

                ))}

            </div>

        )}


        {filteredClubs.length > 0 && (

            <div className="search-result-group">

                <h3>
                    Clubs
                </h3>

                {filteredClubs.slice(0, 5).map((club) => (

                    <Link
                        key={club.id}
                        to={`/clubs/${club.id}`}
                        className="search-result-item"
                    >

                        <div>
                            <strong>
                                {club.name}
                            </strong>

                            <span>
                                {club.league} • {club.country}
                            </span>
                        </div>

                        <ArrowRight size={16} />

                    </Link>

                ))}

            </div>

        )}


        {filteredCompetitions.length > 0 && (

            <div className="search-result-group">

                <h3>
                    Competitions
                </h3>

                {filteredCompetitions.slice(0, 5).map((competition) => (

                    <Link
                        key={competition.id}
                        to={`/competitions/${competition.id}`}
                        className="search-result-item"
                    >

                        <div>
                            <strong>
                                {competition.name}
                            </strong>

                            <span>
                                {competition.type} •{" "}
                                {competition.country}
                            </span>
                        </div>

                        <ArrowRight size={16} />

                    </Link>

                ))}

            </div>

        )}


        {filteredTransfers.length > 0 && (

            <div className="search-result-group">

                <h3>
                    Transfers
                </h3>

                {filteredTransfers.slice(0, 5).map((transfer) => (

                    <Link
                        key={transfer.id}
                        to="/transfers"
                        className="search-result-item"
                    >

                        <div>
                            <strong>
                                {transfer.player_name}
                            </strong>

                            <span>
                                {transfer.from_club} →{" "}
                                {transfer.to_club}
                            </span>
                        </div>

                        <ArrowRight size={16} />

                    </Link>

                ))}

            </div>

        )}


        {filteredPlayers.length === 0 &&
            filteredClubs.length === 0 &&
            filteredCompetitions.length === 0 &&
            filteredTransfers.length === 0 && (

                <p>
                    No results found for "{search}".
                </p>

            )}

    </section>

)}

        </main>

    );
}


export default Home;