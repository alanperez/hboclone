import axios from "axios";
import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import { useStateContext } from "../../components/HBOProvider";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import AuthCheck from "../../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from "../../components/UI/Placeholders/Placeholders";
import GenreNav from "../../components/UI/GenreNav/GenreNav";
import { shuffleArray } from "../../components/utilities";

export default function MediaTypePage(props) {
  const globalState = useStateContext();
  const router = useRouter();

  const showRandomMedia = () => {
    let thumbType;
    return props.genresData.map((item) => {
      thumbType = shuffleArray(globalState.thumbTypes)[0];
      return (
        <LazyLoad
          key={item.id}
          offset={-200}
          placeholder={<Placeholders title={item.name} type={thumbType} />}
        >
          <MediaRow
            title={item.name}
            type={thumbType}
            endpoint={`discover/${props.query.mediaType}?with_genres=${item.id}&sort_by=popularity.desc&primary_release_year=2021`}
          />
        </LazyLoad>
      );
    });
  };

  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        mediaURL={`https://image.tmdb.org/t/p/w1280${props.featuredData.backdrop_path}`}
        title={
          props.query.mediaType === "movie"
            ? props.featuredData.title
            : props.featuredData.name
        }
        linkURL={`/${props.query.mediaType}/${props.featuredData.id}`}
        type="single"
        mediaType={props.query.mediaType}
        mediaID={props.featuredData.id}
      />
      <GenreNav
        mediaType={props.query.mediaType}
        genresData={props.genresData}
      />
      {showRandomMedia()}
    </MainLayout>
  );
}

// grabs data before the page loads, pass in the data to the prop of the page

export async function getServerSideProps(context) {
  let genresData;
  let featuredData;

  try {
    genresData = await axios.get(
      `https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=a26b37fcc8ce7a800fd77ef0e6fd7d71&language=en-US`
    );
    featuredData = await axios.get(
      `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2021&api_key=a26b37fcc8ce7a800fd77ef0e6fd7d71&language=en-US`
    );

    console.log("Genres Data", genresData.data);
  } catch (error) {
    console.log("Genres Data Error", error);
  }
  return {
    props: {
      genresData: genresData.data.genres,
      featuredData: shuffleArray(featuredData.data.results)[0],
      query: context.query,
    },
  };
}
