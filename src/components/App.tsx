import { useEffect, useState } from "react"
import { Community, CommunitySchema, House, HouseSchema } from "../types/api.types";
import { z } from "zod";

function App() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    // Fetch community data from API
    fetch("/api/openhouse-ai-fe-coding-test/communities.json")
      .then((response) => response.json())
      .then((data) => {
        setCommunities(z.array(CommunitySchema).parse(data));
      });
    
    // Fetch houses data from API
    fetch("/api/openhouse-ai-fe-coding-test/homes.json")
      .then((response) => response.json())
      .then((data) => {
        setHouses(z.array(HouseSchema).parse(data));
      });
  }, []);

  return (
    <div>
      <h1>Communities</h1>
      <ul>
        {communities.map((community) => (
          <li key={community.id}>
            {community.name}
          </li>
        ))}
      </ul>
      <h1>Houses</h1>
      <ul>
        {houses.map((house) => (
          <li key={house.id}>
            {house.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
