/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/dist/client/link";
import { useState, useEffect } from "react";
import { shuffleArray } from "../../utilities";
const MediaRow = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [movies, setMoviesData] = useState([]);
  // `https://api.themoviedb.org/3/${props.endpoint}&primary_release_year=2021&api_key=a26b37fcc8ce7a800fd77ef0e6fd7d71&language=en-US`
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.endpoint}&api_key=a26b37fcc8ce7a800fd77ef0e6fd7d71&language=en-US`
      )
      .then(function (response) {
        setMoviesData(shuffleArray(response.data.results));
        setLoadingData(false);
        // handles success
        console.log("Succesful Response for " + props.title);
        console.log(response);
      })
      .catch(function (error) {
        // handles error
        console.log("Error Response for " + props.title);
        console.log(error);
      });
  }, [props.updateData]);

  const loopComp = (comp, digit) => {
    let thumbnails = [
      <Skeleton key={"1"} />,
      <Skeleton key={"2"} />,
      <Skeleton key={"3"} />,
      <Skeleton key={"4"} />,
      <Skeleton key={"5"} />,
    ];

    return thumbnails;
  };

  const showThumbnails = (type) => {
    setTimeout(() => setLoadingData(false), 3000);
    return loadingData
      ? loopComp(<Skeleton />, 10)
      : movies.map((movie) => {
          return (
            <Thumbnail
              key={movie.id}
              movieData={movie}
              type={type}
              mediaType={props.mediaType}
            />
          );
        });
  };

  return (
    <div className={`media-row ${props.type}`}>
      <h3 className="media-row__title">{props.title}</h3>
      <div className="media-row__thumbnails">{showThumbnails(props.type)}</div>
    </div>
  );
};

const Thumbnail = (props) => {
  const thumbSize = (type) => {
    if (type === "large-v") {
      return "400";
    }
    if (type === "small-v") {
      return "185";
    }
    if (type === "large-h") {
      return "500";
    }
    if (type === "small-h") {
      return "342";
    }
  };

  const imgURL = "https://image.tmdb.org/t/p/w";
  return (
    <Link
      href={`/${props.mediaType === "movie" ? "movie" : "tv"}/${
        props.movieData.id
      }`}
    >
      <a>
        <div className="media-row__thumbnail">
          <img
            src={`${
              imgURL + thumbSize(props.type) + props.movieData.poster_path
            }`}
          />
          <div className="media-row__top-layer">
            <i className="fas fa-play" />
          </div>
        </div>
      </a>
    </Link>
  );
};

const Skeleton = () => {
  return (
    <div className="media-row__thumbnail-skeleton">
      <div className="media-row__thumbnail-skeleton-img"></div>
    </div>
  );
};

MediaRow.defaultProps = {
  mediaType: "movie",
};
export default MediaRow;
