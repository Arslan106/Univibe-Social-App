import AccountsService from "./Service.js";
import OurJWT from "../../utils/jwt/index.js";
import bcrypt from "bcrypt";
import StripeTokenService from "../StripeTokens/Service.js";
// import '@types/ua-parser-js'
class AccountsController {
  // this.Service;
  // Service;
  // constructor(){
  //     this.Service = new AccountsService()
  // }

  async AddProfileImage(req, res) {
    const { id, url } = req.body;
    try {
      const updatedAccount = await new AccountsService().AddProfile(id, url);
      if (updatedAccount) {
        res.status(200).json({ status: "done" });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in AddProfileImage is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }
  async AddCoverImage(req, res) {
    const { id, url } = req.body;
    try {
      const updatedAccount = await new AccountsService().AddCover(id, url);
      if (updatedAccount) {
        res.status(200).json({ status: "done" });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in AddCoverImage is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async GetClubSocitiesNotFollowd(req, res) {
    const { studentId } = req.body;
    try {
      const accounts = await new AccountsService().GetUnfollowdClubsByStudent(
        studentId
      );
      if (accounts) {
        res.status(200).json({ accounts });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in GetClubSocitiesNotFollowd is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async FollowAccount(req, res) {
    const { account, accountId } = req.body;
    console.log("account is: ", account);
    try {
      const data = await new AccountsService().AddFollower(accountId, {
        id: account._id.toString(),
        name: account.name,
        date: new Date(),
      });
      if (data) {
        res.status(200).json({ status: true });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in FollowAccount is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async UnFollowAccount(req, res) {
    const { account, accountId } = req.body;
    console.log("account is: ", account);
    try {
      const data = await new AccountsService().removeFollower(
        accountId,
        account._id.toString()
      );
      if (data) {
        res
          .status(200)
          .json({
            status: true,
            payload: {
              _id: data._id,
              name: data.name,
              cover: data.cover,
              profile: data.profile,
              followers: data.followers,
            },
          });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in UnFollowAccount is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async CreateClubAccount(req, res) {
    const {
      name,
      society,
      email,
      password,
      university,
      detail,
      cover,
    } = req.body;

    const IfAccountExists_ByEmail = await new AccountsService().IfAccountExists_ByEmail(
      email
    );
    if (IfAccountExists_ByEmail) {
      res
        .status(400)
        .json({
          message: "This email is already registered. Please login instead",
        });
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let data = {
        name,
        email,
        society,
        type: "CLUB",
        university,
        detail,
        cover,
        password: hashedPassword,
      };
      const newAppAccount = await new AccountsService().CreateAccount(data);
      if (newAppAccount) {
        const JWT = new OurJWT();
        const token = JWT.CreateJWTForClub(newAppAccount._id);
        delete newAppAccount.password;
        res.status(200).json({ account: newAppAccount, jwtToken: token });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in creating club is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async LoginAccount(req, res) {
    const { email, password } = req.body;
    try {
      const data = await new AccountsService().Login(email, password);
      if (data.account) {
        let account = { ...data.account };
        delete account.password;
        const JWT = new OurJWT();
        const token = JWT.CreateJWTForClub(account._id);
        res.status(200).json({ account, jwtToken: token });
      } else {
        res.status(400).json({ message: data.message });
      }
    } catch (err) {
      console.log("Error in Login is: ", err);
      res.status(500).json({ message: "Request failed. Please try again" });
    }
  }

  async CreateBusinessAccount(req, res) {
    const {
      name,
      contactNumber,
      email,
      password,
      purposeOfAdvirtisement,
      profile,
    } = req.body;

    const IfAccountExists_ByEmail = await new AccountsService().IfAccountExists_ByEmail(
      email
    );
    if (IfAccountExists_ByEmail) {
      res
        .status(400)
        .json({
          message: "This email is already registered. Please login instead",
        });
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let data = {
        name,
        email,
        contactNumber,
        profile,
        purposeOfAdvirtisement,
        type: "BUSINESS",
        password: hashedPassword,
      };
      const newAppAccount = await new AccountsService().CreateAccount(data);
      if (newAppAccount) {
        const JWT = new OurJWT();
        const token = JWT.CreateJWTForClub(newAppAccount._id);
        delete newAppAccount.password;
        res.status(200).json({ account: newAppAccount, jwtToken: token });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in creating club is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async AddCardAndActivate(req, res) {
    try {
      const { id, cardNumber, token, option } = req.body;

      const StripeToken = await new StripeTokenService().CreateToken({
        token: token,
        ownerId: id,
        cardNumber: cardNumber,
      });
      if (!StripeToken) {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
        return;
      }
      const account = await new AccountsService().ActivateAccount(id, {
        activatedAt: Date.now(),
        option: option,
        cardId: StripeToken._id,
      });
      if (!account) {
        res.status(500).json({ message: "Unable to activate account" });
        return
      }
      res.status(200).json({ status: true });
    } catch (err) {
      console.log("Error in adding card is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async GetAllCards(req, res) {
    try {
      const { id } = req.body;

      const StripeToken = await new StripeTokenService().GetAllCards(id);
      if (!StripeToken) {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
        return;
      }
      res.status(200).json({ cards: StripeToken });
    } catch (err) {
      console.log("Error in GetAllCards is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async ActivateAccount(req, res) {
    try {
      const { id, cardId, option } = req.body;
      const account = await new AccountsService().ActivateAccount(id, {
        activatedAt: Date.now(),
        option: option,
        cardId: cardId,
      });
      if (!account) {
        res.status(500).json({ message: "Unable to activate account" });
        return
      }

      res.status(200).json({ status: true });
    } catch (err) {
      console.log("Error in ActivateAccount is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async CheckActivation(req, res) {
    try {
      const { id } = req.body;
      const account = await new AccountsService().GetAccountById(id);
      if (!account) {
        res.status(500).json({ message: "Unable to find account" });
        return
      }
      if (!account.activation) {
        res.status(200).json({ status: false });
        return
      }
      let activatedAt = account.activation.activatedAt;
      // console.log('activatedAt',account.activation)
      if (account.activation.option === "monthly") {
        const upto = Date.now() +(30 * 24 * 60 * 60 * 1000);
        console.log("upto is: ", upto);
        if (Date.now() >= upto) {
          res.status(200).json({ status: false });
        } else {
          res.status(200).json({ status: true });
        }
      } else {
        var oneYearFromNow = new Date(activatedAt);
        const upto = oneYearFromNow.setFullYear(
          oneYearFromNow.getFullYear() + 1
        );
        if (Date.now() >= upto) {
          res.status(200).json({ status: false });
        } else {
          res.status(200).json({ status: true });
        }
      }

      // res.status(200).json({ status: true });
    } catch (err) {
      console.log("Error in ActivateAccount is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async getAccountInfo(req, res) {
    try {
      const { id } = req.body;

      const account = await new AccountsService().GetAccountById(id);
      if (account) {
        res.status(200).json({ account: account });
        // return
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in getting account is: ", err);
      res.status(500).json({ message: "Error Processing Request" });
    }
  }

  async CreateStudentAccount(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      studentNumber,
      studentType,
      university,
      course,
      academicYear,
      cover,
      graduationYear,
    } = req.body;

    const IfAccountExists_ByEmail = await new AccountsService().IfAccountExists_ByEmail(
      email
    );
    if (IfAccountExists_ByEmail) {
      res
        .status(400)
        .json({
          message: "This email is already registered. Please login instead",
        });
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let data = {
        firstName,
        lastName,
        email,
        gender,
        studentNumber,
        studentType,
        university,
        course,
        academicYear,
        cover,
        graduationYear,
        type: "STUDENT",
        password: hashedPassword,
      };
      const newAppAccount = await new AccountsService().CreateAccount(data);
      if (newAppAccount) {
        const JWT = new OurJWT();
        const token = JWT.CreateJWTForClub(newAppAccount._id);
        delete newAppAccount.password;
        res.status(200).json({ account: newAppAccount, jwtToken: token });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in creating Student is: ", err);
      res.status(500).json({ message: "Error in Processing Request" });
    }
  }

  async AddDeviceTokenToAccount(req, res) {
    const { deviceToken, id } = req.body;

    try {
      const updatedAccount = await new AccountsService().AddDeviceToken(
        id,
        deviceToken
      );
      if (updatedAccount) {
        res.status(200).json({ status: true });
      } else {
        res
          .status(500)
          .json({
            message:
              "Database system is down for maintenance. Please try later.",
          });
      }
    } catch (err) {
      console.log("Error in AddDeviceTokenToAccount is: ", err);
      res.status(500).json({ message: "Error in Processing Request" });
    }
  }
}

export default  AccountsController;
