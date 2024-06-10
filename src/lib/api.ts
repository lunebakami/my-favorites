import axios from "axios";

export const disneyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DISNEY_API_URL!,
});
