"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiCharacters, ApiLocations } from "@/plugins/service";
import { Character } from "@/types/character";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Loaction } from "@/types/location";

export default function CharacterName() {
  const params = useParams();
  const { toast } = useToast();
  const [character, setCharacter] = useState<Character>({
    id: 0,
    name: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    image: "",
  });
  const [locationName, setLocationName] = useState("");
  const [listLocation, setListLocation] = useState<Loaction[]>([]);

  useEffect(() => {
    ApiCharacters.get(`/${params.id}`).then((response) => {
      setCharacter(response.data);
    });
    ApiLocations.get("/").then((response) => {
      setListLocation(response.data.results);
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
    const location = listLocation.find(
      (item: Loaction) =>
        item.name.toLowerCase() === locationName.toLocaleLowerCase()
    );
    if (!location) {
      console.log("locationName", locationName);
      toast({
        title: "Location assigned successfully",
        description: "Character has been assigned to the location",
      });
      setLocationName("");
      return;
    } else {
      toast({
        title: "Location already exists",
        description: "Cannot assign the character to the same location",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center space-y-2">
        <img src={character.image} alt={character.name} />
        <h1 className="text-2xl font-bold">{character.name}</h1>
        <p className="text-lg">{character.species}</p>
        <Input
          type="text"
          placeholder="Enter location name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
        <Button type="submit" onClick={handleAssignLocation}>
          Assign to Location
        </Button>
      </div>
    </div>
  );
}
