'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    const currentLocale = params?.locale as string;
    const newPath = pathname.replace(`/${currentLocale}`, '');
    startTransition(() => {
      router.replace(newPath, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        'relative text-white font-bold bg-pink-500',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent text-white font-bold"
        // @ts-ignore fieldSizing is a new CSS property
        style={{ fieldSizing: 'content' }}
        value={params?.locale as string ?? defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}