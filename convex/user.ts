// convex/user.ts
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        plan: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query('UserTable')
            .filter(q => q.eq(q.field('email'), args.email))
            .unique();

        if (!user) {
            
            let initialTokens = 100;
            if (args.plan === 'pro') initialTokens = 500;
            if (args.plan === 'ultimate') initialTokens = 5000;

            const userData = {
                name: args.name,
                email: args.email,
                token: initialTokens,
                subscription: args.plan,
            };
            
            const userId = await ctx.db.insert('UserTable', userData);
            const newUser = await ctx.db.get(userId);
            return newUser;
        }
        return user;
    }
});

export const DeductTokens = mutation({
    args: { 
        email: v.string(), 
        amount: v.number() 
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query('UserTable')
            .filter(q => q.eq(q.field('email'), args.email))
            .unique();

        if (!user) throw new Error("User not found");

        // Ensure tokens don't go below 0
        const newBalance = Math.max(0, user.token - args.amount);

        await ctx.db.patch(user._id, { 
            token: newBalance 
        });

        return newBalance;
    },
});

export const ResetMonthlyTokens = mutation({
  args: { email: v.string(), plan: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query('UserTable')
      .filter(q => q.eq(q.field('email'), args.email))
      .unique();

    if (!user) return;

    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const currentTime = Date.now();
    const lastReset = user.lastReset ?? user._creationTime;

    let maxTokens = 100;
    if (args.plan === 'pro') maxTokens = 500;
    if (args.plan === 'ultimate') maxTokens = 5000;

    const isTimeForRefill = currentTime - lastReset >= thirtyDaysInMs;

    const isUpgrade = user.token < maxTokens && user.subscription !== args.plan;

    if (isTimeForRefill || isUpgrade) {
      await ctx.db.patch(user._id, { 
        token: maxTokens,
        lastReset: currentTime,
        subscription: args.plan
      });
      
      return maxTokens;
    }
    
    return user.token;
  },
});