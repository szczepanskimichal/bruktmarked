import Backdrop from "@/components/Backdrop";

export default function UserProductPage() {
  return (
    <>
      <Backdrop>
        <h3>Are you sure you want to delate this product?</h3>
        <div className="flex gap-3 justify-center">
          <button className="delete">Yes, delete!</button>
          <button>No, cancel</button>
        </div>
      </Backdrop>
    </>
  );
}
