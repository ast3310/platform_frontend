import axios from "axios";

const tasks = {
    getStagesList: async () => {
        let data = await axios.get('/api/tasks/stages_list/');
        
        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    getTasksList: async (page) => {
        let data = await axios.get('/api/tasks/',
        {
            params: {
                page: page
            }
        });

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    getMyTasksList: async (page) => {
        let data = await axios.get('/api/tasks/my_tasks/',
        {
            params: {
                page: page
            }
        });

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    getTask: async (id) => {
        let data = await axios.get(`/api/tasks/${id}/`);

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    stageCompletion: async (id) => {
        let data = await axios.post(`/api/tasks/${id}/stage_completion/`);

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    completeAgreement: async (id, agreement_id) => {
        let data = await axios.patch(`/api/tasks/${id}/complete_agreement/${agreement_id}/`);

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    saveDesignData: async (id, {  VD, ND, PRG, description, agreements }) => {
        let data = await axios.post(`/api/tasks/${id}/save_design_data/`, {
            VD: VD,
            ND: ND,
            PRG: PRG,
            description: description,
            agreements: agreements,
        });

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    saveEstimationData: async (id, {  cost }) => {
        let data = await axios.post(`/api/tasks/${id}/save_estimation_data/`, {
            cost: cost
        });

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    createTask: async ({ cipher, cadastral_number, topic_id, address, stages_executers }) => {
        let data = await axios.post('/api/tasks/',
            {
                cipher: cipher,
                cadastral_number: cadastral_number,
                topic_id: topic_id,
                address: address,
                stages_executers: stages_executers,
            });
        
        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };

    },
}

export default tasks;