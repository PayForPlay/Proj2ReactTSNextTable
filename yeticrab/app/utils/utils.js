export function formatDate(dateString) {
    if (dateString !== '') {
        const date = new Date(dateString);
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleString('ru-RU', options).replace(',', '');
    }
    return null;
}
