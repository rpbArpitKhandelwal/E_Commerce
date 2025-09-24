const Product = require('./models/Product');
const { productSchema, reviewSchema } = require('./schema');

// Validate product with Joi
const validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });
    if (error) {
        req.flash('error', 'Invalid product data');
        return res.redirect('back');
    }
    next();
};

// Validate review with Joi
const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        req.flash('error', 'Invalid review data');
        return res.redirect('back');
    }
    next();
};

// Check if logged in
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        req.flash('error', 'Please login first');
        return res.redirect('/login');
    }
    next();
};

// Check if seller
const isSeller = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'Please login first');
        return res.redirect('/login');
    }
    if (!req.user.role || req.user.role !== 'seller') {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect('/products');
    }
    next();
};

// Check if product author
const isProductAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        req.flash('error', 'Product not found');
        return res.redirect('/products');
    }

    if (!req.user) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }

    if (!product.author || !product.author.equals(req.user._id)) {
        req.flash('error', 'You are not the authorised user');
        return res.redirect('/products');
    }

    next();
};

module.exports = {
    isProductAuthor,
    isSeller,
    isLoggedIn,
    validateReview,
    validateProduct
};
