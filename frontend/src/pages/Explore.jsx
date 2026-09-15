import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RotateCcw,
    Users,
    Shield,
    Trophy,
    ArrowRightLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
    getPlayers,
    getClubs,
    getCompetitions,
    getTransfers,
} from "../services/api";


function Explore() {

    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [transfers, setTransfers] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadData = async () => {

            try {

                const [
                    playersResponse,
                    clubsResponse,
                    competitionsResponse,
                    transfersResponse,
                ] = await Promise.all([
                    getPlayers(),
                    getClubs(),
                    getCompetitions(),
                    getTransfers(),
                ]);


                setPlayers(
                    playersResponse.data.results ||
                    playersResponse.data
                );

                setClubs(
                    clubsResponse.data.results ||
                    clubsResponse.data
                );

                setCompetitions(
                    competitionsResponse.data.results ||
                    competitionsResponse.data
                );

                setTransfers(
                    transfersResponse.data.results ||
                    transfersResponse.data
                );

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to connect to the Football Universe server."
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, []);


    const text = search.toLowerCase().trim();


    const playerResults = useMemo(() => {

        if (!text) return [];

        return players.filter((player) =>
            player.name.toLowerCase().includes(text) ||
            player.country.toLowerCase().includes(text) ||
            player.position.toLowerCase().includes(text) ||
            (player.club_name || "")
                .toLowerCase()
                .includes(text)
        );

    }, [players, text]);


    const clubResults = useMemo(() => {

        if (!text) return [];

        return clubs.filter((club) =>
            club.name.toLowerCase().includes(text) ||
            club.country.toLowerCase().includes(text) ||
            club.league.toLowerCase().includes(text) ||
            club.stadium.toLowerCase().includes(text)
        );

    }, [clubs, text]);


    const competitionResults = useMemo(() => {

        if (!text) return [];

        return competitions.filter((competition) =>
            competition.name.toLowerCase().includes(text) ||
            competition.country.toLowerCase().includes(text) ||
            competition.type.toLowerCase().includes(text)
        );

    }, [competitions, text]);


    const transferResults = useMemo(() => {

        if (!text) return [];

        return transfers.filter((transfer) =>
            transfer.player_name
                .toLowerCase()
                .includes(text) ||
            transfer.from_club
                .toLowerCase()
                .includes(text) ||
            transfer.to_club
                .toLowerCase()
                .includes(text) ||
            transfer.season
                .toLowerCase()
                .includes(text)
        );

    }, [transfers, text]);


    const totalResults =
        playerResults.length +
        clubResults.length +
        competitionResults.length +
        transferResults.length;


    const resetSearch = () => {

        setSearch("");
        setCategory("All");

    };


    const categories = [
        {
            value: "All",
            label: "All Results",
        },
        {
            value: "Players",
            label: "Players",
        },
        {
            value: "Clubs",
            label: "Clubs",
        },
        {
            value: "Competitions",
            label: "Competitions",
        },
        {
            value: "Transfers",
            label: "Transfers",
        },
    ];


    const showPlayers =
        category === "All" ||
        category === "Players";

    const showClubs =
        category === "All" ||
        category === "Clubs";

    const showCompetitions =
        category === "All" ||
        category === "Competitions";

    const showTransfers =
        category === "All" ||
        category === "Transfers";


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading football database...
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

        <main className="explore-page">

            <section className="explore-hero">

                <p>
                    FOOTBALL UNIVERSE DATABASE
                </p>

                <h1>
                    EXPLORE
                </h1>

                <span>
                    Search across players, clubs, competitions and transfers.
                </span>


                <div className="explore-search">

                    <Search size={22} />

                    <input
                        type="text"
                        placeholder="Search Messi, Barcelona, Champions League..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (

                        <button
                            onClick={resetSearch}
                            title="Clear search"
                        >
                            <RotateCcw size={16} />
                        </button>

                    )}

                </div>

            </section>


            <section className="explore-categories">

                {categories.map((item) => (

                    <button
                        key={item.value}
                        className={
                            category === item.value
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory(item.value)
                        }
                    >
                        {item.label}
                    </button>

                ))}

            </section>


            {!search ? (

                <section className="explore-empty">

                    <Search size={42} />

                    <h2>
                        Search the Football Universe
                    </h2>

                    <p>
                        Find players, clubs, competitions and transfer records.
                    </p>

                </section>

            ) : (

                <section className="explore-results">

                    <div className="explore-result-header">

                        <div>

                            <span>
                                SEARCH RESULTS
                            </span>

                            <h2>
                                {totalResults} results for "{search}"
                            </h2>

                        </div>

                        <button
                            onClick={resetSearch}
                            className="explore-reset"
                        >
                            <RotateCcw size={14} />
                            Reset
                        </button>

                    </div>


                    {showPlayers &&
                        playerResults.length > 0 && (

                            <section className="explore-result-group">

                                <div className="explore-group-title">

                                    <Users size={17} />

                                    <h3>
                                        Players
                                    </h3>

                                    <span>
                                        {playerResults.length}
                                    </span>

                                </div>


                                <div className="explore-grid">

                                    {playerResults
                                        .slice(0, 8)
                                        .map((player) => (

                                            <Link
                                                key={player.id}
                                                to={`/players/${player.id}`}
                                                className="explore-card"
                                            >

                                                <div className="explore-card-icon">
                                                    {player.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>

                                                    <h4>
                                                        {player.name}
                                                    </h4>

                                                    <p>
                                                        {player.position}
                                                        {" • "}
                                                        {player.club_name ||
                                                            "No Club"}
                                                    </p>

                                                    <span>
                                                        {player.country}
                                                    </span>

                                                </div>

                                            </Link>

                                        ))}

                                </div>

                            </section>

                        )}


                    {showClubs &&
                        clubResults.length > 0 && (

                            <section className="explore-result-group">

                                <div className="explore-group-title">

                                    <Shield size={17} />

                                    <h3>
                                        Clubs
                                    </h3>

                                    <span>
                                        {clubResults.length}
                                    </span>

                                </div>


                                <div className="explore-grid">

                                    {clubResults
                                        .slice(0, 8)
                                        .map((club) => (

                                            <Link
                                                key={club.id}
                                                to={`/clubs/${club.id}`}
                                                className="explore-card"
                                            >

                                                <div className="explore-card-icon">
                                                    <Shield size={19} />
                                                </div>

                                                <div>

                                                    <h4>
                                                        {club.name}
                                                    </h4>

                                                    <p>
                                                        {club.league}
                                                    </p>

                                                    <span>
                                                        {club.country}
                                                    </span>

                                                </div>

                                            </Link>

                                        ))}

                                </div>

                            </section>

                        )}


                    {showCompetitions &&
                        competitionResults.length > 0 && (

                            <section className="explore-result-group">

                                <div className="explore-group-title">

                                    <Trophy size={17} />

                                    <h3>
                                        Competitions
                                    </h3>

                                    <span>
                                        {competitionResults.length}
                                    </span>

                                </div>


                                <div className="explore-grid">

                                    {competitionResults
                                        .slice(0, 8)
                                        .map((competition) => (

                                            <Link
                                                key={competition.id}
                                                to={`/competitions/${competition.id}`}
                                                className="explore-card"
                                            >

                                                <div className="explore-card-icon">
                                                    <Trophy size={19} />
                                                </div>

                                                <div>

                                                    <h4>
                                                        {competition.name}
                                                    </h4>

                                                    <p>
                                                        {competition.type}
                                                        {" • "}
                                                        {competition.teams}
                                                        {" teams"}
                                                    </p>

                                                    <span>
                                                        {competition.country}
                                                    </span>

                                                </div>

                                            </Link>

                                        ))}

                                </div>

                            </section>

                        )}


                    {showTransfers &&
                        transferResults.length > 0 && (

                            <section className="explore-result-group">

                                <div className="explore-group-title">

                                    <ArrowRightLeft size={17} />

                                    <h3>
                                        Transfers
                                    </h3>

                                    <span>
                                        {transferResults.length}
                                    </span>

                                </div>


                                <div className="explore-transfer-list">

                                    {transferResults
                                        .slice(0, 8)
                                        .map((transfer) => (

                                            <div
                                                key={transfer.id}
                                                className="explore-transfer-card"
                                            >

                                                <div>

                                                    <strong>
                                                        {transfer.player_name}
                                                    </strong>

                                                    <span>
                                                        {transfer.player_position}
                                                    </span>

                                                </div>


                                                <div className="explore-transfer-route">

                                                    <span>
                                                        {transfer.from_club}
                                                    </span>

                                                    <ArrowRightLeft
                                                        size={14}
                                                    />
                                                    <span>
                                                        {transfer.to_club}
                                                    </span>

                                                </div>


                                                <div className="explore-transfer-meta">

                                                    <span>
                                                        {transfer.season}
                                                    </span>

                                                    <span>
                                                        {transfer.fee}
                                                    </span>

                                                </div>

                                            </div>

                                        ))}

                                </div>

                            </section>

                        )}


                    {totalResults === 0 && (

                        <div className="explore-no-results">

                            <Search size={32} />

                            <h3>
                                No results found
                            </h3>

                            <p>
                                Try another player, club, competition or transfer.
                            </p>

                        </div>

                    )}

                </section>

            )}

        </main>

    );

}


export default Explore;