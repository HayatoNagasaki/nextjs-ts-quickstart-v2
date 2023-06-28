import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  alt,
  className,
  ...rest
}) => {
  const firstLetter = alt ? alt.charAt(0).toUpperCase() : '';

  return (
    <div className={`avatar w-[48px] h-[48px] ${className}`} {...rest}>
      <div className="rounded-full w-full h-full">
        {imageUrl ? (
          <Image src={imageUrl} alt={alt} width={100} height={100} />
        ) : (
          <div className="flex items-center w-full h-full bg-gray-300">
            <span className="text-lg text-white mx-auto">{firstLetter}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
