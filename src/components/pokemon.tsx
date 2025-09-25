import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/api";
import fetchPokemonDetail from "../api/fetchPokemonDetails";
import { useQuery } from "@tanstack/react-query";

export default function Pokemon() {
  const { id } = useParams();
  const API_URL = `${BASE_URL}/pokemon/${id}/`;

  const { data, isLoading } = useQuery({
    queryKey: ["individual-Pokemon", API_URL],
    queryFn: fetchPokemonDetail,
    staleTime: 1000 * 60 * 5,
  });

  const pokemon = data;

  if (isLoading) return <p className="text-center ">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex flex-col items-center">
        <img
          className="w-40 h-40 object-contain"
          src={pokemon?.sprites?.other?.dream_world?.front_default}
          alt={""}
        />
        <h1 className="mt-4 text-3xl font-bold capitalize">{pokemon?.name}</h1>
        <p className="text-gray-500">#{pokemon?.id}</p>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {pokemon?.types.map((t: any, index: number) => (
          <span
            key={index}
            className="px-3 py-1 rounded-3xl bg-green-200 text-red-800 font-semibold text-sm capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mt-6">
        <div className="bg-blue-100 p-3 rounded-lg shadow">
          <p className="text-lg font-bold">{pokemon?.height / 10} m</p>
          <p className="text-gray-600 text-sm">Height</p>
        </div>

        <div className="bg-blue-100 p-3 rounded-lg shadow">
          <p className="text-lg font-bold">{pokemon?.weight / 10} kg</p>
          <p className="text-gray-600 text-sm">Weight</p>
        </div>

        <div className="bg-blue-100 p-3 rounded-lg shadow">
          <p className="text-lg font-bold">{pokemon?.base_experience}</p>
          <p className="text-gray-600 text-sm">Base XP</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Stats</h2>
        <div className="space-y-2">
          {pokemon?.stats.map((s: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between text-sm font-medium">
                <span className="capitalize">{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${s.base_stat > 100 ? 100 : s.base_stat}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Abilities</h2>
        <div className="flex flex-wrap gap-3">
          {pokemon?.abilities.map((a: any, index: number) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 font-medium text-sm capitalize"
            >
              {a.ability.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Moves</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon?.moves.slice(0, 5).map((m: any, index: number) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md bg-purple-200 text-purple-800 text-sm capitalize"
            >
              {m.move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
