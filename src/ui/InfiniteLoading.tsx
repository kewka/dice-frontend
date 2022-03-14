import { ComponentProps, ReactNode, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

export type InfiniteLoadingProps = ComponentProps<'div'> & {
  hasMore?: boolean;
  loading?: boolean;
  onMore: () => any;
  loader?: ReactNode;
};

export function InfiniteLoading({
  hasMore,
  loading,
  onMore,
  loader,
  ...rest
}: InfiniteLoadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref, {});
  const isVisible = !!intersection?.isIntersecting;

  useEffect(() => {
    if (isVisible && hasMore && !loading) {
      onMore();
    }
  }, [hasMore, loading, isVisible, onMore]);

  return (
    <>
      {loading && loader}
      <div ref={ref} {...rest} />
    </>
  );
}
