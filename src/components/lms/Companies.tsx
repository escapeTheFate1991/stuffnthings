import { useEffect, useRef, useState } from 'react'

export default function Companies() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const companies = [
    { name: 'Nike', svg: (
      <svg viewBox="0 0 100 35" className="h-6 fill-current">
        <path d="M22.5 2.5c-5.5 0-10.8 2-14.8 5.6C3.7 11.7 1.5 16.3 1.5 21.5c0 3.8 1.2 7.4 3.4 10.4 2.2 3 5.3 5.3 8.9 6.5 3.6 1.2 7.5 1.2 11.1 0 3.6-1.2 6.7-3.5 8.9-6.5 2.2-3 3.4-6.6 3.4-10.4 0-3.8-1.2-7.4-3.4-10.4-2.2-3-5.3-5.3-8.9-6.5-1.8-.6-3.7-.9-5.6-.9-.5 0-1 0-1.5.1-.5.1-1 .2-1.5.4-.5.2-1 .4-1.4.7-.5.3-.9.6-1.3 1-.4.4-.8.8-1.1 1.3-.3.5-.6 1-.8 1.5-.2.5-.4 1.1-.5 1.7-.1.6-.2 1.2-.2 1.8 0 1.2.2 2.4.6 3.5.4 1.1 1 2.1 1.8 3 .8.9 1.7 1.6 2.8 2.1 1.1.5 2.3.8 3.5.8.8 0 1.6-.1 2.4-.4.8-.3 1.5-.7 2.1-1.2.6-.5 1.1-1.2 1.5-1.9.4-.7.6-1.5.6-2.3 0-.6-.1-1.2-.3-1.8-.2-.6-.5-1.1-.9-1.5-.4-.4-.9-.8-1.4-1-.5-.3-1.1-.4-1.7-.4-.4 0-.8.1-1.2.2-.4.1-.7.3-1 .6-.3.3-.5.6-.7 1-.2.4-.2.8-.2 1.2 0 .3.1.6.2.9.1.3.3.5.5.7.2.2.5.4.8.5.3.1.6.2.9.2.2 0 .4 0 .6-.1.2-.1.4-.2.5-.3.1-.1.3-.3.3-.5.1-.2.1-.4.1-.6 0-.2 0-.4-.1-.6-.1-.2-.2-.3-.3-.5-.1-.1-.3-.3-.5-.3-.2-.1-.4-.1-.6-.1-.1 0-.2 0-.3.1-.1 0-.2.1-.2.2 0 .1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2 0 .3-.1.1 0 .1-.1.2-.2 0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.1-.1-.2-.2-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1 0-.2.1-.2.2 0 .1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2 0 .3-.1.1 0 .1-.1.2-.2 0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.1-.1-.2-.2-.1 0-.2-.1-.3-.1z"/>
      </svg>
    )},
    { name: 'Adobe', svg: (
      <svg viewBox="0 0 100 30" className="h-5 fill-current">
        <path d="M20.4 0H0v30L20.4 0zm59.2 0H100v30L79.6 0zM50 11.2L63.4 30H52.8l-4-6.2H37.2L50 11.2z"/>
      </svg>
    )},
    { name: 'Mailchimp', svg: (
      <svg viewBox="0 0 120 30" className="h-6 fill-current">
        <path d="M10.5 15c0-2.5-2-4.5-4.5-4.5S1.5 12.5 1.5 15s2 4.5 4.5 4.5 4.5-2 4.5-4.5zm8 0c0-2.5-2-4.5-4.5-4.5S9.5 12.5 9.5 15s2 4.5 4.5 4.5 4.5-2 4.5-4.5zm8 0c0-2.5-2-4.5-4.5-4.5S17.5 12.5 17.5 15s2 4.5 4.5 4.5 4.5-2 4.5-4.5zm8 0c0-2.5-2-4.5-4.5-4.5S25.5 12.5 25.5 15s2 4.5 4.5 4.5 4.5-2 4.5-4.5z"/>
      </svg>
    )},
    { name: 'HubSpot', svg: (
      <svg viewBox="0 0 100 28" className="h-6 fill-current">
        <path d="M8 0C3.6 0 0 3.6 0 8c0 3.1 1.8 5.8 4.4 7.2V28l6.4-5.6A8 8 0 1 0 8 0zm40 4h4v20h-4V4zm-16 6a4 4 0 0 1 4-4h8v4h-8v4h6a4 4 0 0 1 4 4v6h-4v-6h-6v6h-4V10zm36 0a4 4 0 0 1 4-4h8v4h-8v4h6a4 4 0 0 1 4 4v6h-4v-6h-6v6h-4V10zM68 4h4v20h-4V4z"/>
      </svg>
    )},
    { name: 'Airbnb', svg: (
      <svg viewBox="0 0 100 32" className="h-6 fill-current">
        <path d="M50 0c-2 0-3.8 1.2-4.8 3-1 1.8-2.2 4.8-3.6 8.8-1.4 4-2.4 7-3 9-1 3.6-1.6 6.4-1.6 8.4 0 2.2.6 4 1.8 5.4 1.2 1.4 2.8 2.2 4.6 2.2 1.2 0 2.4-.4 3.4-1.2 1-.8 2-1.8 2.8-3 .8 1.2 1.8 2.2 2.8 3 1 .8 2.2 1.2 3.4 1.2 1.8 0 3.4-.8 4.6-2.2 1.2-1.4 1.8-3.2 1.8-5.4 0-2-.6-4.8-1.6-8.4-.6-2-1.6-5-3-9-1.4-4-2.6-7-3.6-8.8C53.8 1.2 52 0 50 0z"/>
      </svg>
    )},
    { name: 'Verizon', svg: (
      <svg viewBox="0 0 100 20" className="h-4 fill-current">
        <path d="M0 0h40v20H0z" fill="currentColor"/>
        <path d="M5 5h5v10H5zM15 5h5v10h-5zM25 5h5v10h-5z" fill="#0a0a0a"/>
        <text x="50" y="14" fontSize="12" fontWeight="bold" fill="currentColor">Verizon</text>
      </svg>
    )},
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <p 
          className={`text-center text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Companies Employing Our Students
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className={`text-zinc-500 hover:text-zinc-300 transition-all duration-500 hover:scale-110 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {company.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}