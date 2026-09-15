import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RotateCcw,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
    getPlayers,
    deletePlayer,
} from "../services/api";


function Players() {

    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);

    const [search, setSearch] = useState("");
    const [position, setPosition] = useState("All");
    const [country, setCountry] = useState("All");
    const [club, setClub] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadPlayers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getPlayers();

            setPlayers(
                response.data.results ||
                response.data
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


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadPlayers();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);


    const positions = useMemo(() => {

        return [
            "All",
            ...new Set(
                players.map(
                    (player) => player.position
                )
            ),
        ];

    }, [players]);


    const countries = useMemo(() => {

        return [
            "All",
            ...new Set(
                players.map(
                    (player) => player.country
                )
            ),
        ].sort();

    }, [players]);


    const clubs = useMemo(() => {

        return [
            "All",
            ...new Set(
                players
                    .map(
                        (player) => player.club_name
                    )
                    .filter(Boolean)
            ),
        ].sort();

    }, [players]);


    const filteredPlayers = useMemo(() => {

        let result = players.filter((player) => {

            const text = search.toLowerCase();

            const matchesSearch =
                player.name
                    .toLowerCase()
                    .includes(text) ||
                player.country
                    .toLowerCase()
                    .includes(text) ||
                player.position
                    .toLowerCase()
                    .includes(text) ||
                (player.club_name || "")
                    .toLowerCase()
                    .includes(text);

            const matchesPosition =
                position === "All" ||
                player.position === position;

            const matchesCountry =
                country === "All" ||
                player.country === country;

            const matchesClub =
                club === "All" ||
                player.club_name === club;

            return (
                matchesSearch &&
                matchesPosition &&
                matchesCountry &&
                matchesClub
            );

        });


        result.sort((a, b) => {

            if (sortBy === "goals") {
                return b.goals - a.goals;
            }

            if (sortBy === "assists") {
                return b.assists - a.assists;
            }

            if (sortBy === "appearances") {
                return b.appearances - a.appearances;
            }

            if (sortBy === "trophies") {
                return b.trophies - a.trophies;
            }

            return a.name.localeCompare(b.name);

        });


        return result;

    }, [
        players,
        search,
        position,
        country,
        club,
        sortBy,
    ]);


    const resetFilters = () => {

        setSearch("");
        setPosition("All");
        setCountry("All");
        setClub("All");
        setSortBy("name");

    };


    const handleDelete = async (player) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${player.name}?`
        );

        if (!confirmed) {
            return;
        }


        try {

            await deletePlayer(player.id);

            setPlayers((previous) =>
                previous.filter(
                    (item) => item.id !== player.id
                )
            );

        } catch (err) {

            console.error(err);

            alert(
                "Unable to delete the player."
            );

        }

    };


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading players...
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

        <main className="players-database">

            <section className="database-header">

                <div>

                    <p>
                        FOOTBALL UNIVERSE DATABASE
                    </p>

                    <h1>
                        PLAYERS
                    </h1>

                    <span>
                        Explore and manage football players.
                    </span>

                </div>


                <button
                    className="add-player-btn"
                    onClick={() =>
                        navigate("/players/new")
                    }
                >

                    <Plus size={17} />

                    Add Player

                </button>

            </section>


            <section className="database-controls">

                <div className="database-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search players, clubs, countries..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={position}
                    onChange={(e) =>
                        setPosition(e.target.value)
                    }
                >

                    {positions.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Positions"
                                : item}
                        </option>

                    ))}

                </select>


                <select
                    value={country}
                    onChange={(e) =>
                        setCountry(e.target.value)
                    }
                >

                    {countries.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Countries"
                                : item}
                        </option>

                    ))}

                </select>


                <select
                    value={club}
                    onChange={(e) =>
                        setClub(e.target.value)
                    }
                >

                    {clubs.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Clubs"
                                : item}
                        </option>

                    ))}

                </select>


                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                >

                    <option value="name">
                        Sort: Name
                    </option>

                    <option value="goals">
                        Sort: Goals
                    </option>

                    <option value="assists">
                        Sort: Assists
                    </option>

                    <option value="appearances">
                        Sort: Appearances
                    </option>

                    <option value="trophies">
                        Sort: Trophies
                    </option>

                </select>


                <button
                    className="reset-filter-btn"
                    onClick={resetFilters}
                >

                    <RotateCcw size={15} />

                    Reset

                </button>

            </section>


            <section className="database-summary">

                <div>
                    <strong>
                        {filteredPlayers.length}
                    </strong>

                    <span>
                        Players Found
                    </span>
                </div>

                <div>
                    <strong>
                        {players.length}
                    </strong>

                    <span>
                        Total Players
                    </span>
                </div>

                <div>
                    <strong>
                        {new Set(
                            players.map(
                                (player) =>
                                    player.country
                            )
                        ).size}
                    </strong>

                    <span>
                        Countries
                    </span>
                </div>

                <div>
                    <strong>
                        {new Set(
                            players
                                .map(
                                    (player) =>
                                        player.club_name
                                )
                                .filter(Boolean)
                        ).size}
                    </strong>

                    <span>
                        Clubs
                    </span>
                </div>

            </section>


            {filteredPlayers.length === 0 ? (

                <div className="empty-state">

                    <h3>
                        No players found
                    </h3>

                    <p>
                        Try changing your search or filters.
                    </p>

                </div>

            ) : (

                <section className="database-player-grid">

                    {filteredPlayers.map((player) => (

                        <article
                            className="database-player-card"
                            key={player.id}
                        >

                            <Link
                                to={`/players/${player.id}`}
                                className="player-card-main"
                            >

                                <div className="player-card-avatar">

    {player.image ? (

        <img
            src={player.image}
            alt={player.name}
        />

    ) : (

        player.name
            .charAt(0)
            .toUpperCase()

    )}

</div>


                                <div className="player-card-content">

                                    <div className="player-card-top">

                                        <span>
                                            {player.position}
                                        </span>

                                        <small>
                                            #{player.shirt_number}
                                        </small>

                                    </div>


                                    <h2>
                                        {player.name}
                                    </h2>

                                    <p>
                                        {player.club_name ||
                                            "No Club"}
                                    </p>

                                    <span>
                                        {player.country}
                                    </span>

                                </div>

                            </Link>


                            <div className="player-card-stats">

                                <div>
                                    <strong>
                                        {player.goals}
                                    </strong>

                                    <span>
                                        Goals
                                    </span>
                                </div>

                                <div>
                                    <strong>
                                        {player.assists}
                                    </strong>

                                    <span>
                                        Assists
                                    </span>
                                </div>

                                <div>
                                    <strong>
                                        {player.appearances}
                                    </strong>

                                    <span>
                                        Apps
                                    </span>
                                </div>

                            </div>


                            <div className="player-card-actions">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/players/${player.id}/edit`
                                        )
                                    }
                                >

                                    <Pencil size={14} />

                                    Edit

                                </button>


                                <button
                                    className="delete-player-btn"
                                    onClick={() =>
                                        handleDelete(player)
                                    }
                                >

                                    <Trash2 size={14} />

                                    Delete

                                </button>

                            </div>

                        </article>

                    ))}

                </section>

            )}

        </main>

    );

}


export default Players;