import DealsService from './Service.js'


// import '@types/ua-parser-js'
class DealsController {


    async CreateDealsPost(req, res) {
        const { attachments,advertType,BusinessId,target } = req.body
        

        try {
            let data = {
                owner: BusinessId,
                attachments,
                advertType,
                target
            }

            if(advertType==='DEALS'){
        const { dealTitle,description,dealPrice } = req.body

                data = {
                    ...data,
                    dealTitle,
                    description,
                    dealPrice,
                }
            }
            else if(advertType==='DISCOUNT'){
        const { discountTitle,description,previousPrice,newPrice,discountCode } = req.body

                data = {
                    ...data,
                    discountTitle,description,previousPrice,newPrice,discountCode,discount:((newPrice/previousPrice)*100).toFixed(1)
                }
            }
            else {
                data = {
                    ...data,
                    dealPrice:0
                }
            }
            const newPost = await new DealsService().CreatePost(data)

            if (newPost) {
                res.status(200).json({ post: newPost })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in creating business CreateDealsPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    } 
    
    async GetDeals(req, res) {
        const { BusinessId } = req.body


        try {
            const posts = await new DealsService().GetAllPosts(BusinessId)

            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetDeals is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }
    async DeleteDealsPost(req, res) {
        const { BusinessId } = req.body
        try {
            const post = await new DealsService().DeletePost(BusinessId, req.params.postId)
            if (post) {
                res.status(200).json({ status: true })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in DeleteDealsPost is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetDealsForStudent(req, res) {
        const { account,advertType } = req.body
        try {
            let dob = new Date(account.dateOfBirth)
            let dateDiff = Date.now()-dob.getTime()
            let ageDate = new Date(dateDiff)
            let now = new Date().getMonth()
            let then = dob.getMonth()
            let age = Math.abs(ageDate.getUTCFullYear()-1970)
            if(Math.abs(then-now)>0){
                age =  age + Math.abs((then-now)/12)
                age = age.toFixed(2)
            }
            const posts = await new DealsService().GetDealsForStudent(
                advertType,
                account.university,
                account.studentType,
                account.gender,
                age
                )
            if (posts) {
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetDeals is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

}

export default  DealsController
