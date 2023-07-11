'use client'
import { answered_user } from "@/const/admin_histories"
import GrayButton from "@/components/ui/button/GrayButton"
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"
export function HistoriesUserListHead(){
    return(
        <>            
            <th></th>
            <th className="border border-slate-deep-gray bg-light-gray" id="detail"></th>
            <th className="border border-slate-deep-gray bg-light-gray" id="answer_status">状態</th>
            <th className="border border-slate-deep-gray bg-light-gray" id="user_name">氏名</th>
        </>

    )
}
export function HistoriesUserListBody({id}:{id:number}){
    const project_answered_user = answered_user.filter((user)=>user.project_id===id)
    const router = useRouter()

    function handleClick(e:SyntheticEvent,id:number){
        e.preventDefault()
        router.push(`/admin/review/${id}`)
    }

    return(
        <>                
            {project_answered_user.map((user_answer)=>(
                <tr key={user_answer.id}> 
                <td></td>
                <td className="border border-slate-deep-gray" id="detail"><GrayButton data-testid={`detail_${user_answer.id}`} label="詳細" className="w-20 h-[23px] pt-[4px] text-sm" onClick={(e)=>handleClick(e,user_answer.id)}/></td>
                <td className="border border-slate-deep-gray" id="answer_status">{user_answer.answer_status?"回答済み":"未回答"}</td>
                <td className="border border-slate-deep-gray" id="user_name">{user_answer.user_name}</td>
                </tr>
            ))}
        </>

    )
}
