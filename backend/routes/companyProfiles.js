const express = require('express');
const { saveCompanyProfile, updateCompanyProfile, deleteCompanyProfile, companyProfiles, companyProfileById } = require('../controllers/companyProfileController')

const router = express.Router();

router.route('/')
    .get(companyProfiles)
    .post(saveCompanyProfile)

router.route('/:_id')
    .get(companyProfileById)
    .put(updateCompanyProfile)
    .delete(deleteCompanyProfile)

module.exports = router;