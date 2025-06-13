
const validateEditProfileData = (req) => {

    const allowedEditFields = ["firstName","lastName","age","skills","gender","about","photoURL"]

    const isEditAllowed = Object.keys(req.body).every((field) =>allowedEditFields.includes(field))

    return isEditAllowed

}

module.exports = {validateEditProfileData}



