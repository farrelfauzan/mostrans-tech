"use client";

import { ApiCharacters, ApiLocations } from "@/plugins/service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AppDispatch } from "@/store";
import {
  CharacterDetail,
  Characters,
  setCharacterDetail,
  setCharacterLocation,
  setCharacterLocationDetail,
} from "@/app/slices/Character";
import { Locations, setLocations } from "@/app/slices/Location";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export const CharacterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listLocation = useSelector(Locations);
  const character = useSelector(CharacterDetail);
  const characters = useSelector(Characters);
  const params = useParams();
  const { toast } = useToast();
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ApiLocations.get("/").then((response) => {
      dispatch(setLocations(response.data.results));
    });
  }, []);

  const handleAssignLocation = () => {
    // validate locationName with the location API is not same
    if (locationName === "") {
      toast({
        title: "Location name is required",
        description: "Please enter the location name",
        variant: "destructive",
      });
      return;
    }
    dispatch(setCharacterLocation(locationName));
    dispatch(setCharacterLocationDetail(locationName));
    toast({
      title: "Location assigned successfully",
      description: "Character has been assigned to the location",
    });
  };
  return (
    <div className="flex justify-center items-center">
      {!loading ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            src={character?.image}
            alt={character.name}
            width={200}
            height={100}
          />
          <h1 className="text-2xl font-bold">{character.name}</h1>
          <p className="text-lg">{character.species}</p>
          <Select
            onValueChange={(e) => setLocationName(e)}
            defaultValue={character.location?.name}
          >
            <SelectTrigger className="w-[180px]  rounded-lg p-2 flex justify-between border">
              <SelectValue placeholder="Select Location" />
              <ChevronDown />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
              {listLocation.map((item) => {
                return (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button type="submit" onClick={handleAssignLocation}>
            Assign to Location
          </Button>
        </div>
      ) : null}
    </div>
  );
};
