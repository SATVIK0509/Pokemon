
export default async function fetchPokemonDetail({ queryKey }: { queryKey: [string, string] }) {
    
  const [, API] = queryKey;

  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to fetch Pokemon detail");
  return res.json();
}
