"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { disneyApi } from "@/lib/api";

import { addFavorite, supabase } from "@/lib/supabase";
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
import debounce from "@/lib/debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  name: string;
  description: string;
  imageUrl: string;
};

export default function Disney() {
  const [characters, setCharacters] = useState<FormattedCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");

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
        name: character.name,
        description: character.films[0],
        imageUrl: character.imageUrl,
      }));

      setCharacters(formattedCharacteres);
      setTotalCount(totalPages);
      setIsLoading(false);
    };

    fetchCharacters();
  }, []);

  const handleAddFavorite = async (character: Partial<Character>) => {
    const { error } = await addFavorite(character);

    if (error) {
      toast({
        title: "Error",
        description:
          error.message ??
          "An error occurred while adding the favorite character",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Favorite character added",
    });
  };

  const debounceAddFavorite = debounce(handleAddFavorite, 1000);

  const handleSearch = async () => {
    const { data } = await disneyApi.get(
      `/character?name=${search}`,
    );

    setCharacters(data.data);
    setTotalCount(1);
  };

  return (
    <ProtectedRoute>
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">
              All Disney Characteres
            </h1>
            <div className="flex w-80 gap-2 mb-8">
              <Input
                type="text"
                placeholder="Search Characteres By Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="w-16" onClick={() => handleSearch()}>Search</Button>
            </div>
          </div>
          <div className="w-full">
            <Grid>
              {characters.map((character) => (
                <CardWithImage
                  key={character._id}
                  title={character.name}
                  description={character.description}
                  image={character.imageUrl}
                  clickHandler={() => debounceAddFavorite(character)}
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
