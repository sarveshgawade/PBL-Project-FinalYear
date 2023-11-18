import Company from "../models/companyModel.js";

// import cloudinary from 'cloudinary'

const getAllCompany = async(req,res)=>{
    try {
        const company = await   Company.find({})
        if(!company){
            res.status(500).json({
                success: false,
                message: 'All fields are required !'
        })
    }
    
   
        res.status(200).json({
            success: true,
            message: 'All company found !',
            company
        })
}
catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    }) 
 }
} 

const createnewCompany = async(req,res)=>{
    const {title,description,jobRole} = req.body
    if(!title || !description || !jobRole){
        res.status(500).json({
            success: false,
            message: 'All fields are required !'
    })
    }
    const newCompany = await Company.create({
        title,
        description,
        jobRole
    })
    if(!newCompany){
        res.status(500).json({
            success: false,
            message: 'Unable to add company !'
    })
    }
    newCompany.save()
    res.status(200).json({
        success: true,
        message: 'New Comapny Added Successfully!',
        newCompany
})

    

}

const updateCompany = async (req,res) =>{
    try {
        const {id} = req.params

        const companyUpdated = await Company.findByIdAndUpdate(
            id,
            {
                // overwrite all the parameters provided in body by user
                $set: req.body
            },
            {
                // validates parameters through the courseModel.js file
                runValidators: true
            }
        )

        if(!companyUpdated){
            res.status(500).json({
                success: false,
                message: 'Unable to find comapny with given id !'
        })
        }

        res.status(200).json({
            success: true,
            message: `company updated successfully !`,
            companyUpdated
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
} 

const removeCompany = async (req,res) =>{
    const {id} = req.params

    const courseToBeDeleted = await Company.findById(id)

    if(!courseToBeDeleted){
        res.status(500).json({
            success: false,
            message: 'Unable to find comapny with given id!'
    })
    }

    await Company.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message: `Company deleted successfully`,
    })

} 

export{getAllCompany,createnewCompany,removeCompany,updateCompany}

