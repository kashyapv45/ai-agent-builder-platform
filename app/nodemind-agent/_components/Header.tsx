import { Button } from '@/components/ui/button'
import { AgentType } from '@/types/AgentType'
import { CheckCircle, ChevronLeft, Code2Icon, Play, Upload, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


type Props = {
    agentDetails: AgentType | undefined
    previewHeader?: boolean,
    onPublish?: () => void,
    loading?: boolean
}
function Header({ agentDetails, previewHeader = false, onPublish, loading }: Props) {
    return (
        <div className='w-full p-3 bg-[#F6F8FA] shadow-sm'>
            <div className='flex gap-6 items-center'>
                <div className='flex gap-6 items-center'>
                    {!previewHeader ?
                        <Link className='cursor-pointer' href={`../Dashboard`}>
                            <ChevronLeft className='h-6 w-6 cursor-pointer' />
                        </Link> :
                        <Link className='cursor-pointer'  href={`/nodemind-agent/${agentDetails?.agentId}`}>
                            <Button className='cursor-pointer' variant={'outline'}><X className="h-4 w-4 mr-2" />Close Preview</Button>
                        </Link>
                    }
                    <h1 className='text-xl font-semibold'>{agentDetails?.name}</h1>
                </div>

                <div className='ml-auto flex gap-2'>

                    {!previewHeader ?
                        <Link className='cursor-pointer' href={`/nodemind-agent/${agentDetails?.agentId}/preview`}>
                            <Button className='cursor-pointer'><Play className="h-4 w-4 mr-2" />Preview</Button>
                        </Link> :
                        <div className='flex gap-2'>
                            <Button
                                variant={'outline'}
                                className='cursor-pointer'
                                onClick={onPublish}
                                disabled={!agentDetails?.published}
                            >
                                <Code2Icon className="h-4 w-4 mr-2" />
                                Code
                            </Button>
                            <Button
                                className='cursor-pointer'
                                disabled={loading || agentDetails?.published} // Disable if loading OR already published
                            >
                                {loading ? (
                                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                {agentDetails?.published ? 'Published' : 'Publish'}
                            </Button>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Header