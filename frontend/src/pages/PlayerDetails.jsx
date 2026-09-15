import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Trophy,
    Target,
    Users,
    Activity,
} from "lucide-react";

import { getPlayer } from "../services/api";

function PlayerDetails() {
    const { id } = useParams();

    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPlayer = async () => {
            try {
                const response = await getPlayer(id);
                setPlayer(response.data);
            } catch (err) {
                console.error(err);
                setError("Player could not be found.");
            } finally {
                setLoading(false);
            }
        };

        loadPlayer();
    }, [id]);

    if (loading) {
        return (
            <main className="player-details-page">
                <div className="player-details-loading">
                    Loading player...
                </div>
            </main>
        );
    }

    if (error || !player) {
        return (
            <main className="player-details-page">
                <div className="player-details-error">
                    <h2>Player Not Found</h2>
                    <p>{error}</p>

                    <Link to="/players" className="details-back-button">
                        <ArrowLeft size={17} />
                        Back to Players
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="player-details-page">

            <Link to="/players" className="details-back-button">
                <ArrowLeft size={17} />
                Back to Players
            </Link>


            <section className="player-profile">

                <div className="player-profile-image">

                    {player.image ? (
                        <img
                            src={player.image}
                            alt={player.name}
                        />
                    ) : (
                        <div className="player-profile-placeholder">
                            {player.name.charAt(0)}
                        </div>
                    )}

                    <span>
                        #{player.shirt_number}
                    </span>

                </div>


                <div className="player-profile-info">

                    <span className="section-label">
                        PLAYER PROFILE
                    </span>

                    <h1>{player.name}</h1>

                    <p className="player-profile-position">
                        {player.position}
                    </p>

                    <div className="player-profile-meta">

                        <div>
                            <span>Country</span>
                            <strong>{player.country}</strong>
                        </div>

                        <div>
                            <span>Current Club</span>
                            <strong>
                                {player.club_name || "No current club"}
                            </strong>
                        </div>

                    </div>

                </div>

            </section>


            <section className="player-detail-stats">

                <div className="player-detail-stat">
                    <div className="player-detail-stat-icon">
                        <Users size={21} />
                    </div>

                    <span>Appearances</span>

                    <strong>
                        {player.appearances}
                    </strong>
                </div>


                <div className="player-detail-stat">
                    <div className="player-detail-stat-icon">
                        <Target size={21} />
                    </div>

                    <span>Goals</span>

                    <strong>
                        {player.goals}
                    </strong>
                </div>


                <div className="player-detail-stat">
                    <div className="player-detail-stat-icon">
                        <Activity size={21} />
                    </div>

                    <span>Assists</span>

                    <strong>
                        {player.assists}
                    </strong>
                </div>


                <div className="player-detail-stat">
                    <div className="player-detail-stat-icon">
                        <Trophy size={21} />
                    </div>

                    <span>Trophies</span>

                    <strong>
                        {player.trophies}
                    </strong>
                </div>

            </section>


            <section className="player-about">

                <div className="player-about-main">

                    <span className="section-label">
                        PLAYER INFORMATION
                    </span>

                    <h2>Career Overview</h2>

                    <p>
                        {player.name} is a {player.position.toLowerCase()}
                        {" "}from {player.country}.
                        The player has recorded{" "}
                        <strong>{player.goals}</strong> goals and{" "}
                        <strong>{player.assists}</strong> assists across{" "}
                        <strong>{player.appearances}</strong> appearances.
                    </p>

                </div>


                <div className="player-about-side">

                    <div>
                        <span>Position</span>
                        <strong>{player.position}</strong>
                    </div>

                    <div>
                        <span>Shirt Number</span>
                        <strong>#{player.shirt_number}</strong>
                    </div>

                    <div>
                        <span>Trophies</span>
                        <strong>{player.trophies}</strong>
                    </div>

                </div>

            </section>


            <section className="player-detail-links">

                <Link to="/transfers" className="detail-link-card">

                    <div>
                        <span>TRANSFER HISTORY</span>
                        <h3>Explore Transfers</h3>
                    </div>

                    <ArrowRight size={20} />

                </Link>


                <Link to="/compare" className="detail-link-card">

                    <div>
                        <span>PLAYER COMPARISON</span>
                        <h3>Compare Players</h3>
                    </div>

                    <ArrowRight size={20} />

                </Link>


                <Link to="/timeline" className="detail-link-card">

                    <div>
                        <span>FOOTBALL HISTORY</span>
                        <h3>View Timeline</h3>
                    </div>

                    <ArrowRight size={20} />

                </Link>

            </section>

        </main>
    );
}

export default PlayerDetails;