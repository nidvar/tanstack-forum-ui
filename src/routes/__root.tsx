import { 
    HeadContent, 
    Outlet, 
    createRootRouteWithContext 
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import Header from '../components/Header';

type RouterContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound
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

function NotFound(){
    return (
        <>
            <div className='main center'>
                <h1>Page Not Found</h1>
                <Link to='/' className='link-button'>HOME</Link>
            </div>
        </>
    )
}