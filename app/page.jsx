"use client";

import VideoPlayerControls from "@/components/video-player-controls";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;

    function handleResize() {
      setVideoDuration(video.duration);
      setVideoWidth(video.videoWidth);
      setVideoHeight(video.videoHeight);
    }

    function handleMetadataLoaded() {
      handleResize();
    }

    if (video) {

      video.addEventListener("click", togglePlayPaused);

      // Check if dimensions are available immediately
      if (video.videoWidth && video.videoHeight) {
        handleResize();
      } else {
        // If not, listen for the loadedmetadata event
        video.addEventListener("loadedmetadata", handleMetadataLoaded);
      }

      // Also, listen for the resize event
      window.addEventListener("resize", handleResize);

      // Cleanup event listeners on component unmount
      return () => {
        video.removeEventListener("loadedmetadata", handleMetadataLoaded);
        window.removeEventListener("resize", handleResize);
        video.removeEventListener("click", togglePlayPaused);

      };
    }
  }, []);
  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPaused = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <main className="flex min-h-screen ">
      <div className="bg-red-900 h-full w-full ">
        <div className="relative min-h-screen w-full max-w-xl  mx-auto ">
          <video
            autoPlay
            loop
            muted
            ref={videoRef}
            alt="invitation"
            width={500}
            height={1000}
            className="absolute top-0 left-0 object-cover object-center w-full h-full"
          >
            <source src={"/inv.mp4"} />
          </video>
          <div className={cn("absolute top-4 right-4 z-10")}>
            <VideoPlayerControls progress={videoProgress} isPaused={isPaused} onPlayPause={togglePlayPaused} />
          </div>
        </div>
      </div>
    </main>
  );
}
