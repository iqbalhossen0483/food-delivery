import { useContext } from "react";
import { FirebaseShema } from "../../firebase";
import { AuthContex } from "../contextAPI/FirebaseProvider";

const useAuth: () => FirebaseShema | null = () => {
  return useContext(AuthContex);
};

export default useAuth;
