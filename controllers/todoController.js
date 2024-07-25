const todoSchema = require('../models/todoSchema');

// get todo list
const getList = async (req, res) => {
    
    try {

        const data = await todoSchema.find({user_id:req.user._id})

        if (!data) {
            res.render('/todo/getList', { msg: "can`t list" })
            return
        }

        res.render('todo', { 
            msg: "list success fully get",
            data
        })


    } catch (err) {
        console.log(err)
        res.send(err)
    }

}

// create list
const createList = async (req, res) => {
    
    try {
        const { task } = req.body

        if (!task) {
            res.render('getList', { msg: "can`t list add" })
            return
        }
        const data = new todoSchema({ user_id: req.user._id, task })
        await data.save();

        res.redirect('/todo/getList')


    } catch (err) {
        console.log(err)
        res.send(err)
    }
}


// get Edit page
const getEditPage = async (req, res) => {

    try{
        const data = await todoSchema.findById({_id:req.params.id})
        res.render('edit',{
            msg: "success",
            data 
        })
    }catch(err){
        res.send(err)
    }
}


// Edit task
const EditList = async (req, res) => {

    try{
        const data = await todoSchema.findByIdAndUpdate({_id:req.body.id},{task:req.body.task})
        res.redirect('/todo/getList')
    }catch(err){
        res.send(err)
    }

}


// delete list
const deleteList = async (req, res) => {
    
    try {
        const data = await todoSchema.findByIdAndDelete({ _id: req.params.id})
        res.redirect('/todo/getList')

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports = {
    getList,
    createList,
    getEditPage,
    EditList,
    deleteList
}