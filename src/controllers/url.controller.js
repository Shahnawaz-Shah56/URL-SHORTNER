const urlModel = require('../models/url.model');
const shortid = require('shortid')


async function shortUrl(req, res){
    try {
        const { URL } = req.body;

        const shortId = shortid.generate()

        const shortenedURL = await urlModel.create({
            originalURL: URL,
            shortenedURL: shortId,
            createdby: req.user._id
            
        })

        res.status(201).json({
    message: 'URL shortened successfully',
    shortUrl: shortId,
    createby:req.user.username
})


    } catch (error) {
        res.status(500).json({
            message: 'error occured', error: error.message
        })
    }
    


}

async function redirectURL(req, res){
    try {
        
        const shortId = req.params.shortId;

        const url = await urlModel.findOne({shortenedURL:shortId});
        if(!url){
            return res.status(404).json({
                message:'url not found'
            });

            
        }
        res.redirect(url.originalURL)

    } catch (error) {
        res.status(500).json({
            message:'some error occured', error:error.message
        })
    }

    
}

async function deleteUrl(req, res){
    try {
        
   
    const shortId = req.params.shortId;

const url = await urlModel.findOne({
    shortenedURL:shortId
})
res.status(204).json({
    message: 'URL deleted successfully'
})

}
  catch (error) {
        res.status(500).json({
            message: 'some error occured', error:error.message
        })
    }}


module.exports = { shortUrl, redirectURL, deleteUrl }