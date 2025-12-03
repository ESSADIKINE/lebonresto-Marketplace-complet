import { useEffect } from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/style.scss'
import '../styles/globals.css'
import '../styles/admin-theme.css'

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

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
        <title>LeBonResto Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp
