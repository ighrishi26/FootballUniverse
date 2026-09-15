import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Trophy,
    Calendar,
    MapPin,
    Globe,
} from "lucide-react";

import { getClub } from "../services/api";

function ClubDetails() {
    const { id } = useParams();

    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadClub = async () => {
            try {
                const response = await getClub(id);
                setClub(response.data);
            } catch (err) {
                console.error(err);
                setError("Club could not be found.");
            } finally {
                setLoading(false);
            }
        };

        loadClub();
    }, [id]);

    if (loading) {
        return (
            <main className="club-details-page">
                <div className="club-details-loading">
                    Loading club...
                </div>
            </main>
        );
    }

    if (error || !club) {
        return (
            <main className="club-details-page">

                <div className="club-details-error">

                    <h2>Club Not Found</h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/clubs"
                        className="details-back-button"
                    >
                        <ArrowLeft size={17} />
                        Back to Clubs
                    </Link>

                </div>

            </main>
        );
    }

    const initials = club.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 3);

    return (
        <main className="club-details-page">

            <Link
                to="/clubs"
                className="details-back-button"
            >
                <ArrowLeft size={17} />
                Back to Clubs
            </Link>


            <section className="club-profile">

                <div className="club-profile-logo">
                    {initials}
                </div>


                <div className="club-profile-info">

                    <span className="section-label">
                        CLUB PROFILE
                    </span>

                    <h1>
                        {club.name}
                    </h1>

                    <p className="club-profile-league">
                        {club.league}
                    </p>

                    <div className="club-profile-meta">

                        <div>
                            <Globe size={16} />

                            <div>
                                <span>Country</span>
                                <strong>
                                    {club.country}
                                </strong>
                            </div>
                        </div>


                        <div>
                            <MapPin size={16} />

                            <div>
                                <span>Stadium</span>
                                <strong>
                                    {club.stadium}
                                </strong>
                            </div>
                        </div>


                        <div>
                            <Calendar size={16} />

                            <div>
                                <span>Founded</span>
                                <strong>
                                    {club.founded}
                                </strong>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            <section className="club-detail-stats">

                <div className="club-detail-stat">

                    <Trophy size={22} />

                    <span>
                        Trophies
                    </span>

                    <strong>
                        {club.trophies}
                    </strong>

                </div>


                <div className="club-detail-stat">

                    <Calendar size={22} />

                    <span>
                        Founded
                    </span>

                    <strong>
                        {club.founded}
                    </strong>

                </div>


                <div className="club-detail-stat">

                    <Globe size={22} />

                    <span>
                        Country
                    </span>

                    <strong>
                        {club.country}
                    </strong>

                </div>


                <div className="club-detail-stat">

                    <MapPin size={22} />

                    <span>
                        Stadium
                    </span>

                    <strong>
                        {club.stadium}
                    </strong>

                </div>

            </section>


            <section className="club-about">

                <div>

                    <span className="section-label">
                        CLUB INFORMATION
                    </span>

                    <h2>
                        About {club.name}
                    </h2>

                    <p>
                        {club.description}
                    </p>

                </div>


                <div className="club-about-side">

                    <div>
                        <span>League</span>
                        <strong>{club.league}</strong>
                    </div>

                    <div>
                        <span>Country</span>
                        <strong>{club.country}</strong>
                    </div>

                    <div>
                        <span>Club Colors</span>
                        <strong>{club.colors}</strong>
                    </div>

                </div>

            </section>


            <section className="club-detail-links">

                <Link
                    to="/players"
                    className="detail-link-card"
                >
                    <div>
                        <span>PLAYER DATABASE</span>
                        <h3>Explore Players</h3>
                    </div>

                    <ArrowRight size={20} />
                </Link>


                <Link
                    to="/transfers"
                    className="detail-link-card"
                >
                    <div>
                        <span>TRANSFER DATABASE</span>
                        <h3>Explore Transfers</h3>
                    </div>

                    <ArrowRight size={20} />
                </Link>


                <Link
                    to="/competitions"
                    className="detail-link-card"
                >
                    <div>
                        <span>COMPETITION DATABASE</span>
                        <h3>Explore Competitions</h3>
                    </div>

                    <ArrowRight size={20} />
                </Link>

            </section>

        </main>
    );
}

export default ClubDetails;