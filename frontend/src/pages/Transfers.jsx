import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RotateCcw,
    ArrowRight,
    TrendingUp,
} from "lucide-react";

import { getTransfers } from "../services/api";


function Transfers() {

    const [transfers, setTransfers] = useState([]);

    const [search, setSearch] = useState("");
    const [season, setSeason] = useState("All");
    const [position, setPosition] = useState("All");
    const [transferType, setTransferType] = useState("All");
    const [sortBy, setSortBy] = useState("player");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadTransfers = async () => {

            try {

                const response = await getTransfers();

                setTransfers(
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

        loadTransfers();

    }, []);


    const seasons = useMemo(() => {

        return [
            "All",
            ...new Set(
                transfers.map(
                    (transfer) => transfer.season
                )
            ),
        ];

    }, [transfers]);


    const positions = useMemo(() => {

        return [
            "All",
            ...new Set(
                transfers.map(
                    (transfer) => transfer.player_position
                )
            ),
        ];

    }, [transfers]);


    const transferTypes = useMemo(() => {

        return [
            "All",
            ...new Set(
                transfers.map(
                    (transfer) => transfer.transfer_type
                )
            ),
        ];

    }, [transfers]);


    const filteredTransfers = useMemo(() => {

        let result = transfers.filter((transfer) => {

            const text = search.toLowerCase();

            const matchesSearch =
                transfer.player_name
                    .toLowerCase()
                    .includes(text) ||
                transfer.from_club
                    .toLowerCase()
                    .includes(text) ||
                transfer.to_club
                    .toLowerCase()
                    .includes(text);

            const matchesSeason =
                season === "All" ||
                transfer.season === season;

            const matchesPosition =
                position === "All" ||
                transfer.player_position === position;

            const matchesType =
                transferType === "All" ||
                transfer.transfer_type === transferType;

            return (
                matchesSearch &&
                matchesSeason &&
                matchesPosition &&
                matchesType
            );

        });


        result.sort((a, b) => {

            if (sortBy === "season") {
                return b.season.localeCompare(a.season);
            }

            if (sortBy === "from") {
                return a.from_club.localeCompare(b.from_club);
            }

            if (sortBy === "to") {
                return a.to_club.localeCompare(b.to_club);
            }

            return a.player_name.localeCompare(
                b.player_name
            );

        });


        return result;

    }, [
        transfers,
        search,
        season,
        position,
        transferType,
        sortBy,
    ]);


    const resetFilters = () => {

        setSearch("");
        setSeason("All");
        setPosition("All");
        setTransferType("All");
        setSortBy("player");

    };


    const transferCount = transfers.length;

    const loanCount = transfers.filter(
        (transfer) =>
            transfer.transfer_type === "Loan"
    ).length;

    const returnCount = transfers.filter(
        (transfer) =>
            transfer.transfer_type === "Return"
    ).length;


    if (loading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading transfers...
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
                    TRANSFERS
                </h1>

                <span>
                    Explore player movements, clubs, seasons and transfer history.
                </span>

            </section>


            <section className="transfer-controls">

                <div className="database-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search player or club..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={season}
                    onChange={(e) =>
                        setSeason(e.target.value)
                    }
                >

                    {seasons.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Seasons"
                                : item}
                        </option>

                    ))}

                </select>


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
                    value={transferType}
                    onChange={(e) =>
                        setTransferType(e.target.value)
                    }
                >

                    {transferTypes.map((item) => (

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
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                >

                    <option value="player">
                        Player
                    </option>

                    <option value="season">
                        Latest Season
                    </option>

                    <option value="from">
                        From Club
                    </option>

                    <option value="to">
                        To Club
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
                        {filteredTransfers.length}
                    </strong>

                    <span>
                        Transfers Found
                    </span>

                </div>


                <div>

                    <strong>
                        {loanCount}
                    </strong>

                    <span>
                        Loans
                    </span>

                </div>


                <div>

                    <strong>
                        {returnCount}
                    </strong>

                    <span>
                        Returns
                    </span>

                </div>

            </section>


            <section className="transfer-database">

                {filteredTransfers.length === 0 ? (

                    <div className="empty-state">

                        <TrendingUp size={32} />

                        <h3>
                            No transfers found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                    </div>

                ) : (

                    filteredTransfers.map((transfer) => (

                        <div
                            className="database-transfer-card"
                            key={transfer.id}
                        >

                            <div className="transfer-player">

                                <div className="transfer-player-icon">
                                    {transfer.player_name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>

                                    <h2>
                                        {transfer.player_name}
                                    </h2>

                                    <span>
                                        {transfer.player_position}
                                    </span>

                                </div>

                            </div>


                            <div className="transfer-route">

                                <div>

                                    <span>
                                        FROM
                                    </span>

                                    <strong>
                                        {transfer.from_club}
                                    </strong>

                                </div>


                                <ArrowRight
                                    size={20}
                                    className="transfer-arrow"
                                />


                                <div>

                                    <span>
                                        TO
                                    </span>

                                    <strong>
                                        {transfer.to_club}
                                    </strong>

                                </div>

                            </div>


                            <div className="transfer-info">

                                <div>

                                    <span>
                                        SEASON
                                    </span>

                                    <strong>
                                        {transfer.season}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        FEE
                                    </span>

                                    <strong>
                                        {transfer.fee}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        TYPE
                                    </span>

                                    <strong>
                                        {transfer.transfer_type}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </section>


            <section className="transfer-total">

                <span>
                    TOTAL TRANSFER RECORDS
                </span>

                <strong>
                    {transferCount}
                </strong>

            </section>

        </main>

    );

}


export default Transfers;