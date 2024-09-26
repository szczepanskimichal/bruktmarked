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
    <div className="box">
      <div className="bg-white h-[200px] p-3 mb-2 rounded-t-lg flex justify-center items-center">
        <Link href={`/products/${_id}`}>
          {images?.length > 0 ? (
            <img src={images[0]} className="max-h-[180px] rounded-lg"></img>
          ) : (
            <img
              src="https://vilo.krakow.pl/wp-content/uploads/2020/07/emptyimagee.jpg"
              className="rounded-lg max-h-[180px] p-1"
            ></img>
          )}
        </Link>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <Link href={`/products/${_id}`}>
            <h3 className="text-lg hover:text-primary hover:decoration-primary decoration-gray-100 underline transition-all delay-150 duration-300">
              {title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
