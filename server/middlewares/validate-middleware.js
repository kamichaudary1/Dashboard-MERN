const { json } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    console.log(req.body);

    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    // ZodError contains an 'errors' array
    console.log(err, ' :err')
    console.log(typeof err, ' :err')
    if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
      // Get the first error message
      const firstMessage = err.errors[0].message;
      return res.status(400).json({ msg: firstMessage });
    }
    console.log('not running')
    // Fallback response if structure is unexpected
    return res.status(400).json({ msg: 'Validation failed', err:JSON.parse(err)[0] });
  }
};


module.exports = validate;
