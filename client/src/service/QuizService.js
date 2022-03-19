import api from '../http/index'

const QuizService = ({alert, openBackdrop}) => {
    return {

        create: async function(data){
            try {
                
                openBackdrop(true)
                await api.post('/quiz/create', data)
                .then(response=>{
                    openBackdrop(false)
                    alert.success(response.data.message)
                    alert.open()
                    return response
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    throw new Error(error.response.data.message)
                }
                console.log(error);
            }
        },

        getOwnQuizzes: async function(id){
            try {
                
                openBackdrop(true)
                const response = await api.get('/quiz/get-own-quizzes', {params: {id: id}})
                openBackdrop(false)

                return response

            } catch (error) {
                if(error.response && error.response.status !== 404){
                    alert.error(error.response.data.message)
                    alert.open()
                }
                openBackdrop(false)
                throw new Error(error.response.data.message)
            }
        },

        delete: async function(id){
            try {
                    
                openBackdrop(true)
                await api.delete(`/quiz/delete/${id}`)
                .then(response=>{
                    openBackdrop(false)
                    alert.success(response.data.message)
                    alert.open()
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    throw new Error(error.response.data.message)
                }
            }
        },

        getQuizzes: async function() {
            try {

                const response = await api.get(`/quiz/get-quizzes`)
                return response

            } catch (error) {
                throw new Error(error)
            }
        }

    }
}

export default QuizService