"use client";
import ProjectTableData from "@/const/projectTable";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRefine } from "@/hooks/store/context/HandleQuestionContext";

const ProjectTable = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<any[]>(ProjectTableData);
  const [refine, setRefine] = useRefine();
  // console.log("projectTable", refine);

  useEffect(() => {
    const filterData = () => {
      // refine.departmentとrefine.wordがが空の場合、すべてのデータを表示
      if (refine.department.length === 0 && refine.word === "") {
        setData(ProjectTableData);
        return;
      }
      // refine.departmentに一致するデータをフィルタリング
      const departmentFilteredData = ProjectTableData.filter((table) =>
        refine.department.includes(table.department)
      );
      // refine.wordに一致するデータをフィルタリング
      const wordFilteredData = departmentFilteredData.filter(
        (table) =>
          table.project_name.includes(refine.word) ||
          table.project_detail.includes(refine.word)
      );
      const wordOnlyFilteredData = ProjectTableData.filter(
        (table) =>
          table.project_name.includes(refine.word) ||
          table.project_detail.includes(refine.word)
      );
      // refine.wordが空の場合、上記でフィルタリングしたデータを設定
      if (refine.word === "") {
        setData(departmentFilteredData);
        return;
      }
      // refine.departmentが空の場合、上記でフィルタリングしたデータを設定
      if (refine.department.length === 0) {
        setData(wordOnlyFilteredData);
        return;
      }
      setData(wordFilteredData);
    };
    filterData();
  }, [refine]);

  const pageAmount =
    data.length % 10 === 0
      ? data.length / 10
      : Math.floor(data.length / 10) + 1;

  const pageArr = Array(pageAmount)
    .fill(0)
    .map((num, index) => index);

  const pagingData = data.slice(page * 10, page * 10 + 10);

  return (
    <>
      <table className="w-4/5 border-2" data-testid="projectTable">
        <tbody>
          <tr className="border-2 border-current bg-light-gray">
            <th className="w-1/5 border-2 py-4">最終編集日</th>
            <th className="w-1/5 border-2">案件名</th>
            <th className="w-2/5 border-2">案件概要</th>
            <th className="w-1/5 border-2"></th>
          </tr>
          {pagingData.map((data) => {
            return (
              <tr key={data.id}>
                <td className="border-2 py-6 text-center">{data.edit_date}</td>
                <td
                  className="border-2 text-center"
                  data-testid={`${data.project_name}`}
                >
                  {data.project_name}
                </td>
                <td className="border-2 text-center">
                  {data.project_detail.slice(0, 20)}
                </td>
                <td className="border-2">
                  <div className="flex items-center justify-evenly">
                    <Link
                      href={`/admin/handle-question/edit/${data.id}`}
                      data-testid={`editButton_${data.id}`}
                    >
                      <WhiteButton label="編集" className="text-xs py-1 px-5" />
                    </Link>
                    <WhiteButton label="削除" className="text-xs py-1 px-5" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-5/12 max-w-5/12 flex justify-center my-7">
        <ul className="flex">
          {pageArr.map((num) => (
            <li key={`page_${num}`}>
              <button
                className={
                  num == page
                    ? "my-2 mx-4 py-1 px-2 bg-deep-gray rounded-full pointer-events-none"
                    : "my-2 mx-4 py-1 px-3 rounded-full"
                }
                type="button"
                onClick={() => {
                  setPage(num);
                  window.scroll({ top: 0 });
                }}
              >
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectTable;
