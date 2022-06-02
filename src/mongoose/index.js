import mongoose from 'mongoose'

const InitializeMongoose = () => {
  const mongoURL = process.env.MONGO_URL ? process.env.MONGO_URL : ''
  mongoose.connect('mongodb+srv://social-app-arsalan:social-app-arsalan@cluster0.9eyop.mongodb.net/social-app?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('ERROR CONNECTING MONGO:', err)
    } else {
      // eslint-disable-next-line no-console
      console.info('MONGO CONNECTED')
    }
  })
}

export default InitializeMongoose
