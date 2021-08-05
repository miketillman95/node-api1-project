const express = require('express')
const router = express.Router()
const model = require('./model')

router.post('/api/users', (req,res, next) => {
    model.insert(req.params.id, req.body.bio )
    .then(users => {
        if(users) {
                res.status(200).json(users)
        }
        else {
            res.status(404).json({
                message: "Please provide name and bio for the user"
            })
        }
    })
    .catch(next)
})


    router.get('/api/users', (req, res, next) => {
        model.find(req.query)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
        } )
    })

    router.get('api/users/:id', (req, res, next ) => {
        model.findById(req.params.id)
        .then( users => {
            if(users) {
                res.status(200).json(users)

            } else{
                res.status(404).json({ 
                    message: "The user with the specified ID does not exist" 
                })
            }
        })
        .catch(err)
        console.log(err)
        res.status(500).json(
            { message: "The user information could not be retrieved" 
        })
    })


        router.delete('/api/users/:id', (req, res, next) => {
            // difference between body and params
            model.remove(req.params.id)
            .then(users => {
                if(users > 0){
                    res.status(200).json({ message: "GG"});

                }else {
                    res.status(404).json({ message: "The user with the specified ID does not exist"});

                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "The user could not be removed"  
                })
            })
        })

        router.put('/api/users/:id', (req, res, next) => {
            model.update(req.params.id, req.body)
            .then(users => {
                if(users) {
                    res.status(200).json(users);

                }else {

                }
            })

        })



router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'was an error',
      message: err.message,
      stack: err.stack
    })
  })

  module.exports = router