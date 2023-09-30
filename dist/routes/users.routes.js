"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const filter_middlewares_1 = require("../middlewares/filter.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const validate_1 = require("../utils/validate");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.validate)(users_middlewares_1.RegisterValidator), users_controller_1.registerController);
router.post("/login", (0, validate_1.validate)(users_middlewares_1.LoginValidator), users_controller_1.loginController);
router.post('/login-admin', users_controller_1.loginAdminController);
router.get("/refresh-token", users_controller_1.refreshTokenController);
router.get("/logout", users_controller_1.logoutController);
router.post("/forgot-password-token", users_controller_1.forgotPasswordTokenController);
router.get("/reset-password/:token", (req, res) => {
    res.send("Page reset password");
});
router.post('/update-password', (0, validate_1.validate)(users_middlewares_1.UpdatePasswordValidator), auth_middlewares_1.authMiddlewares, users_controller_1.updatePasswordController);
router.get("/get-all-user", auth_middlewares_1.authMiddlewares, auth_middlewares_1.isAdmin, users_controller_1.getAllUserController);
router.patch("/update-user", auth_middlewares_1.authMiddlewares, (0, validate_1.validate)(users_middlewares_1.UpdateValidator), (0, filter_middlewares_1.filterMiddleware)(["firstname", "lastname", "address", "mobile"]), users_controller_1.updateUserController);
router.get('/whishlist', auth_middlewares_1.authMiddlewares, users_controller_1.getWhishListController);
router.post('/cart', auth_middlewares_1.authMiddlewares, users_controller_1.userAddCartController);
router.get('/cart/get-cart', auth_middlewares_1.authMiddlewares, users_controller_1.getUserCartController);
router.post('/order/cash-order', auth_middlewares_1.authMiddlewares, users_controller_1.createOrderController);
router.get('/order/get-order', auth_middlewares_1.authMiddlewares, users_controller_1.getOrderController);
router.put('/order/update-status-order/:cart_id', auth_middlewares_1.authMiddlewares, auth_middlewares_1.isAdmin, (0, validate_1.validate)(users_middlewares_1.StatusOrderValidator), users_controller_1.updateOrderStatusController);
router.delete("/cart/empty-cart", auth_middlewares_1.authMiddlewares, users_controller_1.getEmptyCartController);
router.delete("/delete-user/:id", users_controller_1.deleteUserController);
router.put("/reset-password/:token", (0, validate_1.validate)(users_middlewares_1.ForgotPasswordValidator), users_controller_1.resetPasswordController);
router.get("/get-user/:id", auth_middlewares_1.authMiddlewares, auth_middlewares_1.isAdmin, users_controller_1.getUserController);
router.patch("/apply-coupon", auth_middlewares_1.authMiddlewares, users_controller_1.applyCouponController);
router.put('/block-user/:id', auth_middlewares_1.authMiddlewares, auth_middlewares_1.isAdmin, users_controller_1.blockUserController);
router.put('/unblock-user/:id', auth_middlewares_1.authMiddlewares, auth_middlewares_1.isAdmin, users_controller_1.unBlockUserController);
exports.default = router;
