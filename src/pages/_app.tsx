import "@/styles/Main.css";
import "@/styles/globals.css";
import { MeetingProvider } from "components/MeetingContext";
import { UserProvider } from "components/UserContext";
import BlogsLayout from "components/general/Blogs/BlogsLayout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Layout from "./Layout";

const Loading = () => <div className="bg-[#000]">Loading...</div>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/app")) {
    return (
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <MeetingProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MeetingProvider>
        </UserProvider>
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
