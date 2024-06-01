///dataTable.tsx
'use client';

// Импорт компонента модального окна для редактирования данных
import EditDataModal from './DataModal';

// Импорт необходимых хуков и компонентов из React и пакетов сторонних разработчиков
import React, {useEffect, useState} from 'react';
import block from 'bem-cn-lite';
import {
    Button,
    Modal,
    Pagination,
    PaginationProps,
    RadioButton,
    RadioButtonOption,
    Select,
    Table,
    TableActionConfig,
    TableDataItem,
    TextInput,
    withTableActions,
} from '@gravity-ui/uikit';

// Импорт стилей компонента
import './dataTable.module.css';

// Импорт определения столбцов для таблицы
import {columns} from './columns';

// Импорт селектора привилегий и хука для использования его значения
import {selectPrivilege} from '../../../lib/features/app/appSlice';
import {useAppSelector} from '../../../lib/hooks';

// Импорт функций API для получения всех данных и удаления определенной записи
import {getAll, remove} from '../../api/data';
import {relative} from 'path';
import {abort} from 'process';

// Создание блока стилей
const b = block('data-table');

// Инициализация компонента таблицы с действиями
const MyTable = withTableActions(Table);

// Определение вариантов фильтрации по статусу
const options: RadioButtonOption[] = [
    {value: 'All', content: 'Все'},
    {value: 'NonCompleted', content: 'Не завершенные'},
    {value: 'Completed', content: 'Завершеные'},
];

// Функция компонента таблицы с функциональными возможностями
function FunctionalDataTable() {
    // Получение значения привилегии из глобального состояния приложения
    const Privilege = useAppSelector(selectPrivilege);

    // Состояния для фильтрации и управления данными
    const [state, setState] = React.useState({page: 1, pageSize: 10});
    const [filterText, setFilterText] = useState('');
    const [selectedColumn, setSelectedColumn] = useState(columns[0].id);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [chosenRow, setChosenRow] = useState(1);

    // Функция обновления данных после операций добавления и обновления
    function handleDataUpdate(response, responseType: string) {
        switch (responseType) {
            case 'create': {
                const updatedApplicationsCreate = [...applications, response];
                setApplications(updatedApplicationsCreate);
                setFilteredApplications(updatedApplicationsCreate);
                break;
            }
            case 'update': {
                setApplications((prevApplications) => {
                    const updatedApplications = prevApplications.map((application) => {
                        if (application._id === response._id) {
                            return response;
                        }
                        return application;
                    });
                    setFilteredApplications(updatedApplications);
                    return updatedApplications;
                });
                break;
            }
            default:
                break;
        }
    }

    // Эффект для загрузки данных и их обновления
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataArray = await getAll();
                setApplications(dataArray);
                setFilteredApplications(dataArray);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Загрузка данных сразу после монтирования компонента

        const interval = setInterval(fetchData, 600000); // Обновление данных каждую минуту

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, []);

    // Эффект для фильтрации данных при изменении статуса или текста фильтра
    useEffect(() => {
        const filteredApplications = applications.filter((application) => {
            let isStatusMatching;
            switch (selectedStatus) {
                case 'All':
                    isStatusMatching = true;
                    break;
                case 'Completed':
                    isStatusMatching = application.status === 'завершено';
                    break;
                case 'NonCompleted':
                    isStatusMatching = ['новая', 'в работе'].includes(application.status);
                    break;
            }
            const isTextMatching =
                filterText === '' || application[selectedColumn].toString().includes(filterText);
            return isStatusMatching && isTextMatching;
        });
        setFilteredApplications(filteredApplications);
    }, [selectedStatus, filterText, selectedColumn]);

    const handleFilterSelectChange = (value) => {
        setSelectedColumn(value);
    };

    // Вычисление индексов отображаемых элементов для пагинации
    const indexOfLastItem = state.page * state.pageSize;
    const indexOfFirstItem = indexOfLastItem - state.pageSize;
    const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setState((prevState) => ({...prevState, page, pageSize}));

    // Асинхронное удаление данных
    async function deleteData(elementId: number) {
        try {
            const response = await remove(elementId);
            if (response.statusText === 'OK') {
                const dataArray = applications.filter(
                    (application) => application._id !== response.data._id,
                );
                setApplications(dataArray);
                setFilteredApplications(dataArray);
                if (currentPage > totalPages) {
                    setCurrentPage(currentPage - 1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Функция вывода модального окна для создания новой записи
    function createNew() {
        setChosenRow(-1);
        setOpen(true);
    }

    // Компонент для редактирования данных
    function EditData() {
        const data = applications.find((application) => application?._id === chosenRow);
        return (
            <div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    style={{
                        maxWidth: '',
                        minWidth: '100%',
                        height: '100%',
                        display: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                    }}
                >
                    <EditDataModal
                        onClose={() => setOpen(false)}
                        data={data}
                        onDataUpdated={handleDataUpdate}
                    />
                </Modal>
            </div>
        );
    }

    // Компонент кнопки для создания новой заявки
    function CreateButton() {
        if (Privilege) {
            return (
                <Button view="outlined-action" onClick={() => createNew()}>
                    Создать новую заявку
                </Button>
            );
        }
    }

    return (
        <div className="dataTable">
            <div
                style={{
                    display: 'flex',
                    justifyContent: Privilege ? 'space-between' : 'end',
                    padding: '5px',
                    margin: '0vh 0vh 1vh 0vh',
                    height: '1vh',
                }}
            >
                <CreateButton />
                Количество заявок: {filteredApplications.length}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', width: 400, padding: '5px'}}>
                    <div style={{width: 200}}>
                        <SearchArea
                            filterText={filterText}
                            onFilterTextChange={setFilterText}
                            selectedFilter={selectedColumn}
                        />
                    </div>
                    <div style={{width: 200}}>
                        <SelectFilter
                            columns={columns}
                            onFilterSelectChange={handleFilterSelectChange}
                        />
                    </div>
                </div>
                <div style={{padding: '5px'}}>
                    <StatusFilter onFilterStatusChange={setSelectedStatus} />
                </div>
            </div>
            <MyTable
                data={currentItems}
                columns={columns}
                onRowMouseEnter={(e) => setChosenRow(e._id)}
                getRowActions={function (
                    _item: TableDataItem,
                    _index: number,
                ): TableActionConfig<TableDataItem>[] {
                    if (Privilege) {
                        return [
                            {
                                text: 'Редактировать',
                                handler: () => {
                                    setOpen(true);
                                },
                            },
                            {
                                text: 'Удалить',
                                handler: (e) => {
                                    deleteData(e._id);
                                },
                                theme: 'danger',
                            },
                        ];
                    } else {
                        return [];
                    }
                }}
            />
            <div className="paginationDiv">
                <Pagination
                    className="paginationClass"
                    page={state.page}
                    pageSize={state.pageSize}
                    pageSizeOptions={[5, 10, 15, 20, 100]}
                    total={filteredApplications.length}
                    onUpdate={handleUpdate}
                />
            </div>
            <EditData />
        </div>
    );
}
// функция для фильтрации данных таблицы по статусу
function StatusFilter({onFilterStatusChange}) {
    return (
        <RadioButton
            name="group1"
            defaultValue={options[0].value}
            options={options}
            onChange={(e) => onFilterStatusChange(e.target.value)}
        />
    );
}

function SelectFilter({columns, onFilterSelectChange}) {
    return (
        <Select
            options={columns.map((column) => ({value: column.id, content: column.name}))}
            onUpdate={(value) => onFilterSelectChange(value)}
        />
    );
}

//функция для фильтрации таблицы
function SearchArea({filterText, onFilterTextChange, selectedFilter}) {
    return (
        <TextInput
            hasClear
            placeholder={'Поиск'}
            value={filterText}
            onUpdate={(value) => onFilterTextChange(value)}
        />
    );
}
//Функция для перехода ссылке
export function linkClick(
    id: number,
): React.MouseEventHandler<HTMLSpanElement | HTMLAnchorElement> | undefined {
    return (e) => {
        e.preventDefault();
        window.open(`https://ati.su/firms/${id}/info`, '_blank');
    };
}

export const DataTable: React.FC = () => {
    return (
        <div className={b()}>
            <div className={b('block')}>
                <div>
                    <div>
                        <FunctionalDataTable />
                    </div>
                </div>
            </div>
        </div>
    );
};
