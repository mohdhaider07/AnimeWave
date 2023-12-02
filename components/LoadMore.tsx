"use client";

import { fetchAnimes } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

function LoadMore() {
	const { ref, inView } = useInView();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (inView) {
			setIsLoading(true);
			const timeOut = setTimeout(() => {
				fetchAnimes(page).then((res) => {
					setData([...data, ...res]);
					page++;
				});
				setIsLoading(false);
			}, 500);
			return () => clearTimeout(timeOut);
		}
	}, [inView]);

	return (
		<>
			<section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
				{data}
			</section>
			<section className="flex justify-center items-center w-full">
				<div ref={ref}>
					{isLoading && inView && (
						<Image
							src="./spinner.svg"
							alt="spinner"
							width={56}
							height={56}
							className="object-contain"
						/>
					)}
				</div>
			</section>
		</>
	);
}

export default LoadMore;