"use client"
import { Button } from '@/components/ui/button'
import { Loader2Icon, Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { set } from 'date-fns'
import { se } from 'date-fns/locale'
import { UserDetailContext } from '@/context/UserDetailContext'

function CreateAgentSection() {
    const [openDialog, setOpenDialog] = useState(false);
    const CreateAgentMutation=useMutation(api.agent.CreateAgent);
    const [agentName,setAgentName]=useState<string>();
    const router=useRouter();
    const [loading,setLoading]=useState(false);
    const {userDetails,setUserDetails}=useContext(UserDetailContext);
    const CreateAgent=async()=>{
        setLoading(true);
        const agentId=uuidv4();
        const result=await CreateAgentMutation({
            agentId:agentId,
            name:agentName??'',
            userId:userDetails?._id
        })
        console.log(result);
        setOpenDialog(false);
        setLoading(false);
        router.push(`/nodemind-agent/${agentId}`);
    }
    return (
        <div className='space-y-2 flex flex-col justify-center items-center mt-24'>
            <h2 className='font-semibold text-xl'>Create New AI Agent</h2>
            <p className='text-md'>Design intelligent agent workflows with custom logic and tool integrations</p>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger><Button size={'lg'} onClick={()=> setOpenDialog(true)}><Plus /> Create</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Agent Name</DialogTitle>
                        <DialogDescription>
                            <Input placeholder='Agent Name' onChange={(event)=>setAgentName(event.target.value)} />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant='outline' onClick={()=> setOpenDialog(false)}>Cancel</Button>
                        </DialogClose>
                        <Button type='submit' onClick={()=> CreateAgent()} disabled={loading}>{loading ? <div className='flex gap-2 items-center'><Loader2Icon className="animate-spin"/> "Creating..."</div> : "Create Agent"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateAgentSection