import { useEffect, useMemo, useState } from "react";
import {
    Search,
    ArrowLeftRight,
    RotateCcw,
    Trophy,
    Target,
    Footprints,
    Activity,
} from "lucide-react";

import { getPlayers } from "../services/api";


function Compare() {

    const [players, setPlayers] = useState([]);

    const [playerOne, setPlayerOne] = useState("");
    const [playerTwo, setPlayerTwo] = useState("");

    const [searchOne, setSearchOne] = useState("");
    const [searchTwo, setSearchTwo] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadPlayers = async () => {

            try {

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

        loadPlayers();

    }, []);


    const selectedOne = players.find(
        (player) =>
            String(player.id) === String(playerOne)
    );

    const selectedTwo = players.find(
        (player) =>
            String(player.id) === String(playerTwo)
    );


    const filteredOne = useMemo(() => {

        return players.filter((player) =>
            player.name
                .toLowerCase()
                .includes(searchOne.toLowerCase())
        );

    }, [players, searchOne]);


    const filteredTwo = useMemo(() => {

        return players.filter((player) =>
            player.name
                .toLowerCase()
                .includes(searchTwo.toLowerCase())
        );

    }, [players, searchTwo]);


    const swapPlayers = () => {

        const oldOne = playerOne;

        setPlayerOne(playerTwo);
        setPlayerTwo(oldOne);

    };


    const resetComparison = () => {

        setPlayerOne("");
        setPlayerTwo("");
        setSearchOne("");
        setSearchTwo("");

    };


    const stats = [

        {
            key: "appearances",
            label: "Appearances",
            icon: Activity,
        },

        {
            key: "goals",
            label: "Goals",
            icon: Target,
        },

        {
            key: "assists",
            label: "Assists",
            icon: Footprints,
        },

        {
            key: "trophies",
            label: "Trophies",
            icon: Trophy,
        },

    ];


    const getWinner = (key) => {

        if (!selectedOne || !selectedTwo) {
            return null;
        }

        if (
            selectedOne[key] === selectedTwo[key]
        ) {
            return "draw";
        }

        return selectedOne[key] > selectedTwo[key]
            ? "one"
            : "two";

    };


    const scoreOne = selectedOne
        ? stats.reduce(
            (score, stat) =>
                score +
                (getWinner(stat.key) === "one"
                    ? 1
                    : 0),
            0
        )
        : 0;


    const scoreTwo = selectedTwo
        ? stats.reduce(
            (score, stat) =>
                score +
                (getWinner(stat.key) === "two"
                    ? 1
                    : 0),
            0
        )
        : 0;


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

        <main className="compare-page">

            <section className="database-header">

                <p>
                    FOOTBALL ANALYTICS
                </p>

                <h1>
                    PLAYER COMPARISON
                </h1>

                <span>
                    Compare two players using their career statistics.
                </span>

            </section>


            <section className="compare-selection">

                <div className="compare-player-selector">

                    <span className="compare-label">
                        PLAYER 01
                    </span>

                    <div className="compare-search">

                        <Search size={17} />

                        <input
                            type="text"
                            placeholder="Search player..."
                            value={searchOne}
                            onChange={(e) => {
                                setSearchOne(e.target.value);
                                setPlayerOne("");
                            }}
                        />

                    </div>


                    {searchOne && !selectedOne && (

                        <div className="compare-search-results">

                            {filteredOne.slice(0, 6).map(
                                (player) => (

                                    <button
                                        key={player.id}
                                        onClick={() => {
                                            setPlayerOne(
                                                String(player.id)
                                            );
                                            setSearchOne(
                                                player.name
                                            );
                                        }}
                                    >
                                        {player.name}
                                    </button>

                                )
                            )}

                        </div>

                    )}


                    {selectedOne && (

                        <div className="selected-player">

                            <div className="selected-player-icon">
                                {selectedOne.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <h2>
                                    {selectedOne.name}
                                </h2>

                                <span>
                                    {selectedOne.position}
                                    {" • "}
                                    {selectedOne.club_name ||
                                        "No Club"}
                                </span>

                            </div>

                        </div>

                    )}

                </div>


                <button
                    className="compare-swap-btn"
                    onClick={swapPlayers}
                    title="Swap players"
                >
                    <ArrowLeftRight size={18} />
                </button>


                <div className="compare-player-selector">

                    <span className="compare-label">
                        PLAYER 02
                    </span>

                    <div className="compare-search">

                        <Search size={17} />

                        <input
                            type="text"
                            placeholder="Search player..."
                            value={searchTwo}
                            onChange={(e) => {
                                setSearchTwo(e.target.value);
                                setPlayerTwo("");
                            }}
                        />

                    </div>


                    {searchTwo && !selectedTwo && (

                        <div className="compare-search-results">

                            {filteredTwo.slice(0, 6).map(
                                (player) => (

                                    <button
                                        key={player.id}
                                        onClick={() => {
                                            setPlayerTwo(
                                                String(player.id)
                                            );
                                            setSearchTwo(
                                                player.name
                                            );
                                        }}
                                    >
                                        {player.name}
                                    </button>

                                )
                            )}

                        </div>

                    )}


                    {selectedTwo && (

                        <div className="selected-player">

                            <div className="selected-player-icon">
                                {selectedTwo.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <h2>
                                    {selectedTwo.name}
                                </h2>

                                <span>
                                    {selectedTwo.position}
                                    {" • "}
                                    {selectedTwo.club_name ||
                                        "No Club"}
                                </span>

                            </div>

                        </div>

                    )}

                </div>


                <button
                    className="compare-reset-btn"
                    onClick={resetComparison}
                >

                    <RotateCcw size={15} />

                    Reset

                </button>

            </section>


            {!selectedOne || !selectedTwo ? (

                <section className="compare-empty">

                    <ArrowLeftRight size={38} />

                    <h2>
                        Select two players
                    </h2>

                    <p>
                        Choose two players above to start the comparison.
                    </p>

                </section>

            ) : (

                <>

                    <section className="comparison-score">

                        <div>

                            <span>
                                {selectedOne.name}
                            </span>

                            <strong>
                                {scoreOne}
                            </strong>

                        </div>


                        <div className="score-divider">
                            -
                        </div>


                        <div>

                            <span>
                                {selectedTwo.name}
                            </span>

                            <strong>
                                {scoreTwo}
                            </strong>

                        </div>

                    </section>


                    <section className="comparison-table">

                        <div className="comparison-heading">

                            <div>
                                {selectedOne.name}
                            </div>

                            <span>
                                STAT
                            </span>

                            <div>
                                {selectedTwo.name}
                            </div>

                        </div>


                        {stats.map((stat) => {

                            const Icon = stat.icon;
                            const winner = getWinner(stat.key);

                            return (

                                <div
                                    className="comparison-row"
                                    key={stat.key}
                                >

                                    <div
                                        className={
                                            winner === "one"
                                                ? "comparison-value winner"
                                                : "comparison-value"
                                        }
                                    >
                                        {selectedOne[stat.key]}
                                    </div>


                                    <div className="comparison-stat">

                                        <Icon size={16} />

                                        <span>
                                            {stat.label}
                                        </span>

                                    </div>


                                    <div
                                        className={
                                            winner === "two"
                                                ? "comparison-value winner"
                                                : "comparison-value"
                                        }
                                    >
                                        {selectedTwo[stat.key]}
                                    </div>

                                </div>

                            );

                        })}

                    </section>


                    <section className="comparison-verdict">

                        <span>
                            COMPARISON RESULT
                        </span>

                        <h2>

                            {scoreOne > scoreTwo
                                ? `${selectedOne.name} leads the comparison`
                                : scoreTwo > scoreOne
                                    ? `${selectedTwo.name} leads the comparison`
                                    : "The comparison is tied"}

                        </h2>

                        <p>

                            {scoreOne > scoreTwo
                                ? `${selectedOne.name} wins ${scoreOne} of the ${stats.length} statistical categories.`
                                : scoreTwo > scoreOne
                                    ? `${selectedTwo.name} wins ${scoreTwo} of the ${stats.length} statistical categories.`
                                    : "Both players have the same number of category wins."}

                        </p>

                    </section>

                </>

            )}

        </main>

    );

}


export default Compare;