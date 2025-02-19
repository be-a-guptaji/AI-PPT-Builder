import React, { Suspense } from "react";
import CreatePageSkeleton from "./_components/create-page/createPageSkeleton";
import RenderPage from "./_components/renderPage";

const page = () => {
    return (
        <main className="w-full h-full pt-6">
            <Suspense fallback={<CreatePageSkeleton />}>
                <RenderPage />
            </Suspense>
        </main>
    );
};

export default page;
