/**
 * video-player-controls.jsx
 */

const VideoPlayerControls = ({
  progress,
  isPaused,
  onPlayPause,
  size = 28,
  width = 3,
}) => {
  const center = size / 2;
  const radius = center - width;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * (1 - progress);

  return (
    <div className="realtive flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="gray"
          strokeWidth={width}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="white"
          strokeWidth={width}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute">
        <button
          className="group cursor-pointer flex justify-center items-center"
          onClick={onPlayPause}
        >
          <div className="fill-white group-hover:fill-gray-300 transition-colors duration-200 ease-in-out ">
            {isPaused ? (
              <svg
                width="10px"
                height="10px"
                viewBox="-1 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-65.000000, -3803.000000)"
                    fill="white"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M18.074,3650.7335 L12.308,3654.6315 C10.903,3655.5815 9,3654.5835 9,3652.8985 L9,3645.1015 C9,3643.4155 10.903,3642.4185 12.308,3643.3685 L18.074,3647.2665 C19.306,3648.0995 19.306,3649.9005 18.074,3650.7335"
                        id="play-[#1000]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                width="10px"
                height="10px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 5L20 19C20 20.6569 18.6569 22 17 22L16 22C14.3431 22 13 20.6569 13 19L13 5C13 3.34314 14.3431 2 16 2L17 2C18.6569 2 20 3.34315 20 5Z"
                  fill="gray"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 2C9.65685 2 11 3.34315 11 5L11 19C11 20.6569 9.65685 22 8 22L7 22C5.34315 22 4 20.6569 4 19L4 5C4 3.34314 5.34315 2 7 2L8 2Z"
                  fill="gray"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerControls;
