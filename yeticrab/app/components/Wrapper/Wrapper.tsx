//Wrapper.tsx

'use client';

import React from 'react';
import block from 'bem-cn-lite';
import {Button, Icon, Theme, ThemeProvider} from '@gravity-ui/uikit';
import {MagicWand, Moon, Sun} from '@gravity-ui/icons';
import './Wrapper.scss';
import {useAppDispatch} from '../../../lib/hooks';
import {changePriv} from '../../../lib/features/app/appSlice';

const b = block('wrapper');

const DARK = 'dark';
const LIGHT = 'light';
const DEFAULT_THEME = DARK;
export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export type AppProps = {
    children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const [theme, setTheme] = React.useState<Theme>(DEFAULT_THEME);

    const isDark = theme === DARK;

    return (
        <ThemeProvider theme={theme}>
            <div className={b()}>
                <div className={b('headButtons')}>
                    <div className={b('theme-button')}>
                        <Button
                            size="l"
                            view="outlined"
                            onClick={() => {
                                setTheme(isDark ? LIGHT : DARK);
                            }}
                        >
                            <Icon data={isDark ? Sun : Moon} />
                        </Button>
                    </div>
                    <div className={b('admin-button')}>
                        <Button
                            size="l"
                            view="outlined"
                            onClick={() => {
                                dispatch(changePriv());
                            }}
                        >
                            <Icon data={MagicWand} />
                        </Button>
                    </div>
                </div>
                <div className={b('layout')}>
                    <div className={b('header')}>
                        <div className={b('logo')}>
                            <div className={b('gravity-logo', {dark: isDark})} />
                            <div className={b('next-logo', {dark: isDark})} />
                        </div>
                    </div>
                    <div className={b('content')}>{children}</div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="ru">
            <body className={DEFAULT_BODY_CLASSNAME}>
                <Wrapper>{children}</Wrapper>
            </body>
        </html>
    );
}
