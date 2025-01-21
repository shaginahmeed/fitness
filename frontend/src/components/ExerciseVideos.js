import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import Loader from "./Loader";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <Box sx={{ marginTop: { lg: "190px", xs: "20px" } }} p="20px">
      <Typography
        sx={{ fontSize: { lg: "35px", xs: "25px" } }}
        fontWeight={700}
        color="white"
        mb="33px"
        marginLeft="40px"
      >
        Watch{" "}
        <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
          {name}
        </span>{" "}
        exercise videos
      </Typography>
      <Stack
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "80px", xs: "0px" } }}
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
        marginLeft="30px"
      >
        {exerciseVideos?.slice(0, 9)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "20px",
              }}
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
            />
            <Box>
              <Typography
                sx={{ fontSize: { lg: "20px", xs: "15px" } }}
                fontWeight={600}
                color="white"
              >
                {item.video.title}
              </Typography>
              <Typography fontSize="15px" color="white">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
