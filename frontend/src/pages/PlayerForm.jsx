import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import {
    createPlayer,
    updatePlayer,
    getPlayer,
    getClubs,
} from "../services/api";


function PlayerForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);


    const [clubs, setClubs] = useState([]);

    const [form, setForm] = useState({
        name: "",
        country: "",
        position: "GK",
        shirt_number: 0,
        club: "",
        appearances: 0,
        goals: 0,
        assists: 0,
        trophies: 0,
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(isEditMode);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadData = async () => {

            try {

                const clubsResponse = await getClubs();

                setClubs(
                    clubsResponse.data.results ||
                    clubsResponse.data
                );


                if (isEditMode) {

                    const playerResponse =
                        await getPlayer(id);

                    const player =
                        playerResponse.data;

                    setForm({
                        name: player.name || "",
                        country: player.country || "",
                        position: player.position || "GK",
                        shirt_number: player.shirt_number || 0,
                        club: player.club || "",
                        appearances: player.appearances || 0,
                        goals: player.goals || 0,
                        assists: player.assists || 0,
                        trophies: player.trophies || 0,
                        image: player.image || "",
                    });

                }

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load player information."
                );

            } finally {

                setPageLoading(false);

            }

        };

        loadData();

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

            setError("Player name is required.");
            return;

        }


        if (!form.country.trim()) {

            setError("Country is required.");
            return;

        }


        try {

            setLoading(true);


            const data = {
                ...form,

                shirt_number:
                    Number(form.shirt_number),

                club:
                    form.club
                        ? Number(form.club)
                        : null,

                appearances:
                    Number(form.appearances),

                goals:
                    Number(form.goals),

                assists:
                    Number(form.assists),

                trophies:
                    Number(form.trophies),
            };


            if (isEditMode) {

                await updatePlayer(id, data);

            } else {

                await createPlayer(data);

            }


            navigate("/players");

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
                    "Unable to save player."
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
                    Loading player...
                </div>

            </main>
        );

    }


    return (

        <main className="player-form-page">

            <section className="player-form-header">

                <button
                    className="back-button"
                    onClick={() => navigate("/players")}
                >
                    <ArrowLeft size={17} />
                    Back to Players
                </button>

                <p>
                    PLAYER DATABASE
                </p>

                <h1>
                    {isEditMode
                        ? "EDIT PLAYER"
                        : "ADD PLAYER"}
                </h1>

                <span>
                    {isEditMode
                        ? "Update player information."
                        : "Add a new player to the Football Universe database."}
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
                        Basic Information
                    </h2>


                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Player Name
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Lionel Messi"
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
                                placeholder="e.g. Argentina"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Position
                            </label>

                            <select
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                            >

                                <option value="GK">
                                    GK - Goalkeeper
                                </option>

                                <option value="LB">
                                    LB - Left Back
                                </option>

                                <option value="CB">
                                    CB - Center Back
                                </option>

                                <option value="RB">
                                    RB - Right Back
                                </option>

                                <option value="LWB">
                                    LWB - Left Wing Back
                                </option>

                                <option value="RWB">
                                    RWB - Right Wing Back
                                </option>

                                <option value="CDM">
                                    CDM - Defensive Midfielder
                                </option>

                                <option value="CM">
                                    CM - Central Midfielder
                                </option>

                                <option value="CAM">
                                    CAM - Attacking Midfielder
                                </option>

                                <option value="LM">
                                    LM - Left Midfielder
                                </option>

                                <option value="RM">
                                    RM - Right Midfielder
                                </option>

                                <option value="LW">
                                    LW - Left Winger
                                </option>

                                <option value="RW">
                                    RW - Right Winger
                                </option>

                                <option value="ST">
                                    ST - Striker
                                </option>

                                <option value="CF">
                                    CF - Center Forward
                                </option>

                            </select>

                        </div>


                        <div className="form-field">

                            <label>
                                Shirt Number
                            </label>

                            <input
                                type="number"
                                name="shirt_number"
                                min="0"
                                value={form.shirt_number}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Current Club
                            </label>

                            <select
                                name="club"
                                value={form.club}
                                onChange={handleChange}
                            >

                                <option value="">
                                    No Club
                                </option>

                                {clubs.map((club) => (

                                    <option
                                        key={club.id}
                                        value={club.id}
                                    >
                                        {club.name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <div className="form-field">

                            <label>
                                Image URL
                            </label>

                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://..."
                            />

                        </div>

                    </div>

                </div>


                <div className="form-section">

                    <h2>
                        Career Statistics
                    </h2>


                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Appearances
                            </label>

                            <input
                                type="number"
                                name="appearances"
                                min="0"
                                value={form.appearances}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Goals
                            </label>

                            <input
                                type="number"
                                name="goals"
                                min="0"
                                value={form.goals}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Assists
                            </label>

                            <input
                                type="number"
                                name="assists"
                                min="0"
                                value={form.assists}
                                onChange={handleChange}
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

                    </div>

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="form-cancel"
                        onClick={() =>
                            navigate("/players")
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
                                ? "Update Player"
                                : "Add Player"}

                    </button>

                </div>

            </form>

        </main>

    );

}


export default PlayerForm;