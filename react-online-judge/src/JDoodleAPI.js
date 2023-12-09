import axios from 'axios';

const JDoodleAPI = {
	executeCode: async (code, language, input) => {
		const url = '/jdoodle';
		const program =
		{
			hasInputFiles:false,
			language:language,
			libs:[],
			projectKey:1001,
			script:code,	
			stdin:input,
			versionIndex:0,
			clientId: process.env.REACT_APP_JDOODLE_CLIENT_ID,
			clientSecret: process.env.REACT_APP_JDOODLE_CLIENT_SECRET,
		};
		try {
			const response = await axios.post(url, program);
			return response.data;
		} catch (error) {
			console.error('Error executing code:', error);
			throw error;
		}	
	},
};
export default JDoodleAPI;