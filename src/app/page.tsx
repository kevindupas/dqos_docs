import Link from 'next/link'
import Image from 'next/image'
import dqosLogo from '@/images/dqos-logo_white.png'

const countries = [
  { code: 'zw', name: 'Zimbabwe', flag: '🇿🇼' },
  { code: 'sz', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'ga', name: 'Gabon', flag: '🇬🇦' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼' },
  { code: 'gm', name: 'Gambia', flag: '🇬🇲' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲' },
  { code: 'mz', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'bi', name: 'Burundi', flag: '🇧🇮' },
]

export default function CountrySelectPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-2xl">
        {/* Logo et titre */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <Image src={dqosLogo} alt="DQoS" className="h-12 w-auto" priority />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            DQoS Documentation
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Select your country to access the documentation
          </p>
        </div>

        {/* Grille des pays */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <Link
              key={country.code}
              href={`/${country.code}`}
              className="group block transform rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-200 hover:scale-105 hover:border-sky-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-600"
            >
              <div className="flex flex-col items-center space-y-3 text-center">
                <span className="text-5xl transition-transform duration-200 group-hover:scale-110">
                  {country.flag}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                    {country.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quality of Service monitoring solution for mobile networks
          </p>
        </div>
      </div>
    </div>
  )
}
