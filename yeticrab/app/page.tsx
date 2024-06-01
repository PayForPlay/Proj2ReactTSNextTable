import type {Metadata} from 'next';
import {DataTable} from './components/dataTable';
export default function Home() {
    return (
        <div>
            <DataTable />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'YetiCrabTest',
};
