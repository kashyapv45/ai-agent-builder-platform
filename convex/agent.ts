import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateAgent = mutation({
    args: {
        name: v.string(),
        agentId: v.string(),
        userId: v.id("UserTable")
    },
    handler: async (ctx, args) => {
        const defaultNodes = [
            {
                id: 'Start',
                type: 'StartNode',
                position: { x: 100, y: 100 },
                data: { label: 'Start Node' },
                deletable: false,
            }
        ];
        const result = await ctx.db.insert('AgentTable', {
            name: args.name,
            agentId: args.agentId,
            published: false,
            userId: args.userId, nodes: defaultNodes,
            edges: []
        });
        return result;
    }
})

export const GetUserAgents = query({
    args: {
        userId: v.id("UserTable")
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('AgentTable')
            .filter(q => q.eq(q.field("userId"), args.userId))
            .order('desc')
            .collect()
        return result
    }
})

export const GetAgentById = query({
    args: {
        agentId: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('AgentTable')
            .filter(q => q.eq(q.field("agentId"), args.agentId))
            .order('desc')
            .collect()
        return result[0];
    }
})

export const UpdateAgentNodesAndEdges = mutation({
    args: {
        id: v.id('AgentTable'),
        nodes: v.any(),
        edges: v.any()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id,
            {
                nodes: args.nodes,
                edges: args.edges
            })
    }
})

export const UpdateAgentToolConfig = mutation({
    args: {
        id: v.id('AgentTable'),
        agentToolConfig: v.any()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            agentToolConfig: args.agentToolConfig
        })
    }
})

export const PublishAgent = mutation({
  args: { 
    id: v.id("AgentTable"), 
    published: v.boolean() 
  },
  handler: async (ctx, args) => {
    // Updates the specific agent's published status
    await ctx.db.patch(args.id, { 
        published: args.published 
    });
    return { success: true };
  },
});