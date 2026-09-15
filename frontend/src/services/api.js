import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});


export const getPlayers = () =>
    api.get("/players/");

export const getClubs = () =>
    api.get("/clubs/");

export const getCompetitions = () =>
    api.get("/competitions/");

export const getTransfers = () =>
    api.get("/transfers/");

export const getTimelineEvents = () =>
    api.get("/timeline/");

export const getDashboardStats = () =>
    api.get("/dashboard/");


export const getPlayer = (id) =>
    api.get(`/players/${id}/`);

export const getClub = (id) =>
    api.get(`/clubs/${id}/`);

export const getCompetition = (id) =>
    api.get(`/competitions/${id}/`);


export const createPlayer = (data) =>
    api.post("/players/", data);

export const updatePlayer = (id, data) =>
    api.put(`/players/${id}/`, data);

export const deletePlayer = (id) =>
    api.delete(`/players/${id}/`);

export const createClub = (data) =>
    api.post("/clubs/", data);

export const updateClub = (id, data) =>
    api.put(`/clubs/${id}/`, data);

export const deleteClub = (id) =>
    api.delete(`/clubs/${id}/`);

export default api;