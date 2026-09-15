import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RotateCcw,
    Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getCompetitions } from "../services/api";


function Competitions() {

    const [competitions, setCompetitions] = useState([]);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("All");
    const [country, setCountry] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadCompetitions = async () => {

            try {

                const response = await getCompetitions();

                setCompetitions(
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

        loadCompetitions();

    }, []);


    const types = useMemo(() => {

        return [
            "All",
            ...new Set(
                competitions.map(
                    (competition) => competition.type
                )
            ),
        ];

    }, [competitions]);


    const countries = useMemo(() => {

        return [
            "All",
            ...new Set(
                competitions.map(
                    (competition) => competition.country
                )
            ),
        ];

    }, [competitions]);


    const filteredCompetitions = useMemo(() => {

        let result = competitions.filter((competition) => {

            const text = search.toLowerCase();

            const matchesSearch =
                competition.name
                    .toLowerCase()
                    .includes(text) ||
                competition.country
                    .toLowerCase()
                    .includes(text);

            const matchesType =
                type === "All" ||
                competition.type === type;

            const matchesCountry =
                country === "All" ||
                competition.country === country;

            return (
                matchesSearch &&
                matchesType &&
                matchesCountry
            );

        });


        result.sort((a, b) => {

            if (sortBy === "founded") {
                return a.founded - b.founded;
            }

            if (sortBy === "founded-new") {
                return b.founded - a.founded;
            }

            if (sortBy === "teams") {
                return b.teams - a.teams;
            }

            return a.name.localeCompare(b.name);

        });


        return result;

    }, [
        competitions,
        search,
        type,
        country,
        sortBy,
    ]);


    const totalTeams = competitions.reduce(
        (total, competition) =>
            total + competition.teams,
        0
    );


    const clubCompetitions = competitions.filter(
        (competition) =>
            competition.type === "Club"
    ).length;


    const nationalCompetitions = competitions.filter(
        (competition) =>
            competition.type === "National"
    ).length;


    const resetFilters = () => {

        setSearch("");
        setType("All");
        setCountry("All");
        setSortBy("name");

    };


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading competitions...
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
                    COMPETITIONS
                </h1>

                <span>
                    Explore major football tournaments and competitions.
                </span>

            </section>


            <section className="competition-controls">

                <div className="database-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search competition or country..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                >

                    {types.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Types"
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
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                >

                    <option value="name">
                        Name
                    </option>

                    <option value="founded">
                        Oldest First
                    </option>

                    <option value="founded-new">
                        Newest First
                    </option>

                    <option value="teams">
                        Most Teams
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
                        {filteredCompetitions.length}
                    </strong>

                    <span>
                        Competitions Found
                    </span>

                </div>


                <div>

                    <strong>
                        {clubCompetitions}
                    </strong>

                    <span>
                        Club Competitions
                    </span>

                </div>


                <div>

                    <strong>
                        {nationalCompetitions}
                    </strong>

                    <span>
                        National Competitions
                    </span>

                </div>

            </section>


            <section className="competition-database-grid">

                {filteredCompetitions.length === 0 ? (

                    <div className="empty-state">

                        <Trophy size={32} />

                        <h3>
                            No competitions found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                    </div>

                ) : (

                    filteredCompetitions.map((competition) => (

                        <Link
                            to={`/competitions/${competition.id}`}
                            className="database-competition-card"
                            key={competition.id}
                        >

                            <div className="competition-card-top">

                                <div className="competition-large-icon">
                                    <Trophy size={25} />
                                </div>

                                <span>
                                    {competition.type}
                                </span>

                            </div>


                            <div className="database-competition-content">

                                <h2>
                                    {competition.name}
                                </h2>

                                <p>
                                    {competition.country}
                                </p>


                                <div className="competition-details">

                                    <div>

                                        <strong>
                                            {competition.teams}
                                        </strong>

                                        <span>
                                            Teams
                                        </span>

                                    </div>


                                    <div>

                                        <strong>
                                            {competition.founded}
                                        </strong>

                                        <span>
                                            Founded
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </Link>

                    ))

                )}

            </section>


            <section className="competition-total">

                <div>

                    <span>
                        TOTAL TEAMS ACROSS DATABASE
                    </span>

                    <strong>
                        {totalTeams}
                    </strong>

                </div>

            </section>

        </main>

    );

}


export default Competitions;