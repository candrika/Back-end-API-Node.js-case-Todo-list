const model= require('../models');

module.exports={
    async todoList(req,res){
       var datas;
       
       let activity_group_id= req.query.activity_group_id;
       console.log(activity_group_id);

        if(activity_group_id!=null){
            datas = await model.Todo.findAll({
                where:{
                    activity_id:activity_group_id
                }
            });
        }else{
            datas =await model.Todo.findAll();
        }

        return res.status(200).json({
            status:'Success',
            message:'Success',
            data:datas
        })
    },
    async todoShow(req,res){
        let id = req.params.id
        const data =await model.Todo.findOne({
            where:{
                id:req.params.id
            }
        })
       
        if(!data){
            return res.status(404).json({
                status:'Not Found',
                message:'Todo with ID '+id+' Not Found',
                data:{}
            })
        }

        return res.status(200).json({
            status:'Success',
            message:'Success',
            data:data
        })
    },
    async todoCreate(req,res){
        
        if(!req.body.title){
            return res.status(400).json({
                status:'Bad Request',
                message:`title cannot be null` 
            }) 
        }

        if(!req.body.activity_group_id){
            return res.status(400).json({
                status:'Bad Request',
                message:`activity_group_id cannot be null` 
            }) 
        }

        const save = await model.Todo.create({
            'activity_id':req.body.activity_group_id,
            'title':req.body.title,
            'is_active':req.body.is_active,
            'priority':req.body.priority
        });

        return res.status(201).json({
            status:'Success',
            message:'Success',
            data:save
        })
    },
    async todoUpdate(req,res){

        const data = await model.Todo.findByPk(req.params.id);

        if(!data){
            return res.status(404).json({
                status:'Not Found',
                message:'Todo with ID '+req.params.id+' Not Found',
                data:data
            })
        }

        if(req.body.status!=null){

            let status = req.body.status==true?1:0;

            const statusUpdated = await model.Todo.update({
                'is_active':status
            },{
                where:{
                    id:req.params.id
                }
            })

            if(statusUpdated){
                const statusChanged = await model.Todo.findOne({where:{id:req.params.id}});

                return res.status(200).json({
                    status:'Success',
                    message:'Success',
                    data:statusChanged
                })
            }
        }

        const updated = await model.Todo.update({
            'title':req.body.title
        },{
            where:{
                id:req.params.id
            }
        })

        if(updated){
            const row = await model.Todo.findOne({where:{id:req.params.id}});

            return res.status(200).json({
                status:'Success',
                message:'Success',
                data:row
            })
        }

    },
    async todoDelete(req,res){
        const data= await model.Todo.findByPk(req.params.id)
        
        if(!data){
            return res.status(404).json({
                status:'Not Found',
                message:'Todo with ID '+req.params.id+' Not Found',
                data:{}
            })
        }

        const remove = await model.Todo.destroy({
            where:{
                id:req.params.id
            }
        })
 
        if(remove){
            return res.status(200).json({
                status:'Success',
                message:'Success',
                data:{}
            })
        }
    }
}