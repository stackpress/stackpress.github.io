import type { ReactNode } from 'react';
import { useLanguage, Translate } from 'r22n';

export function Header1({ children }: { children: string }) {
  const { _ } = useLanguage();
  return (
    <h1 className="px-px-10 px-fs-24 font-bold px-pt-10 px-pb-20">
      {_(children)}
    </h1>
  );
}

export function Header2({ children }: { children: string }) {
  const { _ } = useLanguage();
  return (
    <h2 className="px-px-10 px-fs-16 font-bold px-pt-60">
      {_(children)}
    </h2>
  );
}

export function Header3({ children }: { children: string }) {
  const { _ } = useLanguage();
  return (
    <h3 className="px-px-10 font-normal uppercase px-py-20">
      {_(children)}
    </h3>
  );
}

export function Paragraph({ children }: { children: string }) {
  return (
    <p className="px-px-10 px-lh-30 px-py-20 block">
      <Translate>{children}</Translate>
    </p>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <span className="theme-white theme-bg-black inline-block px-px-3 px-mb-10 rounded">
      {children}
    </span>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <div className="theme-white theme-bg-black px-p-10 px-mx-10 px-mb-10 rounded">
      {children}
    </div>
  );
}

export function Example({ children }: { children: string }) {
  return (
    <div className="px-px-10">
      <pre className="theme-white theme-bg-black px-m-0 px-p-10 rounded px-w-100-0 overflow-x-auto"><code>{children}</code></pre>
    </div>
  );
}

export function Nav({ next, prev }: { 
  next?: { text: string, href: string },
  prev?: { text: string, href: string } 
}) {
  const { _ } = useLanguage();
  return (
    <nav className="flex px-px-10">
      {prev ? (
        <a className="theme-primary px-py-40" href={prev.href}>
          <i className="fas fa-fw fa-chevron-left" />
          {_(prev.text)}
        </a>
      ): null}
      {next ?(
        <a className="theme-primary flex-grow text-right px-py-40" href={next.href}>
          {_(next.text)}
          <i className="fas fa-fw fa-chevron-right" />
        </a>
      ): null}
    </nav>
  );
}

