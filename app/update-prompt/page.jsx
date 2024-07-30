// app/update-prompt/page.js
import { Suspense } from "react";
import dynamic from "next/dynamic";

const UpdatePrompt = dynamic(() => import("@components/update-prompt"), {
  suspense: true,
});

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;
