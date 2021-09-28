"use strict";

const express = require("express");
const bearerToken = require("express-bearer-token");
const bodyParser = require("body-parser");
const csrf = require("csurf");

const { asyncMiddleware, requireSessionUser } = require("../middleware");
const {
  add,
  verify,
  logout,
  getDashboard,
  getRemovePage,
  getRemoveConfirmationPage,
  getRemoveUpdateConfirmationPage,
  getRemoveDeleteConfirmationPage,
  getRemoveMoreTimePage,
  getPreferences,
  getBreachStats,
  handleRemoveFormSignup,
  handleRemoveAcctUpdate,
  removeEmail,
  resendEmail,
  updateCommunicationOptions,
  getUnsubscribe,
  postUnsubscribe,
  getRemoveFxm,
  postRemoveFxm,
  getRemoveKan,
  postRemoveKan,
  getRemoveSitesList,
  getRemoveRiskLevel,
  postResolveBreach,
} = require("../controllers/user");

const router = express.Router();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const csrfProtection = csrf();

router.get(
  "/dashboard",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getDashboard)
);
router.get(
  "/remove-data",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemovePage)
);

router.get(
  "/remove-signup-confirmation",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveConfirmationPage)
);

router.get(
  "/remove-update-confirmation",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveUpdateConfirmationPage)
);

router.get(
  "/remove-delete-confirmation",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveDeleteConfirmationPage)
);

router.get(
  "/remove-more-time",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveMoreTimePage)
);

router.get(
  "/preferences",
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getPreferences)
);
router.use("/breach-stats", bearerToken());
router.get("/breach-stats", urlEncodedParser, asyncMiddleware(getBreachStats));
router.get("/logout", logout);
router.post(
  "/email",
  urlEncodedParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(add)
);

router.post(
  "/remove-data-submit",
  urlEncodedParser,
  //csrfProtection, //MH TODO: figure out how to use this
  requireSessionUser,
  asyncMiddleware(handleRemoveFormSignup)
);

router.post(
  "/remove-acct-update",
  urlEncodedParser,
  //csrfProtection, //MH TODO: figure out how to use this
  requireSessionUser,
  asyncMiddleware(handleRemoveAcctUpdate)
);

router.post(
  "/remove-email",
  urlEncodedParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(removeEmail)
);
router.post(
  "/resend-email",
  jsonParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(resendEmail)
);
router.post(
  "/update-comm-option",
  jsonParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(updateCommunicationOptions)
);
router.get("/verify", jsonParser, asyncMiddleware(verify));
router.use("/unsubscribe", urlEncodedParser);
router.get("/unsubscribe", urlEncodedParser, asyncMiddleware(getUnsubscribe));
router.post("/unsubscribe", csrfProtection, asyncMiddleware(postUnsubscribe));
router.get(
  "/remove-fxm",
  urlEncodedParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveFxm)
);
router.post(
  "/remove-fxm",
  jsonParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(postRemoveFxm)
);

router.get(
  "/remove-kan",
  urlEncodedParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveKan)
);
router.post(
  "/remove-kan",
  jsonParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(postRemoveKan)
);

router.get(
  "/remove-sites-list",
  urlEncodedParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveSitesList)
);

router.get(
  "/remove-risk-level",
  urlEncodedParser,
  csrfProtection,
  requireSessionUser,
  asyncMiddleware(getRemoveRiskLevel)
);

router.post(
  "/resolve-breach",
  jsonParser,
  urlEncodedParser,
  requireSessionUser,
  asyncMiddleware(postResolveBreach)
);
module.exports = router;
