"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { disneyApi } from "@/lib/api";
import getRandomItems from "./getRandomItems";
import CarouselList from "@/components/CarouselList";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Character = {
  _id: number;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  __v: number;
};

type FormattedCharacter = {
  _id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export default function Dashboard() {
  const [characters, setCharacters] = useState<FormattedCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      const { data } = await disneyApi.get("/character?pageSize=25");

      if (!data) {
        return;
      }

      const randomCharacteres = getRandomItems<Character>(data.data, 5);
      const formattedCharacteres = randomCharacteres.map((character) => ({
        _id: character._id,
        title: character.name,
        description: character.films[0],
        imageUrl: character.imageUrl,
      }));

      setCharacters(formattedCharacteres);
      setIsLoading(false);
    };

    fetchCharacters();
  }, []);

  const addFavorite = async (character: Partial<Character>) => {
    const { data, error } = await supabase.from("favorite_character").insert({
      character_id: character._id,
      name: character.name,
      image_url: character.imageUrl,
    });

    if (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the favorite character",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Favorite character added",
    });
  };

  return (
    <ProtectedRoute>
      <Navbar />
      {/* Some Disney Characteres */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-10">
            <h1 className="text-3xl font-bold text-center my-8">
              Some Disney Characteres
            </h1>
            <Button>
                <Link href="/disney">
                  See All
                </Link>
              </Button>
          </div>
          <div className="w-full">
            <CarouselList
              items={characters}
              handleClick={(character) => addFavorite(character)}
            />
          </div>
        </>
      )}
    </ProtectedRoute>
  );
}
