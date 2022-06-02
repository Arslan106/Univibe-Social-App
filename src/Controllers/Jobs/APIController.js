import JobService from './Service'


// import '@types/ua-parser-js'
class JobsController {
    async CreatJobPost(req, res) {
        const { jobType,title,BusinessId,target,jobDescription,jobAddress,jobEmail } = req.body
        try {
            let data = {
                owner: BusinessId,
                // attachment,
                jobType,
                title,
                BusinessId,
                target,
                jobDescription,jobAddress,jobEmail
            }

            const newPost = await new JobService().CreateJobPost(data)

            if (newPost) {
                res.status(200).json({ post: newPost })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in creating business CreatJobPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    } 
    
    async GetJobs(req, res) {
        const { BusinessId } = req.body
        try {
            const posts = await new JobService().GetAllPosts(BusinessId)

            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetJobs is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetPartTimeJobs(req, res) {
        const { account } = req.body
        try {
            const posts = await new JobService().GetPartTimeJobs(account.university,account.studentType)

            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetJobs is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetCourseRelatedJobs(req, res) {
        const { account } = req.body
        try {
            const posts = await new JobService().GetCourseRelatedJobs(account.university,account.studentType,account.course)

            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetJobs is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }
    async DeleteJobPost(req, res) {
        const { BusinessId } = req.body
        try {
            const post = await new JobService().DeletePost(BusinessId, req.params.postId)
            if (post) {
                res.status(200).json({ status: true })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in DeleteJobPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

}

module.exports = JobsController
