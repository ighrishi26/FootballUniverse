import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import {
    createClub,
    updateClub,
    getClub,
} from "../services/api";


function ClubForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);


    const [form, setForm] = useState({
        name: "",
        country: "",
        league: "",
        stadium: "",
        founded: "",
        trophies: 0,
        description: "",
        colors: "",
    });

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(isEditMode);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadClub = async () => {

            if (!isEditMode) {
                return;
            }

            try {

                const response = await getClub(id);

                const club = response.data;

                setForm({
                    name: club.name || "",
                    country: club.country || "",
                    league: club.league || "",
                    stadium: club.stadium || "",
                    founded: club.founded || "",
                    trophies: club.trophies || 0,
                    description: club.description || "",
                    colors: club.colors || "",
                });

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load club information."
                );

            } finally {

                setPageLoading(false);

            }

        };

        loadClub();

    }, [id, isEditMode]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!form.name.trim()) {

            setError("Club name is required.");
            return;

        }


        if (!form.country.trim()) {

            setError("Country is required.");
            return;

        }


        if (!form.league.trim()) {

            setError("League is required.");
            return;

        }


        if (!form.stadium.trim()) {

            setError("Stadium is required.");
            return;

        }


        try {

            setLoading(true);


            const data = {
                name: form.name.trim(),
                country: form.country.trim(),
                league: form.league.trim(),
                stadium: form.stadium.trim(),
                founded: Number(form.founded),
                trophies: Number(form.trophies),
                description: form.description.trim(),
                colors: form.colors.trim(),
            };


            if (isEditMode) {

                await updateClub(id, data);

            } else {

                await createClub(data);

            }


            navigate("/clubs");

        } catch (err) {

            console.error(err);

            if (err.response?.data) {

                const backendErrors =
                    err.response.data;

                const messages =
                    Object.values(backendErrors)
                        .flat()
                        .join(" ");

                setError(
                    messages ||
                    "Unable to save club."
                );

            } else {

                setError(
                    "Unable to connect to the Football Universe server."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    if (pageLoading) {

        return (
            <main className="page-container">

                <div className="loading-state">
                    Loading club...
                </div>

            </main>
        );

    }


    return (

        <main className="player-form-page">

            <section className="player-form-header">

                <button
                    className="back-button"
                    onClick={() => navigate("/clubs")}
                >
                    <ArrowLeft size={17} />
                    Back to Clubs
                </button>


                <p>
                    CLUB DATABASE
                </p>


                <h1>
                    {isEditMode
                        ? "EDIT CLUB"
                        : "ADD CLUB"}
                </h1>


                <span>
                    {isEditMode
                        ? "Update club information."
                        : "Add a new club to the Football Universe database."}
                </span>

            </section>


            <form
                className="player-form"
                onSubmit={handleSubmit}
            >

                {error && (

                    <div className="form-error">
                        {error}
                    </div>

                )}


                <div className="form-section">

                    <h2>
                        Club Information
                    </h2>


                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Club Name
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Arsenal"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Country
                            </label>

                            <input
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="e.g. England"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                League
                            </label>

                            <input
                                name="league"
                                value={form.league}
                                onChange={handleChange}
                                placeholder="e.g. Premier League"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Stadium
                            </label>

                            <input
                                name="stadium"
                                value={form.stadium}
                                onChange={handleChange}
                                placeholder="e.g. Emirates Stadium"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Founded
                            </label>

                            <input
                                type="number"
                                name="founded"
                                min="1800"
                                value={form.founded}
                                onChange={handleChange}
                                placeholder="e.g. 1886"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Trophies
                            </label>

                            <input
                                type="number"
                                name="trophies"
                                min="0"
                                value={form.trophies}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Club Colors
                            </label>

                            <input
                                name="colors"
                                value={form.colors}
                                onChange={handleChange}
                                placeholder="e.g. Red, White"
                            />

                        </div>

                    </div>

                </div>


                <div className="form-section">

                    <h2>
                        Description
                    </h2>


                    <div className="form-field">

                        <label>
                            About the Club
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write a short description about the club..."
                            rows="6"
                        />

                    </div>

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="form-cancel"
                        onClick={() =>
                            navigate("/clubs")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="form-save"
                        disabled={loading}
                    >

                        <Save size={16} />

                        {loading
                            ? "Saving..."
                            : isEditMode
                                ? "Update Club"
                                : "Add Club"}

                    </button>

                </div>

            </form>

        </main>

    );

}


export default ClubForm;