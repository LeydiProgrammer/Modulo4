import { Task } from "../models/tasks.js";
import logger from "../logs/logger.js";

async function getTasks(req, res) {
    const {userId}=req.user;
try{ 
    const task = await Task.findAll({
        attributes:['id','name','done'],
        order:[['name','ASC']],
        where:{
            userId,
        },
      
    });
    res.json(task);
}catch(error){
logger.error('Error getTaks', error);
res.status(500).json({message:'Server error'});
}
}


async function createTask(req, res) {
    const {userId}=req.user;
    const {name}=req.body;
try{ 
    const task = await Task.create({
        name,
            userId,
    });
    res.json(task);
}catch(error){
logger.error('Error createTaks', error);
res.status(500).json({message:'Server error'});
}
}

async function getTask(req, res) {
    const {userId}=req.user;
    const {id}=req.params;
try{ 
    const task = await Task.findOne({
        attributes:['name','done'],
        where:{
            id,
            userId,
        },
    });
    res.json(task);
}catch(error){
logger.error('Error createTaks', error);
res.status(500).json({message:'Server error'});
}
}


async function updateTask(req, res) {
    const {userId}=req.user;
    const {id}=req.params;
    const{name}=req.body;

    try{
        const task = await Task.update({name},{where:{id,userId}});
if(task[0]===0)
    return res.status(404).json({message:'Task not found'});

res.json(task);
}catch(error){
logger.error('Error updateTaks', error);
res.status(500).json({message:'Server error'});
}


}


async function taskDone(req,res){
    const {userId}=req.user;
    const {id}=req.params;
    const{done}=req.body;

        try{
            const task = await Task.update({done},{where:{id,userId}});
    if(task[0]===0)
        return res.status(404).json({message:'Task not found'});
    
    res.json(task);
    }
    catch(error){
        logger.error('Error deleteUser:',error);
        res.status(500).json({ message: 'SERVER ERROR' });
    }
}

async function deleteTask(req,res){
    const {userId}=req.user;
    const {id}=req.params;
  

        try{
            const task = await Task.destroy({where:{id,userId}});
    if(task===0)
        return res.status(404).json({message:'Task not found'});
    
    res.json(task);
    }
    catch(error){
        logger.error('Error deleteUser:',error);
        res.status(500).json({ message: 'SERVER ERROR' });
    }
}

export default{
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
}