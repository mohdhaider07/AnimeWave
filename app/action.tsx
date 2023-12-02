"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

// interface of fetchAnimes

export const fetchAnimes = async (page: number) => {
	let url = `https://shikimori.one/api/animes?page=${page}`;
	const season: number[] = [];
	const kind: string[] = ["tv_13"]; // tv, movie, ova, ona, special, music, tv_13, tv_24, tv_48
	const limit: number = 8;
	const order: string = "popularity"; // rank, popularity, aired_on, episodes, random
	const status: string = ""; // Must be one of: anons, ongoing, released
	const rating: string = ""; //none, g, pg, pg_13, r, r_plus, rx
	const genre: string[] = [""]; // action adventure sci-fi
	const search: string = ""; // search by name

	// limit exist then all query prameter in the url

	if (search) {
		if (search) url += `&search=${search}`;
		console.log("search exist");
	} else {
		if (limit) url += `&limit=${limit}`;
		if (season.length) url += `&season=${season.join(",")}`;
		if (kind.length) url += `&kind=${kind.join(",")}`;
		if (status) url += `&status=${status}`;
		if (order) url += `&order=${order}`;
		if (rating) url += `&rating=${rating}`;
		if (genre.length) url += `&genre=${genre.join(",")}`;
	}

	const response = await fetch(url);
	const data = await response.json();

	return data.map((anime: AnimeProp, index: number) => (
		<AnimeCard key={anime.id} anime={anime} index={index} />
	));
};
