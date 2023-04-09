const dateTime = {
    formatedFinishDate: (finished_at) => {
        if (!!finished_at) {
            const date = new Date(finished_at);
            const dateElements = {
                d: date.getDate().toString(),
                m: (date.getMonth() + 1).toString(),
                y: date.getFullYear().toString(),
            }

            for (let key in dateElements) {
                const element = dateElements[key];
                if (element.length < 2) dateElements[key] = '0' + element;
            }

            return `${dateElements.d}.${dateElements.m}.${dateElements.y}`
        }
        return '__.__.____';
    },

    dateDaysDelta(started_at, finished_at) {
        const start = new Date(started_at);
        start.setHours(0,0,0,0);
        const finish = new Date(finished_at);
        finish.setHours(0,0,0,0);
        const diffTime = Math.abs(finish - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    },

    getFormatTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        let localtime = date.toLocaleTimeString('ru', { hour12: false });
        return localtime.slice(0, 5);
    }
}

export default dateTime;