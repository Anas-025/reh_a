import "@/styles/Main.css";
import "@/styles/globals.css";
import { GPCProvider } from "Providers/GPC_Provider";
import { MeetingProvider } from "components/MeetingContext";
import { UserProvider } from "components/UserContext";
import { NewUserProvider } from "components/context/userContext";
import BlogsLayout from "components/general/Blogs/BlogsLayout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import Layout from "./Layout";

const Loading = () => <div className="bg-[#000]">Loading...</div>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/app")) {
    return (
      <Suspense fallback={<Loading />}>
        <GPCProvider>
          <NewUserProvider>
            <UserProvider>
              <MeetingProvider>
                <Layout>
                  <TopLoader />
                  <Component {...pageProps} />
                </Layout>
              </MeetingProvider>
            </UserProvider>
          </NewUserProvider>
        </GPCProvider>
      </Suspense>
    );
  } else if (router.pathname.startsWith("/blogs")) {
    return (
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <BlogsLayout>
            <TopLoader />
            <Component {...pageProps} />
          </BlogsLayout>
        </UserProvider>
      </Suspense>
    );
  } else if (router.pathname === "/signin") {
    return (
      <GPCProvider>
        <Component {...pageProps} />
      </GPCProvider>
    );
  } else if (router.pathname === "/") {
    return (
      <Suspense fallback={<Loading />}>
        <TopLoader />
        <Component {...pageProps} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <UserProvider>
        <GPCProvider>
          <MeetingProvider>
            <Component {...pageProps} />
          </MeetingProvider>
        </GPCProvider>
      </UserProvider>
    </Suspense>
  );
}

const TopLoader = () => {
  return <NextTopLoader color="#fab800" height={4} showSpinner={false} />;
}
