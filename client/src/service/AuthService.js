import api from '../http/index'

const AuthService = ({alert, openBackdrop}) => {

    return {

        login: function({email, password}){
            return async dispatch => {
                try {
                    
                    openBackdrop(true)
                    await api.post('/auth/login', {email, password})
                    .then(response=>{
                        
                        dispatch({type:'Set_User',payload:{data: response.data , isLogined: true}})
                        localStorage.setItem('token',response.data.accessToken)
                    })
                    .then(()=>{
                        openBackdrop(false)
                    })

                } catch (error) {
                    if(error.response){
                        alert.error(error.response.data.message)
                        alert.open()
                        openBackdrop(false)
                        return Promise.reject(`Failed with status: ${error.response.status}`)
                    }
                }
            }
        },
    
        registration: async function({email, password, name}){ 
            try {
                
                if(email.length <= 5 || password.length <= 5 ){
                    alert.error('Not valid inputs');
                    return alert.open() 
                }
                
                openBackdrop(true)
                return await api.post('/auth/registration', {email, password,name})
                .then(response=>{
                    openBackdrop(false)
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    return Promise.reject(`Failed with status: ${error.response.status}`)
                }
            }
        },
    
        logout: function(){
            return async dispatch => {

                return await api.post('/auth/logout')
                .then(()=>{
                    dispatch({type:'Remove_User'})
                    localStorage.removeItem('token')
                    dispatch({type: 'Remove_History'})
                })

            }
        },

        reset: async function({email,password,code}){
            try {
                
                openBackdrop(true)
                return await api.post('/auth/reset-password',{email,password,code})
                .then(()=>{
                    openBackdrop(false)
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    return Promise.reject(`Failed with status: ${error.response.status}`)
                }
            }
        },

        activate: async function({email,code}){
            try {
                
                openBackdrop(true)
                return await api.post('/auth/activate',{email,code})
                .then(()=>{
                    openBackdrop(false)
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    return Promise.reject(`Failed with status: ${error.response.status}`)
                }
            }
        },

        activationCode: async function (email) {
            try {
                
                return await api.post('/auth/activation-code', {email})
                .then(()=>{
                    alert.success('Successfuly sent')
                    alert.open()
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    return Promise.reject(`Failed with status: ${error.response.status}`)
                }
            }
        },

        uploadAvatar: function (id, data) {
            return async dispatch => {
                try {

                    return await api.post('/auth/upload-avatar', {id, data})
                    .then(response=>{
                        dispatch({type:'Set_User',payload:{data: response.data , isLogined: true}})
                        localStorage.setItem('token',response.data.accessToken)
                    })
    
                } catch (error) {
                    if(error.response){
                        return Promise.reject(`Failed with status: ${error.response.status}`)
                    }
                }
            }
        },

        changeName: function (id, name) {
            return async dispatch => {
                try {

                    openBackdrop(true)
                    return await api.post('/auth/change-name', {id, name})
                    .then(response=>{
                        dispatch({type:'Set_User',payload:{data: response.data , isLogined: true}})
                        localStorage.setItem('token',response.data.accessToken)
                    })
                    .then(()=>{
                        openBackdrop(false)
                        alert.success('Name successfuly changed')
                        alert.open()
                    })
    
                } catch (error) {
                    if(error.response){
                        alert.error(error.response.data.message)
                        alert.open()
                        openBackdrop(false)
                        return Promise.reject(`Failed with status: ${error.response.status}`)
                    }
                }
            }
        },

        deleteAccount: async function (id, password) {
            try {
                
                openBackdrop(true)
                return await api.post('/auth/delete-account',{id,password})
                .then(()=>{
                    openBackdrop(false)
                })

            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                    openBackdrop(false)
                    return Promise.reject(`Failed with status: ${error.response.status}`)
                }
            }
        },

        checkAuth: function () {
            return async dispatch => {
                try {
                   
                    return await api.get('/auth/refresh')
                    .then(response =>{
                        dispatch({type:'Set_User',payload:{data: response.data , isLogined: true}})
                        localStorage.setItem('token',response.data.accessToken)
                    })
    
                } catch (error) {
                    throw new Error(error.response.data.message)
                }
            }
        }

    }

}

export default AuthService