'use client'
import { useState } from "react"
import {HistoriesUserListHead,HistoriesUserListBody} from "./user_list"
import { Projects,AnswerRequests, Answers, Users } from '@/types/admin/histories/admin_histories'

export default function HistoriesList ({projects,answer_requests,answers,users}:{projects:Projects,answer_requests:AnswerRequests,answers:Answers,users:Users}){
    const [open,setOpen] = useState<{id:number,status:boolean}[]>(projects.map((project)=>({id:project.id,status:false})))

    // ユーザーのアコーディオン開閉
    function handleClick(id:number){
        const newOpen = open.map((state)=>{
            if (state.id===id){
                state.status=!state.status
            }
            return state
        })
        setOpen(newOpen)
    }

    return(
        <section>
                <table className="border-collapse border border-slate-deep-gray w-[75vw] ml-[12.5vw] text-center mb-[10vh]">
                <thead>
                    <tr>
                        <th className="border border-slate-deep-gray bg-light-gray" id="open"></th>
                        <th className="border border-slate-deep-gray bg-light-gray" id="answer_deadline">回答期限</th>
                        <th className="border border-slate-deep-gray bg-light-gray" id="project_name">案件名</th>
                        <th className="border border-slate-deep-gray bg-light-gray" id="project_detail">案件概要</th>
                    </tr>
                </thead>
                {projects.map((project)=>(
                <tbody  key={project.id}>
                    {((open.find((state)=>state.id===project.id))!.status===false)&&(
                        <tr>
                        <td className="border border-slate-deep-gray" id="open"><button data-testid = {`open_${project.id}`} id="open_button" name="open_button" type="button" className="text-deep-gray" onClick={()=>handleClick(project.id)}>▶︎</button></td>
                        {answer_requests.map((request)=>(
                            project.id===request.project_id&&
                                <td className="border border-slate-deep-gray" id="answer_deadline" key={request.id}>{request.deadline.slice(0,10)}</td>
                        ))}
                        <td className="border border-slate-deep-gray" id="project_name">{project.name}</td>
                        <td className="border border-slate-deep-gray" id="project_detail">{project.detail}</td>
                        </tr>
                    )}
                    
                    {((open.find((state)=>state.id===project.id))!.status===true)&&(
                        <>
                        <tr>
                        <td className="border border-slate-deep-gray" id="open"><button data-testid = {`close_${project.id}`} id="close_button" name="close_button" type="button" className="text-deep-gray" onClick={()=>handleClick(project.id)}>▼</button></td>
                        {answer_requests.map((request)=>(
                            project.id===request.project_id&&
                                <td className="border border-slate-deep-gray" id="answer_deadline"  key={request.id}>{request.deadline.slice(0,10)}</td>
                        ))}
                        <td className="border border-slate-deep-gray" id="project_name">{project.name}</td>
                        <td className="border border-slate-deep-gray" id="project_detail">{project.detail}</td>
                        </tr>
                        <tr>
                            <HistoriesUserListHead />
                        </tr>
                        <HistoriesUserListBody id={project.id} answers={answers} users={users}/>
                        </>
                    )}
                </tbody>
                ))}
            </table>
        </section>
    )
}
