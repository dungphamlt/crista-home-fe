import { Suspense } from "react";
import { OAuthCallbackClient } from "./OAuthCallbackClient";

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-20 text-center text-gray-500 text-sm">
          Đang tải…
        </div>
      }
    >
      <OAuthCallbackClient />
    </Suspense>
  );
}
