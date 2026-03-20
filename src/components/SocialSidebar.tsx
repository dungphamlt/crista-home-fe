'use client';

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/CristaaHome',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: '#1877F2',
  },
  {
    href: 'https://zalo.me/0962453366',
    label: 'Zalo',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.42 1.26 4.85L2 22l5.15-1.26A9.87 9.87 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.67 0-3.26-.5-4.57-1.35l-.32-.19-3.32.81.84-3.24-.2-.33A7.87 7.87 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    color: '#0068FF',
  },
  {
    href: 'https://shopee.vn',
    label: 'Shopee',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.2 3.4H6.8L3 8.2v12.6h18V8.2l-3.8-4.8zM12 18c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
      </svg>
    ),
    color: '#EE4D2D',
  },
  {
    href: 'https://www.tiktok.com',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
    color: '#000000',
  },
  {
    href: 'tel:0962453366',
    label: 'Hotline',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    color: '#25D366',
  },
];

export function SocialSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 pl-2">
      {SOCIAL_LINKS.map(({ href, label, icon, color }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
