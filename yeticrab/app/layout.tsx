import type {ReactNode} from 'react';
import {StoreProvider} from './StoreProvider';
import {DEFAULT_BODY_CLASSNAME, Wrapper} from './components/Wrapper/Wrapper';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.css';
interface Props {
    readonly children: ReactNode;
}

export default function RootLayout({children}: Props) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={DEFAULT_BODY_CLASSNAME}>
                    <Wrapper>{children}</Wrapper>
                </body>
            </html>
        </StoreProvider>
    );
}
