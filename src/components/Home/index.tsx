"use client";

import { ApiCharacters } from "@/plugins/service";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { Character } from "@/types/character";
import { useMediaQuery } from "react-responsive";

export const HomePage = () => {
  const [character, setCharacter] = useState<Character[]>([]);
  const router = useRouter();

  const isTouchDevice = useMediaQuery({
    query: "(hover: none) and (pointer: coarse)",
  });

  function onClickCharacter(id: number) {
    router.push(`/character/${id}`);
  }

  useEffect(() => {
    ApiCharacters.get("/").then((response) => {
      setCharacter(response.data.results);
    });
  }, []);

  return (
    <div className="grid grid-cols-6 gap-8  max-lg:grid-cols-2 max-[1600px]:grid-cols-4 max-[300px]:grid-cols-1">
      {character.map((item) => {
        return (
          <Card key={item.id} onClick={() => onClickCharacter(item.id)}>
            <CardHeader>
              <img src={item.image} alt={item.name} />
            </CardHeader>
            <div className="flex flex-col justify-center items-center">
              <CardTitle className="max-sm:text-sm">
                {item.name.length > 15
                  ? `${item.name.substring(0, 15)}...`
                  : item.name}
              </CardTitle>
              <CardDescription className="flex flex-col items-center">
                <label className="text-center">{item.species} - </label>
                <label>
                  {item.location.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ").length > 15 && isTouchDevice
                    ? `${item.location.name.substring(0, 15)}...`
                    : item.location.name}
                </label>
              </CardDescription>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
