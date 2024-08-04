import axios from "axios";

export const subjects = axios.create({baseURL: "http://192.168.15.117:5199/v1"})
