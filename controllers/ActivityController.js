const model = require('../models')
const db = require('../models/index').sequelize;
const validator = require('validator');
const {body,validationResult} = require('express-validator');

module.exports={
    async activityList(req,res){
        const activities = await model.Activity.findAll();
        return res.status(200).json({
            status:"Success",
            message:"Success",
            data:activities
        })
    },
    async activityShow(req,res){

        let id=req.params.id;

        const activity=await model.Activity.findOne({
            where:{
                id:req.params.id
            }
        })

        if(!activity){
            return res.status(404).json({
                status:'Not found',
                message:`Activity with ID ${id} Not Found` 
            })
        }

        return res.status(200).json({
            status:'Success',
            message:'Success',
            data:activity
        })
    },
    async activityCreate(req,res){
        
        if(validator.isEmpty(req.body.title)){
            return res.status(400).json({
                status:'Bad Request',
                message:`title cannot be null` 
            }) 
        }
        
        const saving = await model.Activity.create({
            'title':req.body.title,
            'email':req.body.email
        });

        return res.status(201).json({
            status:'Success',
            message:'Success',
            data:saving
        })
    },
    async activityUpdate(req,res){
        if(Object.keys(req.body).length <= 0){
            return res.status(404).json({
                status:'Bad Request',
                message:`title cannot be null` 
            }) 
        }
        
        let id=req.params.id;
        console.log(id)
        // return;
        const data = await model.Activity.findOne({
            where:{
                id:id
            }
        });

        if(!data){
            return res.status(404).json({
                status:'Not found',
                message:`Activity with ID ${id} Not Found` 
            })
        }

        const updated = await model.Activity.update({
            'title':req.body.title
        },{
            where:{id:id}
        });

        if(updated){
            
            const newData = await model.Activity.findOne({
                where:{
                    id:id
                }
            })

            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: newData
            })
        }

    },
    async activityDelete(req,res){
       
        let id=req.params.id;
        const data = await model.Activity.findByPk(id);

        if(!data){
            return res.status(404).json({
                status:'Not found',
                message:`Activity with ID ${id} Not Found` 
            })
        }

        const destroy = await model.Activity.destroy({
            where:{
                id:req.params.id
            }
        });

        return res.status(200).json({
            status: "Success",
            message: "Success",
            data: {}
        })
    }
}