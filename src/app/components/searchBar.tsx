"use client";
import React, { useEffect, useState } from "react";
import DefaultList from "./defaultList";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import useStore from "../lib/useStockStore";

// Define the Movie interface
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
}

interface MovieList {
    wishlist: Movie[];
    setWishList: (wishlist: Movie[]) => void;
}

const SearchBar = () => {
    const [movies, setMovies] = useState<Movie[]>([]); // Use Movie[] type for movies
    const [search, setSearch] = useState<string>(""); // Type search as string
    const [error, setError] = useState<string>(""); // Type error as string

    const wishlist = useStore((state: MovieList) => state.wishlist);
    const setWishList = useStore((state: MovieList) => state.setWishList);

    // Fetch trending movies
    async function getMovies() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=f43ec82a5f24fe6190891894b7436c7a`,
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "GET",
                }
            );

            if (response.ok) {
                const data = await response.json();
                setMovies(data.results); // Use Movie[] type for setMovies
            } else {
                console.error("Failed to fetch movies.");
            }
        } catch (error) {
            console.error("An error occurred while fetching movies:", error);
        }
    }

    // Search for movies
    async function searchMovie(query: string) { // Type query as string
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=f43ec82a5f24fe6190891894b7436c7a&query=${query}`
            );

            if (response.ok) {
                const data = await response.json();
                setMovies(data.results); // Use Movie[] type for setMovies
                setError(""); // Clear error if search is successful
            } else {
                setError("An error occurred while fetching movies.");
                setMovies([]); // Reset movies in case of error
            }
        } catch (error) {
            setError("An error occurred while fetching movies.");
            setMovies([]); // Reset movies in case of error
        }
    }

    // Handle search form submission
    const handleSearch = (e: React.FormEvent) => { // Type e as React.FormEvent
        e.preventDefault();
        searchMovie(search.trim());
    };

    // Handle removing a movie from the wishlist
    const handleRemoveFromWishlist = (movie: Movie) => { // Type movie as Movie
        const updatedWishlist = wishlist.filter((m) => m.id !== movie.id);
        setWishList(updatedWishlist);
    };

    useEffect(() => {
        console.log(wishlist);
    }, [wishlist]);

    useEffect(() => {
        if (search === "") {
            getMovies();
        }
    }, [search]);

    return (
        <div>
            <div className="flex flex-row justify-between items-center p-2 bg-blue-200 h-20 w-full">
                <div className="flex space-x-4 ml-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold font-sans text-blue-500">Movie Advisor</h1>
                    <form className="mt-2">
                        <div className="pt-2 space-x-2">
                            <input
                                type="text"
                                placeholder="Search for a movie"
                                className="bg-white border h-8 w-full md:w-48 rounded-md p-3 focus:outline-none border-blue-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className="h-8 w-full md:w-20 text-white bg-blue-500 rounded-xl"
                                onClick={(e) => handleSearch(e)}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className="pt-2">
                    <Sheet>
                        <div className="p-2">
                            <SheetTrigger className="h10 w-20 p-1 text-white bg-blue-500 font-medium border border-blue-500 rounded-lg">
                                WishList
                            </SheetTrigger>
                        </div>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>My WishList</SheetTitle>
                                <SheetDescription>
                                    {wishlist.map((movie) => {
                                        return (
                                            <div key={movie.id} className="mt-2 bg-white shadow-2xl rounded-lg border border-black overflow-hidden">
                                                <div className="p-4 space-y-3">
                                                    <h1 className="text-2xl font-bold text-gray-800">{movie.title}</h1>
                                                    <p className="text-sm font-semibold text-gray-600">Rating: {movie.vote_average}</p>
                                                    <button
                                                        className="text-white bg-red-500 text-xl h-10 w-full rounded-xl font-bold"
                                                        onClick={() => handleRemoveFromWishlist(movie)}
                                                    >
                                                        Remove from WishList
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <DefaultList movies={movies} />
        </div>
    );
};

export default SearchBar;
