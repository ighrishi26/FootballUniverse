import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Trophy,
    Globe,
    Users,
    Calendar,
} from "lucide-react";

import { getCompetition } from "../services/api";

function CompetitionDetails() {
    const { id } = useParams();

    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCompetition = async () => {
            try {
                const response = await getCompetition(id);
                setCompetition(response.data);
            } catch (err) {
                console.error(err);
                setError("Competition could not be found.");
            } finally {
                setLoading(false);
            }
        };

        loadCompetition();
    }, [id]);

    if (loading) {
        return (
            <main className="competition-details-page">
                <div className="competition-details-loading">
                    Loading competition...
                </div>
            </main>
        );
    }

    if (error || !competition) {
        return (
            <main className="competition-details-page">

                <div className="competition-details-error">

                    <h2>Competition Not Found</h2>

                    <p>{error}</p>

                    <Link
                        to="/competitions"
                        className="details-back-button"
                    >
                        <ArrowLeft size={17} />
                        Back to Competitions
                    </Link>

                </div>

            </main>
        );
    }

    return (
        <main className="competition-details-page">

            <Link
                to="/competitions"
                className="details-back-button"
            >
                <ArrowLeft size={17} />
                Back to Competitions
            </Link>


            <section className="competition-profile">

                <div className="competition-profile-logo">
                    <Trophy size={75} />
                </div>


                <div className="competition-profile-info">

                    <span className="section-label">
                        COMPETITION PROFILE
                    </span>

                    <h1>
                        {competition.name}
                    </h1>

                    <p className="competition-profile-type">
                        {competition.type} Competition
                    </p>


                    <div className="competition-profile-meta">

                        <div>
                            <Globe size={16} />

                            <div>
                                <span>Region</span>

                                <strong>
                                    {competition.country}
                                </strong>
                            </div>
                        </div>


                        <div>
                            <Users size={16} />

                            <div>
                                <span>Teams</span>

                                <strong>
                                    {competition.teams}
                                </strong>
                            </div>
                        </div>


                        <div>
                            <Calendar size={16} />

                            <div>
                                <span>Founded</span>

                                <strong>
                                    {competition.founded}
                                </strong>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            <section className="competition-detail-stats">

                <div className="competition-detail-stat">

                    <Trophy size={22} />

                    <span>
                        Competition Type
                    </span>

                    <strong>
                        {competition.type}
                    </strong>

                </div>


                <div className="competition-detail-stat">

                    <Users size={22} />

                    <span>
                        Teams
                    </span>

                    <strong>
                        {competition.teams}
                    </strong>

                </div>


                <div className="competition-detail-stat">

                    <Globe size={22} />

                    <span>
                        Region
                    </span>

                    <strong>
                        {competition.country}
                    </strong>

                </div>


                <div className="competition-detail-stat">

                    <Calendar size={22} />

                    <span>
                        Founded
                    </span>

                    <strong>
                        {competition.founded}
                    </strong>

                </div>

            </section>


            <section className="competition-about">

                <div>

                    <span className="section-label">
                        COMPETITION INFORMATION
                    </span>

                    <h2>
                        About {competition.name}
                    </h2>

                    <p>
                        {competition.description}
                    </p>

                </div>


                <div className="competition-about-side">

                    <div>
                        <span>Type</span>
                        <strong>{competition.type}</strong>
                    </div>

                    <div>
                        <span>Region</span>
                        <strong>{competition.country}</strong>
                    </div>

                    <div>
                        <span>Teams</span>
                        <strong>{competition.teams}</strong>
                    </div>

                </div>

            </section>


            <section className="competition-detail-links">

                <Link
                    to="/clubs"
                    className="detail-link-card"
                >
                    <div>
                        <span>CLUB DATABASE</span>
                        <h3>Explore Clubs</h3>
                    </div>

                    <ArrowRight size={20} />
                </Link>


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
                    to="/timeline"
                    className="detail-link-card"
                >
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

export default CompetitionDetails;