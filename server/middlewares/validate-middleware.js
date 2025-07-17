const { json } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    // ZodError contains an 'errors' array
    if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
      // Get the first error message
      const firstMessage = err.errors[0].message;
      return res.status(400).json({ msg: firstMessage });
    }
    const status = 422;
    // Fallback response if structure is unexpected
    // return res.status(400).json({ msg: 'Validation failed', err:JSON.parse(err)[0].message });
    const message = "Fill the input properly";
    const extraDetails = res.status(400).json({ msg: 'Validation failed', err:JSON.parse(err)[0].message });
    const error = {
      status, 
      message,
      extraDetails
    };
    console.log(error);
    next(error);
  }
};


module.exports = validate;
