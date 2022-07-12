import React from "react";

export const YoutubeEmbed = ({
   embedId,
   embedWidth,
   embedHeight,
   allowFullScreen,
   autoPlay,
}) => {
   return (
      <div className="youtube-video">
         <iframe
            width={embedWidth || "100%"}
            height={embedHeight || "480px"}
            src={`https://www.youtube.com/embed/${embedId}?autoplay=${autoPlay ? 1 : 0}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={allowFullScreen}
         />
      </div>
   );
};
