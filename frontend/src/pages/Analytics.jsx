import { useEffect, useState } from "react";

import {
    Trophy,
    Target,
    Users,
    Award,
    TrendingUp,
    RefreshCw
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from "recharts";

import {
    getPlayers,
    getClubs,
    getCompetitions,
    getTransfers
} from "../services/api";


function Analytics() {

    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [transfers, setTransfers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadAnalytics = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    playersResponse,
                    clubsResponse,
                    competitionsResponse,
                    transfersResponse
                ] = await Promise.all([
                    getPlayers(),
                    getClubs(),
                    getCompetitions(),
                    getTransfers()
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
                    "Unable to load analytics data."
                );

            } finally {

                setLoading(false);

            }

        };

        loadAnalytics();

    }, []);


    const topScorers = [...players]
        .sort((a, b) => b.goals - a.goals)
        .slice(0, 6)
        .map((player) => ({
            name: player.name.split(" ")[0],
            goals: player.goals
        }));


    const playerAssists = [...players]
        .sort((a, b) => b.assists - a.assists)
        .slice(0, 6)
        .map((player) => ({
            name: player.name.split(" ")[0],
            assists: player.assists
        }));


    const clubTrophies = [...clubs]
        .sort((a, b) => b.trophies - a.trophies)
        .slice(0, 10)
        .map((club) => ({
            name: club.name
                .replace("FC ", "")
                .replace("Manchester ", "Man ")
                .replace("Bayern ", "Bayern"),
            trophies: club.trophies
        }));


    const competitionTypes = [
        {
            name: "Club",
            value: competitions.filter(
                (competition) =>
                    competition.type === "Club"
            ).length
        },
        {
            name: "National",
            value: competitions.filter(
                (competition) =>
                    competition.type === "National"
            ).length
        }
    ];


    const positionData = [
        "GK",
        "LB",
        "CB",
        "RB",
        "LWB",
        "RWB",
        "CDM",
        "CM",
        "CAM",
        "LM",
        "RM",
        "LW",
        "RW",
        "ST",
        "CF"
    ]
        .map((position) => ({
            name: position,
            players: players.filter(
                (player) =>
                    player.position === position
            ).length
        }))
        .filter((item) => item.players > 0);


    const totalGoals = players.reduce(
        (total, player) =>
            total + Number(player.goals || 0),
        0
    );


    const totalAssists = players.reduce(
        (total, player) =>
            total + Number(player.assists || 0),
        0
    );


    const totalTrophies = players.reduce(
        (total, player) =>
            total + Number(player.trophies || 0),
        0
    );


    if (loading) {

        return (
            <main className="analytics-page">

                <section className="page-header">

                    <div>

                        <p className="section-label">
                            FOOTBALL UNIVERSE
                        </p>

                        <h1>
                            Analytics
                        </h1>

                        <p className="page-description">
                            Analyze player performance, club
                            success and football statistics.
                        </p>

                    </div>

                </section>


                <div className="explore-no-results">

                    <RefreshCw size={32} />

                    <h2>
                        Loading Analytics
                    </h2>

                    <p>
                        Fetching data from Football Universe...
                    </p>

                </div>

            </main>
        );

    }


    if (error) {

        return (
            <main className="analytics-page">

                <section className="page-header">

                    <div>

                        <p className="section-label">
                            FOOTBALL UNIVERSE
                        </p>

                        <h1>
                            Analytics
                        </h1>

                    </div>

                </section>


                <div className="explore-no-results">

                    <Target size={38} />

                    <h2>
                        Analytics unavailable
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </main>
        );

    }


    return (
        <main className="analytics-page">


            <section className="page-header">

                <div>

                    <p className="section-label">
                        FOOTBALL UNIVERSE
                    </p>

                    <h1>
                        Analytics
                    </h1>

                    <p className="page-description">
                        Analyze player performance, club success
                        and football competition statistics.
                    </p>

                </div>

            </section>


            <section className="analytics-summary">


                <div className="analytics-stat">

                    <Target size={22} />

                    <div>

                        <span>
                            TOTAL GOALS
                        </span>

                        <strong>
                            {totalGoals}
                        </strong>

                    </div>

                </div>


                <div className="analytics-stat">

                    <Award size={22} />

                    <div>

                        <span>
                            TOTAL ASSISTS
                        </span>

                        <strong>
                            {totalAssists}
                        </strong>

                    </div>

                </div>


                <div className="analytics-stat">

                    <Trophy size={22} />

                    <div>

                        <span>
                            TOTAL TROPHIES
                        </span>

                        <strong>
                            {totalTrophies}
                        </strong>

                    </div>

                </div>


                <div className="analytics-stat">

                    <Users size={22} />

                    <div>

                        <span>
                            PLAYERS
                        </span>

                        <strong>
                            {players.length}
                        </strong>

                    </div>

                </div>


            </section>


            <section className="analytics-grid">


                <div className="analytics-card">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                PERFORMANCE
                            </p>

                            <h2>
                                Top Scorers
                            </h2>

                        </div>

                        <Target size={20} />

                    </div>


                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart data={topScorers}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#222"
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <YAxis
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "6px"
                                    }}
                                />

                                <Bar
                                    dataKey="goals"
                                    fill="#e63946"
                                    radius={[
                                        4,
                                        4,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                CREATIVITY
                            </p>

                            <h2>
                                Top Assists
                            </h2>

                        </div>

                        <Award size={20} />

                    </div>


                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart data={playerAssists}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#222"
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <YAxis
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "6px"
                                    }}
                                />

                                <Bar
                                    dataKey="assists"
                                    fill="#777"
                                    radius={[
                                        4,
                                        4,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                <div className="analytics-card analytics-card-wide">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                CLUB SUCCESS
                            </p>

                            <h2>
                                Club Trophies
                            </h2>

                        </div>

                        <Trophy size={20} />

                    </div>


                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart data={clubTrophies}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#222"
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <YAxis
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "6px"
                                    }}
                                />

                                <Bar
                                    dataKey="trophies"
                                    fill="#e63946"
                                    radius={[
                                        4,
                                        4,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                COMPETITIONS
                            </p>

                            <h2>
                                Competition Types
                            </h2>

                        </div>

                        <Trophy size={20} />

                    </div>


                    <div className="analytics-pie">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={competitionTypes}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    innerRadius={55}
                                >

                                    <Cell fill="#e63946" />

                                    <Cell fill="#555" />

                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "6px"
                                    }}
                                />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>


                    <div className="pie-legend">

                        {competitionTypes.map(
                            (item, index) => (

                                <div key={item.name}>

                                    <span
                                        className={
                                            index === 0
                                                ? "legend-dot main"
                                                : "legend-dot"
                                        }
                                    ></span>

                                    <span>
                                        {item.name}
                                    </span>

                                    <strong>
                                        {item.value}
                                    </strong>

                                </div>

                            )
                        )}

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                SQUAD
                            </p>

                            <h2>
                                Players by Position
                            </h2>

                        </div>

                        <Users size={20} />

                    </div>


                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart data={positionData}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#222"
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    tick={{
                                        fontSize: 9
                                    }}
                                />

                                <YAxis
                                    stroke="#666"
                                    allowDecimals={false}
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "6px"
                                    }}
                                />

                                <Bar
                                    dataKey="players"
                                    fill="#777"
                                    radius={[
                                        4,
                                        4,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                TRANSFERS
                            </p>

                            <h2>
                                Transfer Activity
                            </h2>

                        </div>

                        <TrendingUp size={20} />

                    </div>


                    <div className="analytics-transfer-stat">

                        <strong>
                            {transfers.length}
                        </strong>

                        <span>
                            Recorded Transfers
                        </span>

                    </div>


                    <div className="analytics-transfer-breakdown">

                        <div>

                            <span>
                                Transfer
                            </span>

                            <strong>
                                {
                                    transfers.filter(
                                        (transfer) =>
                                            transfer.transfer_type ===
                                            "Transfer"
                                    ).length
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Loan
                            </span>

                            <strong>
                                {
                                    transfers.filter(
                                        (transfer) =>
                                            transfer.transfer_type ===
                                            "Loan"
                                    ).length
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Return
                            </span>

                            <strong>
                                {
                                    transfers.filter(
                                        (transfer) =>
                                            transfer.transfer_type ===
                                            "Return"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="analytics-card analytics-card-wide">

                    <div className="analytics-card-heading">

                        <div>

                            <p className="section-label">
                                TREND
                            </p>

                            <h2>
                                Historical Goal Trend
                            </h2>

                        </div>

                        <TrendingUp size={20} />

                    </div>


                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={[
                                    {
                                        year: "2009",
                                        goals: 55
                                    },
                                    {
                                        year: "2012",
                                        goals: 91
                                    },
                                    {
                                        year: "2015",
                                        goals: 60
                                    },
                                    {
                                        year: "2018",
                                        goals: 51
                                    },
                                    {
                                        year: "2020",
                                        goals: 44
                                    },
                                    {
                                        year: "2022",
                                        goals: 50
                                    },
                                    {
                                        year: "2024",
                                        goals: 48
                                    }
                                ]}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#222"
                                />

                                <XAxis
                                    dataKey="year"
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <YAxis
                                    stroke="#666"
                                    tick={{
                                        fontSize: 10
                                    }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "6px"
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="goals"
                                    stroke="#e63946"
                                    strokeWidth={2}
                                    dot={{
                                        r: 4
                                    }}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>


            </section>

        </main>
    );
}


export default Analytics;   