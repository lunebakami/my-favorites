"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import CarouselList from "@/components/CarouselList";
import { Character } from "../dashboard/page";
import { useToast } from "@/components/ui/use-toast";

type SupabaseFavorite = {
  character_id: number;
  name: string;
  image_url: string;
};

export default function MyFavorites() {
  const [favorites, setFavorites] = useState<SupabaseFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data } = await supabase.from("favorite_character").select("*");

      if (data) {
        toast({
          title: "Success",
          description: "Favorite removed",
        });
        setFavorites(data || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (character: Partial<Character>) => {
    const { data } = await supabase.auth.getSession();

    const { error } = await supabase
      .from("favorite_character")
      .delete()
      .eq("character_id", character._id)
      .eq("user_id", data.session?.user?.id);

    if (error) {
      toast({
        title: "Error",
        description: "An error occurred while removing the favorite character",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Favorite removed",
    });
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
