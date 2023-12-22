import { useEffect, useState } from "react"
import { Community, CommunitySchema, House, HouseSchema } from "../../types/api.types";
import { z } from "zod";
import CommunityCard from "./CommunityCard";

const Communities = ({ className }: {className?: string}) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/openhouse-ai-fe-coding-test/communities.json"),
      fetch("/api/openhouse-ai-fe-coding-test/homes.json")
    ])
      .then((responses) => {
        if (responses.some((response) => !response.ok)) {
          setError("Failed to fetch data from API");
        }
        else {
          Promise.all(responses.map((response) => response.json()))
            .then((data) => {
              setCommunities(z.array(CommunitySchema).parse(data[0]));
              setHouses(z.array(HouseSchema).parse(data[1]));
            })
            .catch((error) => {
              setError(error.message);
            });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Function to sort communities alphabetically
  const sortCommunities = (a: Community, b: Community) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  }

  // Function to calculate average price of homes in a community
  const calculateAveragePrice = (community: Community) => {
    const housesInCommunity = houses.filter((house) => house.communityId === community.id);
    const total = housesInCommunity.reduce((acc, curr) => acc + curr.price, 0);
    return total / housesInCommunity.length || 0;
  }

  return (
    <>
    {
      error ? <div className="text-red-500">{"API error: " + error}</div> :
      <div className={`flex flex-col gap-3 w-fit ${className}`}>
        {([] as Community[]).concat(communities).sort(sortCommunities).map((community, idx) => 
          <CommunityCard 
          name={community.name}
            imgUrl={community.imgUrl}
            numHomes={houses.filter((house) => house.communityId === community.id).length}
            averagePrice={calculateAveragePrice(community)}
            key={idx}
          />
        )}
      </div>
    }
    </>
  )
}

export default Communities;