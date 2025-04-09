function Loader() {
    return (
        <>
            <div
                className="h-full w-full flex justify-center items-center absolute top-0 left-0 z-50 backdrop-blur-lg">
                <div className="ripple-loader"></div>
            </div>

            <style>{`
        .ripple-loader {
          position: relative;
          width: 50px;
          height: 50px;
        }

        .ripple-loader::before,
        .ripple-loader::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 4px solid #3b82f6; /* Tailwind blue-500 */
          animation: rippleAnim 1.2s infinite ease-out;
        }

        .ripple-loader::after {
          animation-delay: 0.6s;
        }

        @keyframes rippleAnim {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
}

export default Loader;
