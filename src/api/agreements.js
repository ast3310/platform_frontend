import axios from "axios";

const agreements = {
    getAgreementsList: async (page) => {
        let data = await axios.get('/api/agreements/',
        {
            params: {
                page: page
            }
        });

        if (data.status === 200) {
            return { isSuccess: true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },

    createAgreement: async ({ name }) => {
        let data = await axios.post('/api/agreements/',
            {
                name: name,
            });
        
        if (data.status === 201) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };

    },
}

export default agreements;