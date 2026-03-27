'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const links = [
    {
      label: 'Courses',
      href: '/courses',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Hire Us!',
      href: 'https://stuffnthings.io/ai-agency',
    },
  ];

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'bg-slate-950/90 supports-[backdrop-filter]:bg-slate-950/80 border-slate-800 backdrop-blur-lg':
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="hover:bg-slate-800 rounded-md p-2 transition-colors">
          <WordmarkIcon className="h-4 text-white" />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a 
              key={link.label} 
              className={buttonVariants({ 
                variant: 'ghost',
                className: 'text-slate-300 hover:text-white hover:bg-slate-800'
              })} 
              href={link.href}
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline" className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Get Started
          </Button>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>
      <MobileMenu open={open} className="flex flex-col justify-between gap-2">
        <div className="grid gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              className={buttonVariants({
                variant: 'ghost',
                className: 'justify-start text-slate-300 hover:text-white hover:bg-slate-800',
              })}
              href={link.href}
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white">
            Sign In
          </Button>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Get Started
          </Button>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-slate-950/95 supports-[backdrop-filter]:bg-slate-950/90 backdrop-blur-lg',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-slate-800 md:hidden',
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
          'size-full p-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export const WordmarkIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 120 24" fill="currentColor" {...props}>
    <text x="0" y="18" fontSize="16" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif">
      stuffnthings
    </text>
  </svg>
);