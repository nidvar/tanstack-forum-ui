import { 
    HeadContent, 
    Outlet, 
    createRootRouteWithContext 
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import Header from '../components/Header';
import { AuthProvider } from '../store/authContext'

type RouterContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    head: () => ({
        meta: [{ title: 'Jarro - Forum' },]
    }),
    component: RootLayout,
    notFoundComponent: NotFound
})

function RootLayout(){
    return (
        <>
            <AuthProvider>
                <HeadContent />
                <Header />
                <Outlet />
            </AuthProvider>
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