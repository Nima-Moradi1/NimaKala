//this is a custom hook which allows the user to go back to the previous page
//if the page was entered wrong "(404 page)"

import { useRouter } from "next/navigation";

export default function useMoveBack() {
  const router = useRouter();
  return () => router.back()
}

