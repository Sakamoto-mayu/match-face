"use client";

import GrayButton from "@/components/ui/button/GrayButton";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { data } from "@/const/histories";
import Link from "next/link";

type ProjectData = {
  id: string;
  comment_status: boolean;
  project_name: string;
  project_detail: string;
  answer_date: string;
}[];

const HistoryList = () => {
  // const response = await fetch('http://localhost:3000/api');
  // if (!response.ok) throw new Error('Failed to fetch data');
  // const projectData: ProjectData = await response.json();
  const projectData: ProjectData = data;

  const truncateString = (str: string, num: number) => {
    return str.length <= num ? str : str.slice(0, num) + "...";
  };

  return (
    <div>
      <table className="table-auto border border-collapse my-20 w-[80vw]">
        <thead>
          <tr>
            <th className="border p-4 bg-neutral-300">コメント</th>
            <th className="border  bg-neutral-300">回答日</th>
            <th className="border  bg-neutral-300">案件名</th>
            <th className="border  bg-neutral-300">案件概要</th>
            <th className="border  bg-neutral-300"></th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project) => (
            <tr key={project.id}>
              <td className="border text-center p-3">
                {project.comment_status ? (
                  <span className=" bg-orange text-white p-2 w-40 h-auto w-15 rounded py-1 px-2 text-xs">
                    新着
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td className="border text-center p-3">{project.answer_date}</td>
              <td className="border text-center px-4">
                {project.project_name}
              </td>

              <td className="border text-center px-4 ">
                {truncateString(project.project_detail, 30)}
              </td>
              <td className="border text-center px-4">
                <Link href={`result/${project.id}`}>
                  <GrayButton
                    label={"詳細"}
                    className="w-15 rounded py-1 px-2 text-xs"
                    value={project.id}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryList;
