import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
   
    detectBot({
      mode: "LIVE", 
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

const arcjetMiddleware = async (req, res,next) => {
 try {
     const decision = await aj.protect(req, { requested: 1 }); // Deduct 5 tokens from the bucket
   
     if (decision.isDenied()) {
       if (decision.reason.isRateLimit()) return res.status(429).json({statusCode:429,error:"Rate limit exceeded"})
       if (decision.reason.isBot()) return res.status(403).json({statusCode:403,error:"Bot detected"})
       return res.status(403).json({statusCode:403,error:"Access Denied"})
      }
      next();
 } catch (error) {
    console.log("Arcjet Middleware Error",error);
    next();
 }
};


export default arcjetMiddleware;
