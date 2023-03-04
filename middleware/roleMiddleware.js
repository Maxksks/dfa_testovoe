const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) {
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }

        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(403).json({message:'Unauthorized'})
            }

            const decodedData = jwt.verify(token, secret)
            req.user = decodedData
            let hasRole = false
            decodedData.roles.forEach(role => {
                if (roles.includes(role)){
                    hasRole = true
                }
            })

            if(!hasRole){
                return res.status(403).json({message:'Permission denied'})
            }
            next()

        } catch (e){
            console.log(e)
            return res.status(403).json({message:'Unauthorized'})
        }
    }

}