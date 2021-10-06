import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import CastInfo from "../../components/UI/CastInfo/CastInfo";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import AuthCheck from "../../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from "../../components/UI/Placeholders/Placeholders";
export default function SingleMediaPage(props) {
  const router = useRouter();
  const [mediaData, setMediaData] = useState(false);
  //   const { id } = router.query;

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/movie/${props.query.id}?api_key=a26b37fcc8ce7a800fd77ef0e6fd7d71&language=en-US`
  //       )
  //       .then(function (response) {
  //         // handles success
  //         setMediaData(response.data);
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         // handles error
  //         console.log(error);
  //       });
  //   }, [mediaData]);

  console.log(router.query);
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        title={
          props.query.mediaType === "movie"
            ? props.mediaData.title
            : props.mediaData.name
        }
        mediaURL={`https://image.tmdb.org/t/p/original${props.mediaData.backdrop_path}`}
        location="In theaters and on HBO MAX. Streaming throughout May 23."
        linkURL="/movies/id"
        type="single"
        mediaType={props.query.mediaType}
        mediaID={props.query.id}
      />
      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Movies" type="large-v" />}
      >
        <MediaRow
          updateData={props.query.id}
          title="Similar To This"
          type="small-v"
          mediaType={props.query.mediaType}
          endpoint={`${props.query.mediaType === "movie" ? "movie" : "tv"}/${
            props.query.id
          }/similar?`}
        />
      </LazyLoad>
      <CastInfo
        mediaID={props.query.id}
        mediaType={props.mediaType}
        updateData={props.query.id}
      />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  let mediaData;
  try {
    mediaData = await axios.get(
      `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=a26b37fcc8ce7a800fd77ef0e6fd7d71&language=en-US`
    );
  } catch (error) {}
  return {
    props: { mediaData: mediaData.data, query: context.query },
  };
}
