import Backdrop from "@/components/Backdrop";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/inputs/UserForm";
import AccountLayout from "@/components/layout/AccountLayout";
import useProfile from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilPage() {
  const session = useSession();
  const [fullImage, setFullImage] = useState(false);

  const { user, loading } = useProfile();

  return (
    <>
      {fullImage && (
        <Backdrop handleClose={() => setFullImage(false)}>
          <img className="rounded-lg max-h-[65vh]" src={user?.image} alt="" />
        </Backdrop>
      )}
      <AccountLayout>
        {loading ? (
          <Spinner />
        ) : (
          <UserForm user={user} setFullImage={setFullImage} />
        )}
      </AccountLayout>
    </>
  );
}
