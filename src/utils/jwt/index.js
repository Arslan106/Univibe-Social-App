import jwt from 'jsonwebtoken'

 class OurJWT {
   CreateJWTForClub(id) {
    const secret = process.env.CLUB_JWT_TOKEN ? process.env.CLUB_JWT_TOKEN : 'CLUB_SECRET'
    return jwt.sign(
      {
        data: {
          id,
          
          for: 'CLUB_JWT'
        }
      },
      secret,
      { expiresIn: '7d' }
    )
  }
  CreateJWTForBusiness(id) {
    const secret = process.env.BUSINESS_JWT_TOKEN ? process.env.BUSINESS_JWT_TOKEN : 'BUSINESS_SECRET'
    return jwt.sign(
      {
        data: {
          id,
          
          for: 'BUSINESS_JWT'
        }
      },
      secret,
      { expiresIn: '7d' }
    )
  }
   async ValidateJWT(token) {
    const  secret = process.env.CLUB_JWT_TOKEN ? process.env.CLUB_JWT_TOKEN : 'CLUB_SECRET'
    try {
      const verified = jwt.verify(token, secret) 
     return verified;
    } catch (err) {
      return null
    }
  }

//   public CreateJWTForPatient(id: string, jwtKey: string | undefined): string {
//     const secret = process.env.PATIENT_JWT_KEY_SECRET ? process.env.PATIENT_JWT_KEY_SECRET : 'PATIENT_SECRET'
//     return jwt.sign(
//       {
//         data: {
//           id,
//           for: 'PATIENT_JWT',
//           jwtKey
//         }
//       },
//       secret,
//       { expiresIn: '7d' }
//     )
//   }

//   public async ValidateJWTForPatient(token: string): Promise<AuthenticatedPatient | null> {
//     const Service = new PatientService()
//     const secret = process.env.PATIENT_JWT_KEY_SECRET ? process.env.PATIENT_JWT_KEY_SECRET : 'PATIENT_SECRET'
//     try {
//       const verified = jwt.verify(token, secret) as AWjwtToken

//       if (verified) {
//         const account = await Service.VerifyJwtKey(verified.data.id, verified.data.jwtKey)
//         if (account) {
//           if (account.appFlags.isDeleted) {
//             return null
//           }
//           return {
//             jwt: verified,
//             Patient: account
//           }
//         } else return null
//       }
//       return null
//     } catch (err) {
//       return null
//     }
//   }
}

// export default  OurJWT

export default OurJWT;
