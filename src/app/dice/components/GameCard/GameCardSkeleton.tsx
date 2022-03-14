import { Skeleton, SkeletonProps } from '~/ui/Skeleton';

export type GameCardSkeletonProps = SkeletonProps & {
  details?: boolean;
};

export function GameCardSkeleton({ details, ...rest }: GameCardSkeletonProps) {
  return <Skeleton height={details ? 250 : 120} {...rest} />;
}
