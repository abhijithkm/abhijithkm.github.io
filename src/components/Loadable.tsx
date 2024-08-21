import { Suspense } from 'react';
import LoadingScreen from './LoadingScreen';

export const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    )
}
