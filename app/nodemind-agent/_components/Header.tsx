import { Button } from '@/components/ui/button'
import { AgentType } from '@/types/AgentType'
import { CheckCircle, ChevronLeft, Code2Icon, Play, Upload, X } from 'lucide-react'
import Image from 'next/image'
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
        <div className='w-full px-4 py-3 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 sticky top-0 z-50'>
            <div className='flex items-center'>
                <div className='flex items-center gap-4'>
                    {!previewHeader ?
                        <Link className='cursor-pointer flex items-center gap-3' href={`../Dashboard`}>
                            <ChevronLeft className='h-5 w-5 text-neutral-500 hover:text-neutral-900 transition-colors' />
                        </Link> :
                        <Link className='cursor-pointer' href={`/nodemind-agent/${agentDetails?.agentId}`}>
                            <Button className='cursor-pointer rounded-full text-sm font-medium' variant={'outline'} size="sm"><X className="h-3.5 w-3.5 mr-1.5" />Close Preview</Button>
                        </Link>
                    }
                    <div className='flex items-center gap-2.5'>
                        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                        <h1 className='text-lg font-bold text-neutral-900 tracking-tight'>{agentDetails?.name}</h1>
                    </div>
                </div>

                <div className='ml-auto flex gap-2.5'>

                    {!previewHeader ?
                        <Link className='cursor-pointer' href={`/nodemind-agent/${agentDetails?.agentId}/preview`}>
                            <Button className='cursor-pointer rounded-full gap-2 shadow-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800' size="sm"><Play className="h-3.5 w-3.5" />Preview</Button>
                        </Link> :
                        <div className='flex gap-2.5'>
                            <Button
                                variant={'outline'}
                                className='cursor-pointer rounded-full text-sm font-medium'
                                size="sm"
                                onClick={onPublish}
                                disabled={!agentDetails?.published}
                            >
                                <Code2Icon className="h-3.5 w-3.5 mr-1.5" />
                                Code
                            </Button>
                            <Button
                                className='cursor-pointer rounded-full gap-2 shadow-sm font-semibold'
                                size="sm"
                                disabled={loading || agentDetails?.published}
                            >
                                {loading ? (
                                    <Upload className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <CheckCircle className="h-3.5 w-3.5" />
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