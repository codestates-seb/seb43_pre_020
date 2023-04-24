import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import GeneralLayout from '../layout/GeneralLayout'
import Spinner from '../components/Spinner'
import { routerData } from './routerData'

const router = createBrowserRouter(
  routerData.reduce((prev, router) => {
    const { path, element, label } = router
    return label === '404'
      ? [...prev, { path, element }]
      : [
          ...prev,
          {
            path,
            element: (
              <GeneralLayout>
                <Suspense fallback={<Spinner label={label} />}>{element}</Suspense>
              </GeneralLayout>
            ),
          },
        ]
  }, [])
)

export default router
