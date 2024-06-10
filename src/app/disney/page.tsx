"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { disneyApi } from "@/lib/api";

import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Grid } from "./styles";
import CardWithImage from "@/components/CardWithImage";
import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

export default function Disney() {
  const [characters, setCharacters] = useState<FormattedCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = searchParams.get("pageSize") || 25;

  const { toast } = useToast();

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      const { data } = await disneyApi.get(
        `/character?pageSize=${pageSize}&page=${page}`,
      );

      if (!data) {
        return;
      }

      const totalPages = data.info.totalPages;

      const formattedCharacteres = data.data.map((character: Character) => ({
        _id: character._id,
        title: character.name,
        description: character.films[0],
        imageUrl: character.imageUrl,
      }));

      setCharacters(formattedCharacteres);
      setTotalCount(totalPages);
      setIsLoading(false);
    };

    fetchCharacters();
  }, []);

  const addFavorite = async (character: Partial<Character>) => {
    const { error } = await supabase.from("favorite_character").insert({
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-10">
            <h1 className="text-3xl font-bold text-center my-8">
              All Disney Characteres
            </h1>
          </div>
          <div className="w-full">
            <Grid>
              {characters.map((character) => (
                <CardWithImage
                  key={character._id}
                  title={character.title}
                  description={character.description}
                  image={character.imageUrl}
                  clickHandler={() => addFavorite(character)}
                />
              ))}
            </Grid>
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`disney?page=${page - 1}`} />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href={`disney?page=${page}`}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                {page + 1 <= totalCount && (
                  <PaginationItem>
                    <PaginationLink href={`disney?page=${page + 1}`}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {page + 2 <= totalCount && (
                  <PaginationItem>
                    <PaginationLink href={`disney?page=${page + 2}`}>
                      {page + 2}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {page < totalCount && (
                  <PaginationItem>
                    <PaginationNext href={`disney?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </ProtectedRoute>
  );
}
