import { Spinner } from "@heroui/react";


export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full gap-4">
      <Spinner />
    </div>
  );
}