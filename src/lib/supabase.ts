import { createClient } from "@supabase/supabase-js";
import debounce from "./debounce";
import { Character } from "@/app/dashboard/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const addFavorite = async (character: Partial<Character>) => {
  const { data: authData } = await supabase.auth.getSession();
  const { data: checkData } = await supabase.from("favorite_character").select("*").eq("character_id", character._id).eq("user_id", authData.session?.user?.id);

  if (checkData?.length === 1) {
    return { data: null, error: { message: "Character already favorited" }};
  }

  const { data, error } = await supabase.from("favorite_character").insert({
    character_id: character._id,
    name: character.name,
    image_url: character.imageUrl,
  });

  return { data, error };
};

export const removeFavorite = async (character: Partial<Character>) => {
  const { data } = await supabase.auth.getSession();

  const { error } = await supabase
    .from("favorite_character")
    .delete()
    .eq("character_id", character._id)
    .eq("user_id", data.session?.user?.id);

  return { error };
};

export const debounceRemoveFavorite = debounce(removeFavorite, 1000);
