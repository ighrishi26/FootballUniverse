import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RotateCcw,
    Clock3,
} from "lucide-react";

import { getTimelineEvents } from "../services/api";


function TimelinePage() {

    const [events, setEvents] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("oldest");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadEvents = async () => {

            try {

                const response = await getTimelineEvents();

                setEvents(
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

        loadEvents();

    }, []);


    const categories = useMemo(() => {

        return [
            "All",
            ...new Set(
                events.map(
                    (event) => event.category
                )
            ),
        ];

    }, [events]);


    const filteredEvents = useMemo(() => {

        let result = events.filter((event) => {

            const text = search.toLowerCase();

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(text) ||
                event.description
                    .toLowerCase()
                    .includes(text) ||
                String(event.year)
                    .includes(text);

            const matchesCategory =
                category === "All" ||
                event.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );

        });


        result.sort((a, b) => {

            if (sortBy === "newest") {
                return b.year - a.year;
            }

            return a.year - b.year;

        });


        return result;

    }, [
        events,
        search,
        category,
        sortBy,
    ]);


    const resetFilters = () => {

        setSearch("");
        setCategory("All");
        setSortBy("oldest");

    };


    const oldestYear = events.length
        ? Math.min(
            ...events.map(
                (event) => event.year
            )
        )
        : "-";


    const newestYear = events.length
        ? Math.max(
            ...events.map(
                (event) => event.year
            )
        )
        : "-";


    const categoryCount = new Set(
        events.map(
            (event) => event.category
        )
    ).size;


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading football timeline...
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

        <main className="timeline-database">

            <section className="database-header">

                <p>
                    FOOTBALL HISTORY
                </p>

                <h1>
                    TIMELINE
                </h1>

                <span>
                    Explore important moments from football history.
                </span>

            </section>


            <section className="timeline-controls">

                <div className="database-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search events or years..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    {categories.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Categories"
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

                    <option value="oldest">
                        Oldest First
                    </option>

                    <option value="newest">
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

            </section>


            <section className="database-summary">

                <div>

                    <strong>
                        {filteredEvents.length}
                    </strong>

                    <span>
                        Events Found
                    </span>

                </div>


                <div>

                    <strong>
                        {oldestYear}
                    </strong>

                    <span>
                        Earliest Event
                    </span>

                </div>


                <div>

                    <strong>
                        {newestYear}
                    </strong>

                    <span>
                        Latest Event
                    </span>

                </div>


                <div>

                    <strong>
                        {categoryCount}
                    </strong>

                    <span>
                        Categories
                    </span>

                </div>

            </section>


            <section className="football-timeline">

                {filteredEvents.length === 0 ? (

                    <div className="empty-state">

                        <Clock3 size={32} />

                        <h3>
                            No events found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                    </div>

                ) : (

                    filteredEvents.map((event) => (

                        <article
                            className="timeline-event-card"
                            key={event.id}
                        >

                            <div className="timeline-year">
                                {event.year}
                            </div>


                            <div className="timeline-marker">
                                <span></span>
                            </div>


                            <div className="timeline-event-content">

                                <div className="timeline-event-top">

                                    <span>
                                        {event.category}
                                    </span>

                                    <small>
                                        {event.year}
                                    </small>

                                </div>


                                <h2>
                                    {event.title}
                                </h2>


                                <p>
                                    {event.description}
                                </p>

                            </div>

                        </article>

                    ))

                )}

            </section>

        </main>

    );

}


export default TimelinePage;