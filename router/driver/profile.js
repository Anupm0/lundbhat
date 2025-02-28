const express = require('express');

const Driver = require('../../modals/Driver');
const verifyToken = require('../../helper/utils/verifytokenDriver');
const router = express.Router();

router.get('/me', verifyToken, async (req, res) => {
    const token = req.header('Authorization');
    console.log();

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = req.user;
    console.log('user:', user);
    const driver = await Driver.findOne({ driverId: req.user.driverId }).select('-password -otp -providerId -verificationToken  -otpExpiry')

    console.log('driver:', driver);
    if (!driver) {
        return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(201).json(driver);



});

module.exports = router;