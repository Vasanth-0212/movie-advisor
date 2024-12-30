"use client";
import React, { useEffect, useState } from "react";
import useStore from "../lib/useStockStore";

interface MovieList {
    movies: any[];
}

interface StockStore {
    wishlist: any[];
    setWishList: (wishlist: any[]) => void;
}

const DefaultList: React.FC<MovieList> = ({ movies }) => {

    const wishlist = useStore((state: StockStore) => state.wishlist);
    const setWishList = useStore((state: StockStore) => state.setWishList);

    useEffect(() => {
        console.log(wishlist);
    },[wishlist])

    const handleAddToWishlist = (movie: any) => {
        const movieExists = wishlist.find((m) => m.id === movie.id);
        if (movieExists) return;
        setWishList([...wishlist, movie]);
        alert(`The Movie "${movie.title}" is successfully added to the wishlist`);
    }


    return (
        <div>
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie: any) => {
                    return (
                        <div key={movie.id} className="bg-white shadow-2xl rounded-lg overflow-hidden">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-[600px] object-cover" />
                            <div className="p-4 space-y-3">
                                <h1 className="text-2xl font-bold text-gray-800">{movie.title}</h1>
                                <p className="text-sm font-semibold text-gray-600">Rating: {movie.vote_average}</p>
                                <button className="text-white bg-blue-600 text-xl h-10 w-full rounded-xl font-bold"
                                    onClick={() => handleAddToWishlist(movie)}
                                >Add to WishList</button>
                                <p className="text-sm text-gray-700">{movie.overview}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DefaultList;