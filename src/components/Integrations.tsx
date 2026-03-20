'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, useInView } from 'framer-motion'

const integrationCategories = [
  {
    name: 'CRM',
    description: 'Native CRM bridges -- the #1 most-requested feature in the AI agent market',
    integrations: [
      { 
        name: 'Salesforce', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12.5 2C10.6 2 9 3.6 9 5.5S10.6 9 12.5 9 16 7.4 16 5.5 14.4 2 12.5 2zM17.5 8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zM6.5 8C4.6 8 3 9.6 3 11.5S4.6 15 6.5 15 10 13.4 10 11.5 8.4 8 6.5 8zM12.5 12C10.6 12 9 13.6 9 15.5S10.6 19 12.5 19s3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" fill="#00a1e0"/>
          </svg>
        )
      },
      { 
        name: 'HubSpot', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#ff7a59"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        )
      },
      { 
        name: 'Pipedrive', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="20" height="12" rx="2" fill="#1a73e8"/>
            <circle cx="7" cy="12" r="2" fill="white"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
            <circle cx="17" cy="12" r="2" fill="white"/>
          </svg>
        )
      },
      { 
        name: 'Zoho', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M2 8h20v8H2V8z" fill="#d91e18"/>
            <circle cx="7" cy="12" r="2" fill="white"/>
            <circle cx="17" cy="12" r="2" fill="white"/>
          </svg>
        )
      }
    ],
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Communication',
    description: 'Multi-channel messaging and collaboration platforms',
    integrations: [
      { 
        name: 'Slack', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M5.042 15.165c-1.164 0-2.208-.972-2.208-2.208 0-1.236 1.044-2.208 2.208-2.208h2.208v2.208c0 1.236-1.044 2.208-2.208 2.208zm0-5.625c-1.164 0-2.208-.972-2.208-2.208C2.834 6.096 3.878 5.124 5.042 5.124c1.164 0 2.208.972 2.208 2.208v2.208H5.042z" fill="#36c5f0"/>
            <path d="M8.957 15.165c-1.164 0-2.208-.972-2.208-2.208V5.042c0-1.164.972-2.208 2.208-2.208s2.208 1.044 2.208 2.208v7.915c0 1.236-1.044 2.208-2.208 2.208z" fill="#2eb67d"/>
            <path d="M8.957 18.958c1.164 0 2.208.972 2.208 2.208 0 1.236-1.044 2.208-2.208 2.208-1.164 0-2.208-.972-2.208-2.208v-2.208h2.208z" fill="#ecb22e"/>
            <path d="M15.043 18.958c1.164 0 2.208.972 2.208 2.208 0 1.236-1.044 2.208-2.208 2.208h-2.208v-2.208c0-1.236 1.044-2.208 2.208-2.208z" fill="#e01e5a"/>
          </svg>
        )
      },
      { 
        name: 'Microsoft Teams', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M21 8v8c0 1.1-.9 2-2 2h-6V8h8z" fill="#5059c9"/>
            <path d="M15 8v10H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2z" fill="#7b83eb"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        )
      },
      { 
        name: 'WhatsApp', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" fill="#25d366"/>
          </svg>
        )
      },
      { 
        name: 'Telegram', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#0088cc"/>
            <path d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z" fill="white"/>
          </svg>
        )
      },
      { 
        name: 'Discord', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z" fill="#5865f2"/>
          </svg>
        )
      },
      { 
        name: 'Email (SMTP/IMAP)', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L12 13L4 6h16z" fill="#ea4335"/>
            <path d="M20 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6l8 7 8-7z" fill="#34a853" fillOpacity="0.8"/>
          </svg>
        )
      }
    ],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    name: 'Productivity',
    description: 'Document management and workspace integration',
    integrations: [
      { 
        name: 'Gmail', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.887.732-1.619 1.636-1.619h.273L12 9.548l10.091-5.71h.273c.904 0 1.636.732 1.636 1.619z" fill="#ea4335"/>
          </svg>
        )
      },
      { 
        name: 'Google Docs', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M14.727 3l5.273 5.273V21H4V3h10.727z" fill="#4285f4"/>
            <path d="M14.727 3v5.273h5.273" fill="#1a73e8" fillOpacity="0.6"/>
            <rect x="6" y="10" width="12" height="1" fill="white"/>
            <rect x="6" y="13" width="12" height="1" fill="white"/>
            <rect x="6" y="16" width="8" height="1" fill="white"/>
          </svg>
        )
      },
      { 
        name: 'Google Sheets', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M14.727 3l5.273 5.273V21H4V3h10.727z" fill="#0f9d58"/>
            <path d="M14.727 3v5.273h5.273" fill="#0d7c47" fillOpacity="0.6"/>
            <rect x="6" y="10" width="5" height="3" fill="white" stroke="#0f9d58"/>
            <rect x="11" y="10" width="5" height="3" fill="white" stroke="#0f9d58"/>
            <rect x="6" y="13" width="5" height="3" fill="white" stroke="#0f9d58"/>
            <rect x="11" y="13" width="5" height="3" fill="white" stroke="#0f9d58"/>
          </svg>
        )
      },
      { 
        name: 'Google Calendar', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#4285f4"/>
            <path d="M5 8h14v2H5z" fill="white"/>
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">15</text>
          </svg>
        )
      },
      { 
        name: 'Google Drive', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L2.5 15h7L19.5 15 12 0z" fill="#0066da"/>
            <path d="M2.5 15h7l4.5 7.5H7L2.5 15z" fill="#00ac47"/>
            <path d="M19.5 15L12 0l7.5 15z" fill="#ea4335"/>
          </svg>
        )
      },
      { 
        name: 'Microsoft 365', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="1" width="9" height="9" fill="#ea4335"/>
            <rect x="1" y="12" width="9" height="11" fill="#00a1f1"/>
            <rect x="12" y="1" width="11" height="9" fill="#ffba00"/>
            <rect x="12" y="12" width="11" height="11" fill="#7cbb00"/>
          </svg>
        )
      },
      { 
        name: 'Notion', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.047-.56.28-.374.466l1.823 1.447zm.793 2.474v13.455c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.262c0-.606-.233-.933-.747-.887l-15.177.887c-.56.047-.748.327-.748.42zm14.337.653c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.222-.187z" fill="#000"/>
          </svg>
        )
      },
      { 
        name: 'Confluence', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M1.684 14.4c-.654 1.075-.84 2.207-.84 3.385 0 4.066 3.323 7.389 7.389 7.389 1.6 0 3.061-.654 4.136-1.7l6.565-7.528c-.746.326-1.587.513-2.521.513-3.69 0-6.752-2.989-6.752-6.704 0-1.074.28-2.055.746-2.988L1.684 14.4zm20.632-4.8c.654-1.075.84-2.207.84-3.385C23.156 2.149 19.833-.174 15.767-.174c-1.6 0-3.061.654-4.136 1.7L5.066 9.054c.746-.326 1.587-.513 2.521-.513 3.69 0 6.752 2.989 6.752 6.704 0 1.074-.28 2.055-.746 2.988L22.316 9.6z" fill="#1565c0"/>
          </svg>
        )
      }
    ],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Marketing',
    description: 'Social media and content marketing platforms',
    integrations: [
      { 
        name: 'Instagram', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagram)"/>
            <circle cx="12" cy="12" r="4" fill="white"/>
            <circle cx="18" cy="6" r="1.5" fill="white"/>
            <defs>
              <linearGradient id="instagram" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#f09433" offset="0%"/>
                <stop stopColor="#e6683c" offset="25%"/>
                <stop stopColor="#dc2743" offset="50%"/>
                <stop stopColor="#cc2366" offset="75%"/>
                <stop stopColor="#bc1888" offset="100%"/>
              </linearGradient>
            </defs>
          </svg>
        )
      },
      { 
        name: 'TikTok', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#000"/>
          </svg>
        )
      },
      { 
        name: 'YouTube', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#ff0000"/>
          </svg>
        )
      },
      { 
        name: 'Facebook', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877f2"/>
          </svg>
        )
      },
      { 
        name: 'LinkedIn', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077b5"/>
          </svg>
        )
      },
      { 
        name: 'Twitter/X', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000"/>
          </svg>
        )
      }
    ],
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    name: 'Development',
    description: 'Code repositories and deployment platforms',
    integrations: [
      { 
        name: 'GitHub', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#333"/>
          </svg>
        )
      },
      { 
        name: 'GitLab', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0805 6.0805 0 0 0 2.0119 7.0063L11.9997 24l9.5878-7.3978a6.0815 6.0815 0 0 0 2.0119-7.0095z" fill="#fc6d26"/>
          </svg>
        )
      },
      { 
        name: 'Vercel', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 1L24 22H0L12 1z" fill="#000"/>
          </svg>
        )
      },
      { 
        name: 'AWS', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M6.76 10.508c0 .65.13 1.172.395 1.562.265.395.635.59 1.105.59.47 0 .84-.195 1.105-.59.26-.39.395-.912.395-1.562 0-.65-.135-1.172-.395-1.567-.265-.39-.635-.585-1.105-.585-.47 0-.84.195-1.105.585-.265.395-.395.917-.395 1.567zm7.9 1.8c0 .325-.26.59-.585.59s-.585-.265-.585-.59v-3.6c0-.325.26-.585.585-.585s.585.26.585.585v3.6z" fill="#ff9900"/>
            <path d="M8.76 19.28c-3.51 0-6.76-1.3-6.76-1.3l.35-1.04s3.12 1.17 6.41 1.17c2.6 0 5.46-.78 5.46-3.64 0-1.56-1.43-2.08-2.73-2.34l-2.6-.52c-2.34-.46-3.9-1.95-3.9-4.16 0-3.51 3.25-5.2 6.5-5.2 2.99 0 5.59.91 5.59.91l-.39 1.04s-2.47-.78-5.2-.78c-2.34 0-4.55 1.04-4.55 3.25 0 1.56 1.17 1.95 2.6 2.21l2.6.52c2.47.52 4.03 1.95 4.03 4.42 0 4.16-3.9 5.72-7.41 5.72z" fill="#232f3e"/>
          </svg>
        )
      },
      { 
        name: 'GCP', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L8.5 3.5l3.5 3.5-3.5 3.5L12 14l3.5-3.5L12 7l3.5-3.5L12 0z" fill="#4285f4"/>
            <path d="M12 10l7-7 2.5 2.5L14 13l-2-3z" fill="#34a853"/>
            <path d="M12 10l-7-7L2.5 5.5 10 13l2-3z" fill="#ea4335"/>
            <path d="M12 14v10l-7-7 2.5-2.5L12 14z" fill="#fbbc05"/>
            <path d="M12 14v10l7-7-2.5-2.5L12 14z" fill="#34a853"/>
          </svg>
        )
      },
      { 
        name: 'Azure', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M5.95 17.5L12 2l8.05 15.5H5.95z" fill="#0078d4"/>
            <path d="M2 22h20l-4-4.5H6L2 22z" fill="#0078d4" fillOpacity="0.7"/>
          </svg>
        )
      }
    ],
    gradient: 'from-orange-500 to-red-600'
  },
  {
    name: 'Finance',
    description: 'Accounting and payment processing systems',
    integrations: [
      { 
        name: 'QuickBooks', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#0077c5"/>
            <path d="M8 8h8v8H8V8zm1 1v6h6V9H9z" fill="white"/>
            <rect x="10" y="10" width="4" height="4" fill="#0077c5"/>
          </svg>
        )
      },
      { 
        name: 'Xero', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#13b5ea"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2"/>
          </svg>
        )
      },
      { 
        name: 'Stripe', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#635bff"/>
          </svg>
        )
      },
      { 
        name: 'Square', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#3e4348"/>
            <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
            <rect x="8" y="8" width="8" height="8" rx="1" fill="#3e4348"/>
          </svg>
        )
      }
    ],
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    name: 'AI Models',
    description: 'Multiple AI providers for flexibility and redundancy',
    integrations: [
      { 
        name: 'OpenAI GPT', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#74aa9c"/>
            <path d="M12 6l2 4h4l-2 4-2 4-2-4-4-2 2-4 2-2z" fill="white"/>
          </svg>
        )
      },
      { 
        name: 'Anthropic Claude', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#d4a574"/>
            <path d="M9 8h6l-3 8-3-8z" fill="white"/>
            <circle cx="12" cy="10" r="1" fill="#d4a574"/>
          </svg>
        )
      },
      { 
        name: 'Google Gemini', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#4285f4"/>
            <path d="M8 8l8 8M16 8L8 16M12 4v16M4 12h16" stroke="white" strokeWidth="1"/>
          </svg>
        )
      },
      { 
        name: 'Local/Private (Ollama)', 
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#333"/>
            <rect x="8" y="8" width="8" height="8" rx="1" fill="white"/>
            <circle cx="10" cy="10" r="1" fill="#333"/>
            <circle cx="14" cy="14" r="1" fill="#333"/>
          </svg>
        )
      }
    ],
    gradient: 'from-cyan-500 to-blue-600'
  }
]

export default function Integrations() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="integrations" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-neutral-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
      
      {/* Aurora orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/[0.08] blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.06] blur-[120px]"
      />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-heading mb-6">
              <span className="text-white">Your Tools.</span>{' '}
              <span className="gradient-text">Our Orchestration.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext mb-8">
              We don't just connect to your tools -- we orchestrate them. Every integration runs through our secure MCP (Model Context Protocol) framework, giving your AI agents the ability to read, write, and act across your entire tech stack.
            </p>
          </motion.div>
        </div>

        {/* Integration Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {integrationCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient}`} />
                  <h3 className="text-xl font-bold text-white font-display">{category.name}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Integrations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.integrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.02) }}
                      className="group/item cursor-pointer"
                    >
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-200">
                        <div className="flex-shrink-0">{integration.icon}</div>
                        <span className="text-xs text-slate-300 group-hover/item:text-white transition-colors duration-200 truncate">
                          {integration.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MCP Framework Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative max-w-4xl mx-auto p-8 rounded-2xl border border-brand-cyan/20 bg-gradient-to-br from-brand-cyan/[0.05] to-brand-purple/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/[0.03] to-brand-purple/[0.03] rounded-2xl" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
                <svg className="w-4 h-4 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-sm font-semibold text-brand-cyan">MCP Framework</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                Model Context Protocol
              </h3>
              <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Every tool integration is built on MCP, providing standardized, secure, and auditable access patterns. Your AI agents don't just use tools -- they understand them, coordinate between them, and maintain context across your entire business ecosystem.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}