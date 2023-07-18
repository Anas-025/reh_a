import "@/styles/Main.css";
import "@/styles/globals.css";
import { MeetingProvider } from "components/MeetingContext";
import { UserProvider } from "components/UserContext";
import AppLayout from "components/app/AppLayout/AppLayout";
import BlogsLayout from "components/blogs/Blogs/BlogsLayout";
import ErrorBoundary from "error/error";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Suspense } from "react";

const Loading = () => <div className="bg-[#000]">Loading...</div>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/app")) {
    return (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <UserProvider>
            <MeetingProvider>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </MeetingProvider>
          </UserProvider>
        </ErrorBoundary>
      </Suspense>
    );
  } else if (router.pathname.startsWith("/blogs")) {
    return (
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <MeetingProvider>
            <BlogsLayout>
              <Component {...pageProps} />
            </BlogsLayout>
          </MeetingProvider>
        </UserProvider>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <UserProvider>
        <MeetingProvider>
          <Component {...pageProps} />
        </MeetingProvider>
      </UserProvider>
    </Suspense>
  );
}
