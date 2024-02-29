"use client";

import { useEffect, useState } from "react";
import { DataTableDemo } from "../Character/Table";
import { ApiCharacters, ApiLocations } from "@/plugins/service";
import { Character } from "@/types/character";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Characters,
  setCharacter,
  setCharacterDetail,
} from "@/app/slices/Character";
import { Locations, setLocations } from "@/app/slices/Location";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown } from "lucide-react";

export const LocationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedLocation = searchParams.get("location");
  const characters = useSelector(Characters);
  const location = useSelector(Locations);
  const isTouchDevice = useMediaQuery({
    query: "(hover: none) and (pointer: coarse)",
  });

  const filteredCharacters = characters?.filter((character) => {
    return character.location.name === selectedLocation;
  });

  function onClickCharacter(data: Character, e: any) {
    e.preventDefault();
    dispatch(setCharacterDetail(data));
    router.push(`/character/${data.id}`);
  }

  useEffect(() => {
    if (location.length <= 0) {
      ApiLocations.get("/").then((response) => {
        dispatch(setLocations(response.data.results));
      });
    }
    if (characters.length <= 0) {
      ApiCharacters.get("/").then((response) => {
        dispatch(setCharacter(response.data.results));
      });
    }
  }, []);

  function onChangeLocation(e: string) {
    router.push(`?location=${e}`);
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-2 max-[1600px]:grid-cols-4 max-[300px]:grid-cols-1">
          {/* <DataTableDemo data={character ?? []} /> */}
          {/* <DataTableDemo /> */}
          {location.map((item: any) => {
            return (
              <Link
                href={`?location=${item.name}`}
                key={item.id}
                className="flex items-center"
              >
                <Button className="w-full">{item.name}</Button>
              </Link>
            );
          })}
          {/* {isTouchDevice && (
            <Select onValueChange={(e) => onChangeLocation(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {location.map((item: any) => {
                  return (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-[1600px]:grid-cols-4 max-[300px]:grid-cols-1 mt-8">
        {filteredCharacters.length <= 0 && (
          // center the text No Character Found
          <div className="col-span-4 flex justify-center items-center">
            <h1 className="text-red-600">No Character Found</h1>
          </div>
        )}
        {filteredCharacters?.map((item: any) => {
          return (
            <Card key={item.id} onClick={(e) => onClickCharacter(item, e)}>
              <CardHeader className="flex justify-center items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
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
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
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
    </>
  );
};
