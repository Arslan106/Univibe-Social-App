import AccommodationPostService from './Service'


// import '@types/ua-parser-js'
class AccommodationPostController {


    async CreateAccommodationPost(req, res) {
        const { postedBy,
            rentalType,
            monthlyPrice,
            includedBills,
            contractLength,
            includedParking,
            description,
            address,
            attachments,
            target,
            BusinessId } = req.body


        try {
            let data = {
                postedBy,
                rentalType,
                monthlyPrice,
                includedBills,
                contractLength,
                includedParking,
                description,
                address,
                attachments,
                target,
                owner: BusinessId
            }
            const newPost = await new AccommodationPostService().CreatePost(data)

            if (newPost) {
                res.status(200).json({ post: newPost })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in creating business accommodation Post is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetPosts(req, res) {
        const { BusinessId } = req.body


        try {
            const posts = await new AccommodationPostService().GetAllPosts(BusinessId)

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

    async GetPostsForStudents(req, res) {
        try {
        const { account } = req.body
       console.log('asdfadfasd',account.university,
       account.studentType,
       account.gender)
            const posts = await new AccommodationPostService().GetPostsForStudents(
                account.university,
                account.studentType,
                account.gender,
                false
            )

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

    async DeleteAccommodationPost(req, res) {
        const { BusinessId } = req.body
        try {
            const post = await new AccommodationPostService().DeletePost(BusinessId, req.params.postId)
            if (post) {
                res.status(200).json({ status: true })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in DeleteAccommodationPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

}

module.exports = AccommodationPostController
