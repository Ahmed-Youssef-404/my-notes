type SpinnerTypes = {
  height?: number;
  color?: string;
};

const LoadingSpinner = ({ height = 20, color = "white" }: SpinnerTypes) => {
  return (
    <>
      <style>
        {`
          .loader {
              width: ${height}px;
              height: ${height}px;
              border: 3px solid ${color};
              border-bottom-color: transparent;
              border-radius: 50%;
              display: inline-block;
              box-sizing: border-box;
              animation: rotation .85s linear infinite;
          }

          @keyframes rotation {
              0% {
                  transform: rotate(0deg);
              }

              100% {
                  transform: rotate(360deg);
              }
          }
        `}
      </style>

      <span className="loader"></span>
    </>
  );
};

export default LoadingSpinner;
