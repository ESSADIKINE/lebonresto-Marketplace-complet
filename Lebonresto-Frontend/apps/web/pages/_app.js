import { useEffect } from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/style.scss'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let bootstrapModule

    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((module) => {
      bootstrapModule = module.default
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        if (bootstrapModule?.Tooltip) {
          new bootstrapModule.Tooltip(tooltipTriggerEl)
        }
      })
    })

    return () => {
      if (bootstrapModule?.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
          const existing = bootstrapModule.Tooltip.getInstance(tooltipTriggerEl)
          existing?.dispose()
        })
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>LeBonResto - Marketplace de Restaurants au Maroc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
