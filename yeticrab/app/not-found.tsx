'use client';

import {Link} from '@gravity-ui/uikit';

export default function NotFound() {
    return (
        <div>
            <h2>Не найдено</h2>
            <p>По запросу ресурса не найдено</p>
            <Link href="/">Вернутся на главную</Link>
        </div>
    );
}
