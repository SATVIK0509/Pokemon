import { BASE_URL } from "../constants/api";

export default async function fetchPokemonList({ queryKey }: { queryKey: [string, number] }) {
  const [, currPage] = queryKey;
  const offset = (currPage - 1) * 20;
  const API = `${BASE_URL}/pokemon?limit=20&offset=${offset}`;

  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}
