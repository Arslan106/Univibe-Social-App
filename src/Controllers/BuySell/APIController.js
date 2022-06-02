import BuySellPostService from './Service.js'


// import '@types/ua-parser-js'
class BuySellPostController {


    async CreateBuySellPost(req, res) {
        const { title,price,description,category, attachments, studentId } = req.body


        try {
            let data = {
                title,
                price,
                description,
                category,
                attachments,
                owner: studentId
            }
            const newPost = await new BuySellPostService().CreatePost(data)

            if (newPost) {
                res.status(200).json({ post: newPost })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in creating business CreateBuySellPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetPostByCategory(req, res) {


        try {
            
            const posts = await new BuySellPostService().GetByCategory(req.params.category,req.body.studentId)

            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in creating business GetPostByCategory is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetPosts(req, res) {
        const { studentId } = req.body


        try {
            const posts = await new BuySellPostService().GetAllPosts(studentId)

            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetPosts is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }
    async DeleteBuySellPost(req, res) {
        const { studentId } = req.body
        try {
            const post = await new BuySellPostService().DeletePost(studentId, req.params.postId)
            if (post) {
                res.status(200).json({ status: true })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in DeleteBuySellPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    

}

export default  BuySellPostController
