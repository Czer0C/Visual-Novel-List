/* eslint-disable no-nested-ternary */

import { useState } from 'react';

import Image from 'next/image';

import Tooltip from '@/components/Tooltip';
import { Nullable } from '@/utils/types';

interface Props {
  src: Nullable<string>;
  alt: string;
  width?: number;
  height?: number;
  nsfw: boolean;
}
const CoverImage = ({
  src,
  alt,
  width = 70,
  height = 90,
  nsfw = false,
}: Props) => {
  const [show, setShow] = useState(false);

  const Img = () =>
    src ? (
      <Image
        src={src}
        alt={alt}
        layout="intrinsic"
        width={width}
        height={height}
        className={nsfw && !show ? 'blur-sm' : 'blur-none'}
        objectFit="contain"
        onClick={() => setShow(!show)}
      />
    ) : null;

  return nsfw ? (
    <Tooltip content={`${show ? 'hide' : 'show'} nsfw cover`}>
      <span>
        <Img />
      </span>
    </Tooltip>
  ) : (
    <Img />
  );
};

CoverImage.displayName = 'CoverImage';

export default CoverImage;
