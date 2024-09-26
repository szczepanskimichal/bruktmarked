import Link from "next/link";

export default function ProductCard({
  _id,
  title,
  price,
  user,
  images,
  index,
}) {
  return (
    <div>
      <div>
        <Link href={`/products/${_id}`}>
          {images?.length > 0 ? (
            <img src={images[0]} className="max-h-[180px] rounded-lg"></img>
          ) : (
            <img
              src="https://vilo.krakow.pl/wp-content/uploads/2020/07/emptyimagee.jpg"
              className="rounded-lg p-1"
            ></img>
          )}
        </Link>
      </div>
    </div>
  );
}
