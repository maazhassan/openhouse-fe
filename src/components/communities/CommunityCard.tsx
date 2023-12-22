type CommunityCardProps = {
  name: string,
  imgUrl: string,
  numHomes: number,
  averagePrice: number,
  key: number
}

const CommunityCard = ({ name, imgUrl, numHomes, averagePrice }: CommunityCardProps) => {
  return (
    <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl md:max-h-32 hover:bg-gray-100">
      <img 
        className="object-cover w-full rounded-t-lg h-72 md:object-fit md:max-h-32 md:w-48 md:rounded-none md:rounded-s-lg"
        src={imgUrl == "" ? "src/assets/community-placeholder.jpg" : imgUrl}
        alt="Community"
        onError={({ currentTarget }) => {
          (currentTarget as HTMLImageElement).setAttribute("onerror", "");
          (currentTarget as HTMLImageElement).setAttribute("src", "src/assets/community-placeholder.jpg")
        }}
      />
      <div className="flex flex-col items-center p-6 text-center md:items-start md:text-left">
        <h3 className="text-lg text-gray-900 font-medium leading-6">
          {name}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Homes for sale: {numHomes}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Average home price: {new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}).format(averagePrice)}
        </p>
      </div>
    </a>
  )
}

export default CommunityCard;