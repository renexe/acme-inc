import { Tooltip } from "@/components/helpers/mt-exporter";
import { FaHeart } from "react-icons/fa6";

const FavoriteButton = () => {
  return (
    <Tooltip content="Add aos favoritos" placement="left">
      <button className="absolute top-0 right-0 z-20 p-4 group">
        <FaHeart className="scale-125 group-hover:scale-150 transition" />
      </button>
    </Tooltip>
  )
}

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;

const arr = [1,2,3,4]
const max = Math.max.apply(null, arr);