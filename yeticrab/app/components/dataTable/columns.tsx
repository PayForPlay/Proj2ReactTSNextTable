///columns.tsx
'use client';
import React from 'react';
import {Link} from '@gravity-ui/uikit';
import {linkClick} from './dataTable';
import {formatDate} from '../../utils/utils';

export const columns = [
    {
        id: 'numReq',
        name: 'Номер заявки',
        width: 100,
    },
    {
        id: 'dateTimeReq',
        name: 'Время заявки',
        width: 100,
        template: (e) => <div>{formatDate(e.dateTimeReq)}</div>,
    },
    {
        id: 'clientFirm',
        name: 'Фирма',
        width: 100,
    },
    {
        id: 'fioTrans',
        name: 'ФИО перевозчика',
        width: 100,
    },
    {
        id: 'phoneTrans',
        name: 'Телефон перевозчика',
        width: 100,
    },
    {
        id: 'comments',
        name: 'Комментарии',
        width: 100,
    },
    {
        id: 'status',
        name: 'Статус',
        width: 100,
    },
    {
        id: 'linkTrans',
        name: 'Код сети',
        width: 100,
        template: (e) => (
            <Link view="normal" onClick={linkClick(e.linkTrans)}>
                https://ati.su/firms/{e.linkTrans}/info
            </Link>
        ),
    },
];
