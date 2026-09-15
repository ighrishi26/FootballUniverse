import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RotateCcw,
    Shield,
    Trophy,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
    deleteClub,
    getClubs,
} from "../services/api";


function Clubs() {

    const [clubs, setClubs] = useState([]);

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("All");
    const [league, setLeague] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadClubs = async () => {

            try {

                const response = await getClubs();

                setClubs(
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

        loadClubs();

    }, []);


    const handleDelete = async (id, name) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteClub(id);

            setClubs((previous) =>
                previous.filter(
                    (club) => club.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert("Unable to delete club.");

        }

    };


    const countries = useMemo(() => {

        return [
            "All",
            ...new Set(
                clubs.map((club) => club.country)
            ),
        ];

    }, [clubs]);


    const leagues = useMemo(() => {

        return [
            "All",
            ...new Set(
                clubs.map((club) => club.league)
            ),
        ];

    }, [clubs]);


    const filteredClubs = useMemo(() => {

        let result = clubs.filter((club) => {

            const text = search.toLowerCase();

            const matchesSearch =
                club.name.toLowerCase().includes(text) ||
                club.country.toLowerCase().includes(text) ||
                club.league.toLowerCase().includes(text) ||
                club.stadium.toLowerCase().includes(text);

            const matchesCountry =
                country === "All" ||
                club.country === country;

            const matchesLeague =
                league === "All" ||
                club.league === league;

            return (
                matchesSearch &&
                matchesCountry &&
                matchesLeague
            );

        });


        result.sort((a, b) => {

            if (sortBy === "trophies") {
                return b.trophies - a.trophies;
            }

            if (sortBy === "founded") {
                return a.founded - b.founded;
            }

            if (sortBy === "founded-new") {
                return b.founded - a.founded;
            }

            return a.name.localeCompare(b.name);

        });


        return result;

    }, [
        clubs,
        search,
        country,
        league,
        sortBy,
    ]);


    const totalTrophies = clubs.reduce(
        (total, club) =>
            total + club.trophies,
        0
    );


    const oldestClub = clubs.length
        ? [...clubs].sort(
            (a, b) =>
                a.founded - b.founded
        )[0]
        : null;


    const resetFilters = () => {

        setSearch("");
        setCountry("All");
        setLeague("All");
        setSortBy("name");

    };


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading clubs...
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

        <main className="database-page">

            <section className="database-header">

                <p>
                    FOOTBALL DATABASE
                </p>

                <h1>
                    CLUBS
                </h1>

                <span>
                    Explore clubs, leagues, stadiums and football history.
                </span>

            </section>


            <section className="club-controls">

                <div className="database-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search club, league, country or stadium..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


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
                    value={league}
                    onChange={(e) =>
                        setLeague(e.target.value)
                    }
                >

                    {leagues.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Leagues"
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
                        Name
                    </option>

                    <option value="trophies">
                        Most Trophies
                    </option>

                    <option value="founded">
                        Oldest First
                    </option>

                    <option value="founded-new">
                        Newest First
                    </option>

                </select>


                <button
                    className="reset-filter-btn"
                    onClick={resetFilters}
                >

                    <RotateCcw size={15} />

                    Reset

                </button>


                <button
                    className="add-player-btn"
                    onClick={() =>
                        navigate("/clubs/new")
                    }
                >

                    <Plus size={17} />

                    Add Club

                </button>

            </section>


            <section className="database-summary">

                <div>

                    <strong>
                        {filteredClubs.length}
                    </strong>

                    <span>
                        Clubs Found
                    </span>

                </div>


                <div>

                    <strong>
                        {clubs.length}
                    </strong>

                    <span>
                        Total Clubs
                    </span>

                </div>


                <div>

                    <strong>
                        {totalTrophies}
                    </strong>

                    <span>
                        Total Trophies
                    </span>

                </div>

            </section>


            <section className="club-database-grid">

                {filteredClubs.length === 0 ? (

                    <div className="empty-state">

                        <Shield size={32} />

                        <h3>
                            No clubs found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                    </div>

                ) : (

                    filteredClubs.map((club) => (

                        <div
                            className="database-club-card"
                            key={club.id}
                        >

                            <Link
                                to={`/clubs/${club.id}`}
                                className="database-club-link"
                            >

                                <div className="database-club-top">

                                    <div className="club-large-icon">
                                        {club.name.charAt(0)}
                                    </div>

                                    <div className="club-trophy-count">

                                        <Trophy size={14} />

                                        {club.trophies}

                                    </div>

                                </div>


                                <div className="database-club-content">

                                    <h2>
                                        {club.name}
                                    </h2>

                                    <p>
                                        {club.league}
                                    </p>


                                    <div className="club-details">

                                        <span>
                                            {club.country}
                                        </span>

                                        <span>
                                            Est. {club.founded}
                                        </span>

                                    </div>


                                    <div className="club-stadium">

                                        {club.stadium}

                                    </div>

                                </div>

                            </Link>


                            <div className="player-card-actions">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/clubs/${club.id}/edit`
                                        )
                                    }
                                >

                                    <Pencil size={15} />

                                    Edit

                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            club.id,
                                            club.name
                                        )
                                    }
                                >

                                    <Trash2 size={15} />

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                )}

            </section>


            {oldestClub && (

                <section className="club-highlight">

                    <div>

                        <span>
                            OLDEST CLUB IN DATABASE
                        </span>

                        <h2>
                            {oldestClub.name}
                        </h2>

                    </div>

                    <strong>
                        {oldestClub.founded}
                    </strong>

                </section>

            )}

        </main>

    );

}


export default Clubs;