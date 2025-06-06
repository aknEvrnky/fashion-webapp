import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ShopContextProvider } from './context/ShopContext';
import AppLayout from './Layouts/AppLayout.jsx';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        console.log('Inertia Props:', props); // Debug props

        root.render(
            <ShopContextProvider auth={props.initialPage.props.auth}>
                <App {...props} />
            </ShopContextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
