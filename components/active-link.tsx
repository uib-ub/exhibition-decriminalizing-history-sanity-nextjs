'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavigationLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string;
  style?: React.CSSProperties;
};

export default function NavigationLink({
  href,
  className,
  activeClassName = 'italic underline underline-offset-4',
  style,
  ...rest
}: NavigationLinkProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        className,
        isActive && activeClassName
      )}
      style={style}
      href={href}
      {...rest}
    />
  );
}