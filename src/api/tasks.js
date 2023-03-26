import axios from "axios";

const tasks = {
    getStagesList: async () => {
        let data = await axios.get('/api/tasks/stages_list/');
        return data;
    },
}

export default tasks;