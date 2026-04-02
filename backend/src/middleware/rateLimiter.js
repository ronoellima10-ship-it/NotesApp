
import ratelimit from "../database/uptash.js";

const rateLimiter = async (req, res, next) => {

    try {
        
        const { success } = await ratelimit.limit(req.ip)

        if(!success) {
              return  res.status(429).json({ message: "Too many requests, please try again later." })
        }
            
        next()


    } catch (error) {

        console.error("Error in rate limiter middleware:", error);
        
       return next() // Pass the error to the next middleware (if any)
        
    }

    
}

export default rateLimiter;