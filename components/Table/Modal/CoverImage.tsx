
import React from 'react';

interface CoverImageProps {
  nsfw: boolean,
  url: string,
  title: string
}

export const CoverImage = ({ nsfw, url, title }: CoverImageProps) => {
  return (
    <div id="cf2" className="relative  h-80 w-52" style={{ margin: '0 auto' }}>
      <img style={{ left: '0' }} className="absolute" src={url} alt={title}/>
      {
        nsfw && <img style={{
          left: '0', transition: 'opacity 0.5s ease-in-out'
        }} className="absolute hover:opacity-0 cursor-pointer" src="/nsfw_warning.jpg" />
      }
    </div>
  )
}
