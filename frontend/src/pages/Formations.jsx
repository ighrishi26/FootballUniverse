import { useEffect, useState } from "react";
import {
    RotateCcw,
    Users,
    Shield,
    Target,
    X,
} from "lucide-react";

import { getPlayers } from "../services/api";


const formationPositions = [
    {
        position: "GK",
        label: "Goalkeeper",
        allowedPositions: ["GK"],
        top: "88%",
        left: "50%",
    },

    {
        position: "LB",
        label: "Left Back",
        allowedPositions: ["LB", "LWB"],
        top: "68%",
        left: "15%",
    },

    {
        position: "CB",
        label: "Center Back",
        allowedPositions: ["CB"],
        top: "72%",
        left: "38%",
    },

    {
        position: "CB",
        label: "Center Back",
        allowedPositions: ["CB"],
        top: "72%",
        left: "62%",
    },

    {
        position: "RB",
        label: "Right Back",
        allowedPositions: ["RB", "RWB"],
        top: "68%",
        left: "85%",
    },

    {
        position: "CM",
        label: "Central Midfield",
        allowedPositions: ["CDM", "CM", "CAM"],
        top: "50%",
        left: "28%",
    },

    {
        position: "CM",
        label: "Central Midfield",
        allowedPositions: ["CDM", "CM", "CAM"],
        top: "46%",
        left: "50%",
    },

    {
        position: "CM",
        label: "Central Midfield",
        allowedPositions: ["CDM", "CM", "CAM"],
        top: "50%",
        left: "72%",
    },

    {
        position: "LW",
        label: "Left Wing",
        allowedPositions: ["LW", "LM"],
        top: "25%",
        left: "18%",
    },

    {
        position: "ST",
        label: "Striker",
        allowedPositions: ["ST", "CF"],
        top: "18%",
        left: "50%",
    },

    {
        position: "RW",
        label: "Right Wing",
        allowedPositions: ["RW", "RM"],
        top: "25%",
        left: "82%",
    },
];


function Formations() {

    const [players, setPlayers] = useState([]);

    const [selectedPlayers, setSelectedPlayers] = useState({});

    const [activeSlot, setActiveSlot] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadPlayers = async () => {

            try {

                const response = await getPlayers();

                setPlayers(
                    response.data.results || response.data
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


    const getPlayersForSlot = (slot) => {

        return players.filter((player) =>
            slot.allowedPositions.includes(player.position)
        );

    };


    const selectPlayer = (player) => {

        if (activeSlot === null) {
            return;
        }

        const alreadyUsed = Object.entries(
            selectedPlayers
        ).some(
            ([slotIndex, selectedPlayer]) =>
                String(slotIndex) !== String(activeSlot) &&
                selectedPlayer.id === player.id
        );

        if (alreadyUsed) {
            return;
        }

        setSelectedPlayers((previous) => ({
            ...previous,
            [activeSlot]: player,
        }));

        setActiveSlot(null);

    };


    const removePlayer = (slotIndex) => {

        setSelectedPlayers((previous) => {

            const updated = {
                ...previous,
            };

            delete updated[slotIndex];

            return updated;

        });

    };


    const resetFormation = () => {

        setSelectedPlayers({});

        setActiveSlot(null);

    };


    const selectedCount =
        Object.keys(selectedPlayers).length;


    if (loading) {

        return (
            <main className="formations-page">

                <div className="formations-loading">
                    Loading players...
                </div>

            </main>
        );

    }


    if (error) {

        return (
            <main className="formations-page">

                <div className="formations-error">
                    {error}
                </div>

            </main>
        );

    }


    return (
        <main className="formations-page">


            <section className="formations-hero">

                <div>

                    <span className="section-label">
                        SQUAD BUILDER
                    </span>

                    <h1>
                        Formations
                    </h1>

                    <p>
                        Build your own starting XI by choosing
                        a player for every position.
                    </p>

                </div>

            </section>


            <section className="formations-controls">

                <div className="formation-select">

                    <span>
                        FORMATION
                    </span>

                    <select defaultValue="4-3-3">

                        <option value="4-3-3">
                            4-3-3
                        </option>

                    </select>

                </div>


                <div className="formation-count">

                    <Users size={18} />

                    <strong>
                        {selectedCount}/11
                    </strong>

                    <span>
                        Players Selected
                    </span>

                </div>


                <button
                    className="formation-reset"
                    onClick={resetFormation}
                >

                    <RotateCcw size={16} />

                    Clear XI

                </button>

            </section>


            <section className="formation-workspace">


                <div className="football-pitch">

                    <div className="pitch-center-circle"></div>

                    <div className="pitch-center-line"></div>

                    <div className="pitch-box pitch-box-top"></div>

                    <div className="pitch-box pitch-box-bottom"></div>


                    {formationPositions.map(
                        (slot, index) => {

                            const player =
                                selectedPlayers[index];


                            return (

                                <button
                                    className={
                                        player
                                            ? "formation-player filled"
                                            : "formation-player empty"
                                    }
                                    key={`${slot.position}-${index}`}
                                    style={{
                                        top: slot.top,
                                        left: slot.left,
                                    }}
                                    onClick={() =>
                                        setActiveSlot(index)
                                    }
                                >

                                    <div className="formation-player-avatar">

                                        {player?.image ? (

                                            <img
                                                src={player.image}
                                                alt={player.name}
                                            />

                                        ) : (

                                            <span>
                                                +
                                            </span>

                                        )}

                                    </div>


                                    <div className="formation-player-info">

                                        <strong>
                                            {player
                                                ? player.name
                                                : "Choose Player"}
                                        </strong>

                                        <span>
                                            {slot.position}
                                        </span>

                                    </div>

                                </button>

                            );

                        }
                    )}

                </div>


                <aside className="formation-player-panel">


                    {activeSlot === null ? (

                        <div className="formation-panel-empty">

                            <Users size={28} />

                            <h2>
                                Choose a Position
                            </h2>

                            <p>
                                Click any position on the pitch
                                to select a player.
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="formation-panel-header">

                                <span className="section-label">
                                    POSITION
                                </span>

                                <h2>
                                    {formationPositions[
                                        activeSlot
                                    ].position}
                                </h2>

                                <p>
                                    Select a suitable player
                                    for this position.
                                </p>

                            </div>


                            <div className="formation-player-list">

                                {getPlayersForSlot(
                                    formationPositions[
                                        activeSlot
                                    ]
                                ).map((player) => {

                                    const usedElsewhere =
                                        Object.entries(
                                            selectedPlayers
                                        ).some(
                                            ([slotIndex, selectedPlayer]) =>
                                                String(slotIndex) !==
                                                String(activeSlot) &&
                                                selectedPlayer.id ===
                                                player.id
                                        );


                                    return (

                                        <button
                                            className={
                                                usedElsewhere
                                                    ? "formation-player-option disabled"
                                                    : "formation-player-option"
                                            }
                                            key={player.id}
                                            disabled={usedElsewhere}
                                            onClick={() =>
                                                selectPlayer(player)
                                            }
                                        >

                                            <div className="formation-option-avatar">

                                                {player.image ? (

                                                    <img
                                                        src={player.image}
                                                        alt={player.name}
                                                    />

                                                ) : (

                                                    player.name.charAt(0)

                                                )}

                                            </div>


                                            <div>

                                                <strong>
                                                    {player.name}
                                                </strong>

                                                <span>
                                                    {player.position}
                                                    {player.club_name
                                                        ? ` · ${player.club_name}`
                                                        : ""}
                                                </span>

                                            </div>

                                        </button>

                                    );

                                })}

                                {getPlayersForSlot(
                                    formationPositions[
                                        activeSlot
                                    ]
                                ).length === 0 && (

                                    <div className="formation-panel-empty">

                                        <p>
                                            No suitable players
                                            available for this
                                            position.
                                        </p>

                                    </div>

                                )}

                            </div>


                            <button
                                className="formation-close-selection"
                                onClick={() =>
                                    setActiveSlot(null)
                                }
                            >
                                Close
                            </button>

                        </>

                    )}


                    <div className="formation-selected">

                        <div className="formation-selected-header">

                            <span className="section-label">
                                STARTING XI
                            </span>

                            <strong>
                                {selectedCount}/11
                            </strong>

                        </div>


                        {formationPositions.map(
                            (slot, index) => {

                                const player =
                                    selectedPlayers[index];


                                return (

                                    <div
                                        className={
                                            player
                                                ? "formation-selected-player"
                                                : "formation-selected-player empty"
                                        }
                                        key={index}
                                    >

                                        <span>
                                            {slot.position}
                                        </span>


                                        <div>

                                            <strong>
                                                {player
                                                    ? player.name
                                                    : "Empty"}
                                            </strong>

                                            <small>
                                                {player
                                                    ? player.position
                                                    : slot.label}
                                            </small>

                                        </div>


                                        {player && (

                                            <button
                                                onClick={() =>
                                                    removePlayer(index)
                                                }
                                                title="Remove player"
                                            >
                                                <X size={14} />
                                            </button>

                                        )}

                                    </div>

                                );

                            }
                        )}

                    </div>

                </aside>

            </section>


            <section className="formation-info">

                <div>

                    <Shield size={20} />

                    <strong>
                        Defence
                    </strong>

                    <span>
                        Select suitable defenders for your back four.
                    </span>

                </div>


                <div>

                    <Users size={20} />

                    <strong>
                        Midfield
                    </strong>

                    <span>
                        Choose midfielders to control the game.
                    </span>

                </div>


                <div>

                    <Target size={20} />

                    <strong>
                        Attack
                    </strong>

                    <span>
                        Select suitable forwards for your attacking line.
                    </span>

                </div>

            </section>


        </main>
    );
}


export default Formations;