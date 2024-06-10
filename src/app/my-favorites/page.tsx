"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import CarouselList from "@/components/CarouselList";
import { Character } from "../dashboard/page";

type SupabaseFavorite = {
  character_id: number;
  name: string;
  image_url: string;
};

export default function MyFavorites() {
  const [favorites, setFavorites] = useState<SupabaseFavorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data } = await supabase.from("favorite_character").select("*");

      console.log({ data });

      setFavorites(data || []);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (character: Partial<Character>) => {
    const user_id = await supabase.auth.getSession();

    await supabase
      .from("favorite_character")
      .delete()
      .eq("character_id", character._id)
      .eq("user_id", user_id);

    setFavorites((prev) =>
      prev.filter((favorite) => favorite.character_id !== character._id),
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div>
        <h1 className="text-3xl font-bold text-center my-8">My Favorites</h1>
        {favorites.length === 0 ? (
          <div>No favorites yet!</div>
        ) : (
          <CarouselList
            buttonText="Remove"
            handleClick={(character) => removeFavorite(character)}
            items={favorites.map((favorite) => ({
              _id: favorite.character_id,
              title: favorite.name,
              imageUrl: favorite.image_url,
              description: "",
            }))}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
