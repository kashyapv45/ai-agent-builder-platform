import { Id } from "@/convex/_generated/dataModel"

export type AgentType={
    _id:Id<"AgentTable">,
    agentId:string,
    config?:any,
    name:string,
    published:boolean,
    userId:Id<"UserTable">,
    nodes?:any,
    edges?:any,
    _creationTime:number,
    agentToolConfig?:any
}