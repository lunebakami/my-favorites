"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { disneyApi } from "@/lib/api";
import getRandomItems from "./getRandomItems";
import CarouselList from "@/components/CarouselList";
import { addFavorite } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Character, FormattedCharacter } from "./types";
import { useToast } from "@/components/ui/use-toast";
import debounce from "@/lib/debounce";

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

  const handleAddFavorite = async (character: Partial<Character>) => {
    const { error } = await addFavorite(character);

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

  const debounceAddFavorite = debounce(handleAddFavorite, 1000);

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
            <Link href="/disney">
              <Button>See All</Button>
            </Link>
          </div>
          <div className="w-full">
            <CarouselList
              items={characters}
              handleClick={(character) => debounceAddFavorite(character)}
            />
          </div>
        </>
      )}
    </ProtectedRoute>
  );
}
