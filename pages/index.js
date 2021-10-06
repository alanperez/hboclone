import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import ForYouList from "../components/UI/ForYouList/ForYouList";
import JustAdded from "../components/UI/JustAdded/JustAdded";
import PosterView from "../components/UI/PosterView/PosterView";
import { useStateContext } from "../components/HBOProvider";
import { useEffect } from "react";
import { Router, useRouter } from "next/dist/client/router";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import AuthCheck from "../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from "../components/UI/Placeholders/Placeholders";

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();

  useEffect(() => {}, []);

  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        mediaURL="https://www.youtube.com/embed/jz1FrtMIh5c?autoplay=1&loop=1&start=16"
        title="Suicide Squad"
        location="In theaters and on HBO MAX. Streaming throughout August 13."
        linkURL="/movie/436969"
        type="front"
        mediaType={"movie"}
        mediaID={436969}
      />
      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Movies" type="large-v" />}
      >
        <MediaRow
          title="Movies"
          type="large-v"
          endpoint="discover/movie?sort_by=popularity.desc&primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Series" type="small-h" />}
      >
        <MediaRow
          title="Series"
          type="small-h"
          mediaType="series"
          endpoint="discover/tv?primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Action" type="small-v" />}
      >
        <MediaRow
          title="Action"
          type="small-v"
          endpoint="discover/movie?with_genres=28"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Horror" type="small-v" />}
      >
        <MediaRow
          title="Horror"
          type="small-v"
          endpoint="discover/movie?with_genres=27"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Animations" type="large-h" />}
      >
        <MediaRow
          title="Animations"
          type="large-h"
          endpoint="discover/movie?with_genres=16"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Sci-fi" type="small-v" />}
      >
        <MediaRow
          title="Sci-fi"
          type="small-v"
          endpoint="discover/movie?with_genres=878"
        />
      </LazyLoad>
    </MainLayout>
  );
}
