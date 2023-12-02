"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

// interface of fetchAnimes

export const fetchAnimes = async (page: number) => {
	const response = await fetch(
		`https://shikimori.one/api/animes?page=${page}&limit=${4}&order=popularity`
	);
	const data = await response.json();
	// console.log(data);

	return data.map((anime: AnimeProp, index: number) => (
		<AnimeCard key={anime.id} anime={anime} index={index} />
	));
};
