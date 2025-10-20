import { 
    HeadContent, 
    Outlet, 
    createRootRouteWithContext 
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query'

import Header from '../components/Header';

type RouterContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

function RootLayout(){
    return (
        <>
            <HeadContent />
            <Header />
            <Outlet />
        </>
    )
}