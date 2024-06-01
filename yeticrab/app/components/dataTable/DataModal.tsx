//DataModal.tsx
import React, {useState} from 'react';
import {Button, Icon, Label, RadioButton, RadioButtonOption, TextInput} from '@gravity-ui/uikit';
import {formatDate} from '../../utils/utils';
import {create, update} from '../../api/data';
import {DatePicker} from '@gravity-ui/date-components';
import {DateTime} from '@gravity-ui/date-utils';
import {Xmark} from '@gravity-ui/icons';

//Поле формы
const FormField = React.memo(
    ({label, name, value, onChange, handleDateChange, formData, formatDate, errorMessage}) => {
        return (
            <div style={{display: 'grid'}}>
                <Label theme="normal">{label}</Label>
                {name === 'dateTimeReq' || name === 'startDate' || name === 'endDate' ? (
                    <DatePicker
                        className="dataTable__Modal__Input"
                        name={name}
                        format="DD.MM.YYYY hh:mm"
                        size="m"
                        placeholder={formatDate(value) || ' '}
                        hasClear
                        onUpdate={(value) => handleDateChange(name, value)}
                    />
                ) : (
                    <TextInput
                        className="dataTable__Modal__Input"
                        name={name}
                        hasClear
                        value={value}
                        validationState={formData[name + 'ValidationState']}
                        onChange={(e) => onChange(e.target.value, name)}
                        errorPlacement="inside"
                        errorMessage={errorMessage}
                    />
                )}
            </div>
        );
    },
);
//Главный компонент модального окна
function EditDataModal({onClose, data, onDataUpdated}) {
    const [formData, setFormData] = useState(
        data || {status: 'новая', dateTimeReq: currentDateToString()},
    );
    const fields = [
        {name: 'dateTimeReq', label: 'Время заявки'},
        {name: 'clientFirm', label: 'Фирма'},
        {name: 'fioTrans', label: 'ФИО перевозчика'},
        {name: 'phoneTrans', label: 'Телефон перевозчика'},
        {name: 'comments', label: 'Комментарии'},
        {name: 'startDate', label: 'Дата взятия в работу'},
        {name: 'endDate', label: 'Дата завершения'},
        {name: 'linkTrans', label: 'Код сети'},
    ];

    const options: RadioButtonOption[] = [
        {value: 'в работе', content: 'в работе'},
        {value: 'завершено', content: 'завершено'},
    ];

    //Функция для обработки ввода в поле
    const handleChange = (value: string, name: string) => {
        let updatedFormData = {...formData, [name]: value};
        let isInvalid = false;

        if (value === 'в работе' && name === 'status') {
            updatedFormData = {
                ...updatedFormData,
                startDate: currentDateToString(),
            };
        }
        if (value === 'завершено' && name === 'status') {
            if (!formData.startDate) {
                updatedFormData = {
                    ...updatedFormData,
                    startDate: currentDateToString(),
                };
            }
            updatedFormData = {
                ...updatedFormData,
                endDate: currentDateToString(),
            };
        }

        switch (name) {
            case 'phoneTrans':
                // Проверка на наличие не цифровых символов
                if (!/^[0-9+\-]+$/.test(value)) {
                    isInvalid = true;
                }
                break;
            case 'fioTrans':
                // Проверка на наличие цифровых символов в ФИО
                if (/\d/.test(value)) {
                    isInvalid = true;
                }
                break;
            case 'linkTrans':
                // Только английские символы и цифры
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    isInvalid = true;
                }
                break;
            default:
                break;
        }

        // Установка validationState в "invalid", если данные неправильные
        if (isInvalid) {
            updatedFormData[name + 'ValidationState'] = 'invalid';
        } else {
            // Сброс validationState в "valid", если данные правильные
            updatedFormData[name + 'ValidationState'] = 'valid';
        }

        setFormData(updatedFormData);
    };

    //Функция обработки формы
    async function handleSubmit(e: {preventDefault: () => void}) {
        e.preventDefault();
        let isFormValid = true;
        const updatedFormData = {...formData};

        for (const field of fields) {
            if (
                field.name !== 'startDate' &&
                field.name !== 'endDate' &&
                !updatedFormData[field.name]
            ) {
                // Ошибка при пустых полях
                updatedFormData[field.name + 'ErrorMessage'] = 'This field is required';
                updatedFormData[field.name + 'ValidationState'] = 'invalid';
                isFormValid = false;
            }
        }
        for (const field of Object.keys(formData)) {
            if (field.endsWith('ValidationState') && formData[field] === 'invalid') {
                isFormValid = false;
                break;
            }
        }

        if (isFormValid) {
            try {
                if (!data) {
                    const response = await create(updatedFormData);
                    onDataUpdated(response, 'create'); // Передача response после создания
                }
                if (data) {
                    const response = await update(updatedFormData);
                    onDataUpdated(response, 'update'); // Передача response после обновления
                }
                onClose();
            } catch (error) {
                console.error(error);
            }
        } else {
            setFormData(updatedFormData);
        }
    }
    //Функция кнопок статуса
    function StatusChoice() {
        return (
            <RadioButton
                width="max"
                name="status"
                value={formData.status}
                options={options}
                onChange={(e) => handleChange(e.target.value, 'status')}
            />
        );
    }
    return (
        <div className="dataTable__Modal">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div>{data ? 'Редактирование' : 'Создание'}</div>
                <Button type="button" view="outlined" onClick={onClose}>
                    <Icon data={Xmark} size={18} />
                </Button>
            </div>
            <div style={{padding: '1vh 0vh 1vh 0vh'}}>
                <form>
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name] || ''}
                            formData={formData}
                            onChange={handleChange}
                            handleDateChange={handleDateChange}
                            formatDate={formatDate}
                            errorMessage={
                                formData[field.name + 'ValidationState'] === 'invalid'
                                    ? 'Ошибка ввода'
                                    : ''
                            }
                        />
                    ))}
                    <div
                        style={{
                            display: 'grid',
                        }}
                    >
                        <Label>Статус</Label>
                        <div style={{marginTop: '1px'}}>
                            <StatusChoice />
                        </div>
                    </div>
                </form>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '5px',
                }}
            >
                <Button type="submit" view="outlined-action" onClick={handleSubmit} width="max">
                    {data ? 'Сохранить' : 'Создать'}
                </Button>
            </div>
        </div>
    );
    //Функция конвертации данных из датапикера в строку
    function datePickerObjectToDateString(datePickerObject: unknown): string {
        const date = new Date(datePickerObject._timestamp);
        return date.toISOString();
    }
    //Функуия возврата текущей даты строкой
    function currentDateToString(): string {
        const currentDate = Date.now();
        const date = new Date(currentDate);
        return date.toISOString();
    }
    //Функция обработки поля с датой
    function handleDateChange(name: string, value: DateTime | null) {
        setFormData({...formData, [name]: datePickerObjectToDateString(value)});
    }
}

export default EditDataModal;
