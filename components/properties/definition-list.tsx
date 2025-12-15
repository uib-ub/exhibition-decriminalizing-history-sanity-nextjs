import React from 'react';
import { cn } from '@/lib/utils';

interface DefinitionProps {
  children: React.ReactNode;
  className?: string;
}

interface TermProps {
  children: React.ReactNode;
  className?: string;
}

interface DetailsProps {
  children: React.ReactNode;
  className?: string;
}

const Definition: React.FC<DefinitionProps> & {
  Term: React.FC<TermProps>;
  Details: React.FC<DetailsProps>;
} = ({ children, className }) => {
  return (
    <dl className={cn('grid grid-cols-[2fr] md:grid-cols-[2fr] lg:grid-cols-[min-content_auto] items-baseline gap-x-5 md:gap-x-5 gap-y-2 md:gap-y-4', className)}>
      {children}
    </dl>
  );
};

const Term: React.FC<TermProps> = ({ children, className }) => {
  return (
    <dt className={cn('font-semibold pb-2 text-md md:text-lg lg:text-xl', className)}>
      {children}
    </dt>
  );
};

const Details: React.FC<DetailsProps> = ({ children, className }) => {
  return (
    <dd className={cn('flex flex-wrap gap-2 mb-0 lg:mb-0 ps-0 lg:ps-4 pb-4 font-light', className)}>
      {children}
    </dd>
  );
};

Definition.Term = Term;
Definition.Details = Details;

export default Definition;
