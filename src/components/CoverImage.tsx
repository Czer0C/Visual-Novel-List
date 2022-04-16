/* eslint-disable no-nested-ternary */

import Image from 'next/image';

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
}: Props) =>
  src ? (
    <Image
      src={src}
      alt={alt}
      layout="intrinsic"
      width={width}
      height={height}
      className={nsfw ? 'blur-sm hover:blur-none' : ''}
      objectFit="contain"
    />
  ) : null;

CoverImage.displayName = 'CoverImage';

export default CoverImage;
